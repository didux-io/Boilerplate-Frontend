/**
 * Because of Angular 6+ (version 7 as of writing) a couple of global variables are not supported anymore:
 * https://ethereum.stackexchange.com/questions/55365/error-cant-create-a-new-web3-object-on-angular
 * 
 * This fix replaces a couple of vars in the webpack config after npm install (as defined in postinstall in package.json)
 * https://gist.github.com/niespodd/1fa82da6f8c901d1c33d2fcbb762947d
 */

const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});