var gulp = require('gulp');
var fs = require('fs');
var git = require('simple-git');
var shellJs = require('shelljs')
var prefixPath = "C:\\Program Files (x86)\\Bold Reports\\Embedded Reporting\\Javascript\\assets";
var suffixPath = [{ srcPath: "scripts\\common\\**", destPath: "Scripts\\common" },
{ srcPath: "scripts\\data-visualization\\**", destPath: "Scripts\\data-visualization" },
{ srcPath: "scripts\\*.js", destPath: "Scripts\\" },
{ srcPath: "themes\\**\\*", destPath: "Content\\" }];

gulp.task('merge-request', function (done) {

    if (fs.existsSync(prefixPath)) {
        //Copy Script and Contents
        suffixPath.forEach(path => {
            copyFiles(`${prefixPath}\\${path.srcPath}`, `Build-Files\\${path.destPath}`);
        })
        //MR
        mergeRequest();
    }
    else {
        console.log("Check the build is installed correct path which is under C : ");
        process.exitCode(1);
    }
    done();
});
function copyFiles(src, dest) {
    gulp.src(src)
        .pipe(gulp.dest(dest));
}
async function mergeRequest() {
    git().init()
        .addConfig('user.name', 'Sridhar2908')
        .addConfig('user.email', 'sridhar.manikandan@syncfusion.com')
        .add('./*')
        .commit(`Merge Request 12,45`)
        .addRemote('origin', 'https://github.com/Sridhar2908/javascript-reporting-controls.git');
        // .push('origin', 'automate-mr');
       
    await git().push(['-u', 'origin', 'automate-mr'], () => console.log('done'));
  //  shellJs.exec(`git push -b ${branch}`)
    //pull 
    await git().pull((err) => {
        if (err) {
            console.log(err);
        }
    });
    // Merge 
    git().merge((err) => {
        if (err.git) {
            console.log(err.git);// The failed merge Summary
            process.exitCode(1);
        }
        console.log('Merged');
    })
}