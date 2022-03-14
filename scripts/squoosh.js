// Original script by alex-drocks, taken from https://github.com/GoogleChromeLabs/squoosh/pull/1053#issuecomment-860072289

const fs = require('fs');
const path = require("path");

const {ImagePool} = require('@squoosh/lib');
const imagePool = new ImagePool();

// Define your paths:
const basePath = process.argv[2];
const imagesToOptimizePath = path.join(basePath, "src")
const optimizeToPath = path.join(basePath, "squoosh");

// Make the optimizeToPath directory if it does not exist
if(!fs.existsSync(optimizeToPath)) {
  fs.mkdirSync(optimizeToPath);
  console.log("Created squoosh directory");
}

// Define resize width & quality option
const usrWidth = 1080;
const usrQual = 75;

(async () => {

  const files = await fs.promises.readdir(imagesToOptimizePath);

  for (const file of files) {
    await libSquooshOptimize(file);
  }

  await imagePool.close();

})();


async function libSquooshOptimize(file) {
  const imagePath = path.join(imagesToOptimizePath, file);
  const saveOptimizedImageToPath = path.join(optimizeToPath, path.parse(file).name);
  console.log({imagePath});

  const image = imagePool.ingestImage(imagePath);
  await image.decoded; //Wait until the image is decoded before running preprocessors

  const preprocessOptions = {
    resize: {
      enabled: true,
      width: usrWidth,
    }
  };
  await image.preprocess(preprocessOptions);

  const encodeOptions = {
    //an empty object means 'use default settings'
    mozjpeg: {
      quality: usrQual
    }
  };
  await image.encode(encodeOptions);

  for (const encodedImage of Object.values(image.encodedWith)) {
    const {extension, binary} = (await encodedImage);
    const optimizedImagePath = `${saveOptimizedImageToPath}.${extension}`;
    fs.writeFile(optimizedImagePath, binary, (err) => {
      if (err) throw err;
      console.log({optimizedImagePath});
    },);
  }
}