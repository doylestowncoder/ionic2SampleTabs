#!/usr/bin/env node

var fs = require("fs");
var xcode = require("xcode");
var rootdir = process.argv[2];
//
//function copyFile(source, target) {
//	return new Promise(function(resolve, reject) {
//		var rd = fs.createReadStream(source);
//		rd.on('error', reject);
//		var wr = fs.createWriteStream(target);
//		wr.on('error', reject);
//		wr.on('finish', resolve);
//		rd.pipe(wr);
//	});
//}

function copyFile(source, target) {
	var rd = fs.createReadStream(source);
	rd.on("error", function(err) {
		done(err);
	});
	var wr = fs.createWriteStream(target);
	wr.on("error", function(err) {
		done(err);
	});
	wr.on("close", function(ex) {
		done();
	});
	rd.pipe(wr);

	function done(err) {
		if (err !== undefined) {
			console.log("Error copying file: " + err);
		} else {
			console.log()
		}

	}
}

if (rootdir) {

	// go through each of the platform directories that have been prepared
	var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

	for(var x=0; x<platforms.length; x++) {
		// open up the index.html file at the www root
		var platform = platforms[x].trim().toLowerCase();

		if (platform === 'ios') {
			var projectPath = 'platforms/ios/ionic2SampleTabs.xcodeproj/project.pbxproj';

			console.log("Hook:  Adding XCode Resources for Localization for " + platform);

			var xcodeProject = xcode.project(projectPath);

			xcodeProject.parse(function(err){
				if(err){
					console.log('Error: ' + JSON.stringify(err));
				}
				else {
					var file = xcodeProject.addResourceFile('InfoPlist.strings');

					var fileRefEn =  xcodeProject.generateUuid() + ' /* en */';
					var fileEn = {isa: 'PBXFileReference', lastKnownFileType: 'text.plist.strings', name: 'en', path: 'en.lproj/InfoPlist.strings', sourceTree: '"<group>"' };

					xcodeProject.pbxFileReferenceSection()[fileRefEn] = fileEn;

					var fileRefFr =  xcodeProject.generateUuid() + ' /* fr */';
					var fileFr = {isa: 'PBXFileReference', lastKnownFileType: 'text.plist.strings', name: 'fr', path: 'fr.lproj/InfoPlist.strings', sourceTree: '"<group>"' };

					xcodeProject.pbxFileReferenceSection()[fileRefFr] = fileFr;

					fs.writeFileSync(projectPath, xcodeProject.writeSync(), 'utf-8');

					var html = fs.readFileSync(projectPath, 'utf8');

					var replaceWith = "/* End PBXTargetDependency section */\n\n/* Begin PBXVariantGroup section */\n" +
						"    " + file.fileRef +  " /* InfoPlist.strings */ = {\n" +
						"      isa = PBXVariantGroup;\n" +
						"      children = (\n" +
						"        " + fileRefEn + ",\n" +
						"        " + fileRefFr + ",\n" +
						"      );\n" +
						"      name = InfoPlist.strings;\n" +
						"      sourceTree = \"<group>\";\n" +
						"    };\n" +
						"/* End PBXVariantGroup section */";

					html = html.replace("/* End PBXTargetDependency section */", replaceWith);

					fs.writeFileSync(projectPath, html, 'utf8');

					var mkdirSync = function (path) {
						try {
								fs.mkdirSync(path);
						} catch(e) {
							if ( e.code != 'EEXIST' ) throw e;
						}
					}
					mkdirSync('platforms/ios/ionic2SampleTabs/Resources');
					mkdirSync('platforms/ios/ionic2SampleTabs/Resources/en.lproj');
					mkdirSync('platforms/ios/ionic2SampleTabs/Resources/fr.lproj');

					copyFile('resources/ios/en.lproj/InfoPlist.strings', 'platforms/ios/ionic2SampleTabs/Resources/en.lproj/InfoPlist.strings');
					copyFile('resources/ios/fr.lproj/InfoPlist.strings', 'platforms/ios/ionic2SampleTabs/Resources/fr.lproj/InfoPlist.strings');

					console.log('Hook Completed: Added XCode Resources for Localization for ' + platform);
				}
			});
		} else {
			console.log('Hook Skipped: Skipping XCode Resources for Localization for ' + platform);
		}
	}
}
