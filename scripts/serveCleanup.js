const fs = require('fs');

const delDirs = [
    // Add directories created at build
    './assets/js',
    './resources',
    './public'
];

delDirs.forEach((element) => {
    try {
        fs.rmSync(element, { recursive: true});
        console.log(`Removed ${element}`);
    } catch (err) {
        console.log(`Error while deleting ${element}`);
    }
})