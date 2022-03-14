const fs = require('fs');

const squooshDir = './static/images/blogImages/squoosh';
const jsBundleDir = './assets/js';
const delDirs = [squooshDir, jsBundleDir];

delDirs.forEach((element) => {
    try {
        fs.rmSync(element, { recursive: true});
        console.log(`Removed ${element}`);
    } catch (err) {
        console.log(`Error while deleting ${element}`);
    }
})
