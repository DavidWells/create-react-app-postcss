// tooling
const fs   = require('fs');
const path = require('path');

// destinations
const nodeModulesDir = path.dirname(__dirname);
const reactScriptsPackageFile = path.join(nodeModulesDir, 'react-scripts', 'package.json');
const reactScriptsConfigDev   = path.join(nodeModulesDir, 'react-scripts', 'config', 'webpack.config.dev.js');
const reactScriptsConfigProd  = path.join(nodeModulesDir, 'react-scripts', 'config', 'webpack.config.prod.js');

// replacements
const originalRequire = `require('postcss-flexbugs-fixes')`;
const modifiedRequire = `${originalRequire},require('postcss-use')({ modules: '*' })`;

// version control
const match1x = /^1\./;

fs.readFile(reactScriptsPackageFile).then(
	json => JSON.parse(json)
).then(
	pkg => {
		if (match1x.test(pkg.version)) {
			return Promise.all([
				readFile(reactScriptsConfigDev),
				readFile(reactScriptsConfigProd)
			]).then(
				results => [
					results[0].replace(modifiedRequire, originalRequire).replace(originalRequire, modifiedRequire),
					results[1].replace(modifiedRequire, originalRequire).replace(originalRequire, modifiedRequire)
				]
			).then(
				results => Promise.all([
					writeFile(reactScriptsConfigDev, results[0]),
					writeFile(reactScriptsConfigProd, results[1])
				])
			)
		}
	}
);

// helpers
function readFile(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (error, contents) => {
			if (error) {
				reject(error);
			} else {
				resolve(contents);
			}
		});
	});
}

function writeFile(file, contents) {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, contents, error => {
			if (error) {
				reject(error);
			} else {
				resolve(contents);
			}
		});
	});
}
