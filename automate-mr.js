var gulp = require('gulp');
var fs = require('fs');
const simpleGit = require('simple-git');
var shellJs = require('shelljs')
const git = simpleGit();
var prefixPath = "C:\\Program Files (x86)\\Bold Reports\\Embedded Reporting\\Javascript\\assets";
var suffixPath = [{ srcPath: "scripts\\common\\**", destPath: "Scripts\\common" },
{ srcPath: "scripts\\data-visualization\\**", destPath: "Scripts\\data-visualization" },
{ srcPath: "scripts\\*.js", destPath: "Scripts\\" },
{ srcPath: "themes\\**\\*", destPath: "Content\\" }];

gulp.task('merge-request', function (done) {

    // if (fs.existsSync(prefixPath)) {
    //     //Copy Script and Contents
    //     suffixPath.forEach(path => {
    //         copyFiles(`${prefixPath}\\${path.srcPath}`, `Build-Files\\${path.destPath}`);
    //     })
        //MR
        mergeRequest();
    // }
    // else {
    //     console.log("Check the build is installed correct path which is under C : ");
    //     process.exitCode(1);
    // }
    done();
});
function copyFiles(src, dest) {
    gulp.src(src)
        .pipe(gulp.dest(dest));
}
async function mergeRequest() {
    git.init()
        .addConfig('user.name', 'Sridhar2908')
        .addConfig('user.email', 'sridhar.manikandan@syncfusion.com')
        .add('./*')
        .commit(`merge-request-js-report-control 9.48`)
        .addRemote('origin', 'https://github.com/Sridhar2908/javascript-reporting-controls');

   await git.push(['-u', 'origin', 'master'], () => console.log('done'));
     //shellJs.exec('git push -u origin master');
    //pull 
    await git.pull((err) => {
        if (err) {
            console.log(err);
        }
    });
    //Merge 
    git.merge((err) => {
        if (err.git) {
            console.log(err.git);// the failed merge Summary
            process.exitCode(1);
        }
        console.log('Merged');
    })
}