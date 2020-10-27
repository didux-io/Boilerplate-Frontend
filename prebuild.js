const fs = require('fs');
let buildNumber = JSON.parse(fs.readFileSync('./src/assets/buildNumber.json', "utf8")).buildNumber;
console.log('Build number:', buildNumber);
