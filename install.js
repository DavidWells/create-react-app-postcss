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

// read the react package.json
readFile(reactScriptsPackageFile).then(
	json => JSON.parse(json)
).then(
	pkg => {
		// test for a compatible version
		if (match1x.test(pkg.version)) {
			// update the postcss-loader dependency
			pkg.dependencies['postcss-loader'] = '2.1.0';

			return Promise.all([
				// read the config scripts
				readFile(reactScriptsConfigDev),
				readFile(reactScriptsConfigProd)
			]).then(
				// update the config scripts
				results => [
					results[0].replace(modifiedRequire, originalRequire).replace(originalRequire, modifiedRequire),
					results[1].replace(modifiedRequire, originalRequire).replace(originalRequire, modifiedRequire)
				]
			).then(
				// save the updated config scripts
				results => Promise.all([
					writeFile(reactScriptsConfigDev, results[0]),
					writeFile(reactScriptsConfigProd, results[1]),
					writeFile(reactScriptsPackageFile, JSON.stringify(pkg, null, '  '))
				])
			)
		}

		return true;
	},
	error => {
		if (error.code !== 'ENOENT') {
			throw error;
		}
	}
);

// read a file
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

// write a file
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
