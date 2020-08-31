var gulp = require('gulp');
var fs = require('fs');
var glob = require('glob');
var argv = require('yargs').argv;
var config = require('./config.json').boldreports;
var script_reference = fs.readFileSync(`${__dirname}\\samples\\BoldReports\\script-reference.html`, 'utf-8');

gulp.task('update-script-reference', function (done) {
    replaceFiles(`{{head}}`, script_reference);
    done();
});

gulp.task('apply-script-template', function (done) {
    replaceFiles(/<!-- Bold Reports script and theme references -->[\w\s\S]*?<!-- End of Bold Reports script and theme references End-->/g, `{{head}}`);
    done();
});

function replaceFiles(regex, template) {
    var filepath = config[argv.control];
    glob(`${__dirname}/${filepath.sampleLoc}/${filepath.baseUrl}/**/*.html`, function (globErr, files) {
        if (globErr)
            process.exitCode(1);

        files.forEach(function (path) {
            var scriptContent = scriptContentValue(path, template, filepath.baseUrl);
            var html = fs.readFileSync(path, 'utf-8');
            var htmlNew = html.replace(regex, scriptContent);
            fs.writeFile(path, htmlNew, function (err) {
                if (err)
                    console.log("Error Not writing this file : " + path);
            });
        });
    });
}

function scriptContentValue(path, template, baseUrl) {
    var slash = path.substr(path.indexOf(baseUrl), path.lastIndexOf("/")).split('/').length;
    var scriptPath = "";
    for (var i = 1; i < slash; i++) {
        scriptPath += "../";
    }
    var scriptContent = template.replace(/{{path}}/g, scriptPath);
    return scriptContent;
}