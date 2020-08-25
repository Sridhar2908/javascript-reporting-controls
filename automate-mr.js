var gulp = require('gulp');
var fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();
var shelljs = require('shelljs');
var prefixPath = "C:\\Program Files (x86)\\Bold Reports\\Embedded Reporting\\Javascript\\assets";
var suffixPath = [{ srcPath: "scripts\\common\\**", destPath: "Scripts\\common" },
{ srcPath: "scripts\\data-visualization\\**", destPath: "Scripts\\data-visualization" },
{ srcPath: "scripts\\*.js", destPath: "Scripts\\" },
{ srcPath: "themes\\**\\*", destPath: "Content\\" }];

gulp.task('merge-request', function (done) {

    if (fs.existsSync(prefixPath)) {
        //Copy Script and Contents
        suffixPath.forEach(path => {
            copyFiles(`${prefixPath}\\${path.srcPath}`, `CopiedBuild\\${path.destPath}`);
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
    git.init()
        .addConfig('user.name', 'Sridhar2908')
        .addConfig('user.email', 'sridhar.manikandan@syncfusion.com')
        .add('./*')
        .commit(`merge-request-js-report-control 4.55`)
        .addRemote('origin', 'https://github.com/Sridhar2908/javascript-reporting-controls');
    //.push(['-u', 'origin', 'automate-mr'], () => console.log('done'));

    await git.push(['-u', 'origin', 'automate-mr'], () => console.log('Push is done'));
    //pull 
    //  git.pull('origin', 'master', {'--rebase': 'true'})
    await git.pull((err, update) => {
        if (err) {
            console.log(err);
        }
        if (update && update.summary.changes) {
            console.log(update);
            require('child_process').exec('npm restart'); // update repo and when there are changes, restart the app
        }
    });
    // //Merge 
    git.merge((err) => {
        if (err.git) {
            console.log(err.git);
            process.exitCode(1); // the failed mergeSummary
        }
        console.log('Merged');
    })
}