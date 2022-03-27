// Original script by alex-drocks, taken from https://github.com/GoogleChromeLabs/squoosh/pull/1053#issuecomment-860072289

const fs = require("fs");
const path = require("path");

const { ImagePool } = require("@squoosh/lib");
const imagePool = new ImagePool();

// Define your paths:
const basePath = process.argv[2];
const imagesToOptimizePath = path.join(basePath, "src");
const optimizeToPath = path.join(basePath, "squoosh");

// Make the optimizeToPath directory if it does not exist
if (!fs.existsSync(optimizeToPath)) {
  fs.mkdirSync(optimizeToPath);
  console.log(`Created squoosh directory ${optimizeToPath}`);
} else {
  console.log(
    `Already squooshed files in ${basePath}. Run clean first to squoosh newly added files.`
  );
  process.exit(0);
}

// Define resize width & quality option
const usrWidth = 1080;
const usrQual = 75;

async function squooshFiles() {
  let amount = 0
  const files = await fs.promises.readdir(imagesToOptimizePath);
  for (const file of files) {
    await libSquooshOptimize(file);
    amount++;
  }
  await imagePool.close();
  return amount;
}

(async () => {
  console.log("Squooshing... ")
  squooshFiles().then((amount) => {
    console.log(`Successfully squooshed ${amount} files at ${basePath}`);
  });
})();

async function libSquooshOptimize(file) {
  process.stdout.write(path.parse(file).name);
  const imagePath = path.join(imagesToOptimizePath, file);
  const saveOptimizedImageToPath = path.join(
    optimizeToPath,
    path.parse(file).name
  );

  const image = imagePool.ingestImage(imagePath);
  await image.decoded; //Wait until the image is decoded before running preprocessors

  const preprocessOptions = {
    resize: {
      enabled: true,
      width: usrWidth,
    },
  };
  await image.preprocess(preprocessOptions);

  const encodeOptions = {
    //an empty object means 'use default settings'
    mozjpeg: {
      quality: usrQual,
    },
  };
  await image.encode(encodeOptions);

  for (const encodedImage of Object.values(image.encodedWith)) {
    const { extension, binary } = await encodedImage;
    const optimizedImagePath = `${saveOptimizedImageToPath}.${extension}`;
    fs.writeFile(optimizedImagePath, binary, (err) => {
      if (err) throw err;
    });
  }
  process.stdout.write( " [✓]\n" );
}
