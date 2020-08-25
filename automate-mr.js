var gulp = require('gulp');
var fs = require('fs');
const git = require('simple-git');
var shelljs = require('shelljs');
var prefixPath = "C:\\Users\\Public\\Documents\\Bold Reports\\Embedded Reporting\\Samples\\Common\\Javascript\\assets";
var suffixPath = [{ srcPath: "scripts\\common\\**", destPath: "Scripts\\common" },
{ srcPath: "scripts\\data-visualization\\**", destPath: "Scripts\\data-visualization" },
{ srcPath: "scripts\\*.js", destPath: "Scripts\\" },
{ srcPath: "themes\\**\\*", destPath: "Content\\" }];

gulp.task('automate-mr',async function (done) {

    if (fs.existsSync(prefixPath)) {
        //Copy Script and Contents
        suffixPath.forEach(path => {
            copyFiles(`${prefixPath}\\${path.srcPath}`, `CopiedBuild\\${path.destPath}`);
        })
        //MR
        mergeRequest();
        pull();
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
function mergeRequest() {
    git()
        .init()
        .addConfig('user.name', 'Sridhar2908')
        .addConfig('user.email', 'sridhar.manikandan@syncfusion.com')
        .add('./*')
        .commit("automate MR")
        .addRemote('origin', 'https://github.com/Sridhar2908/javascript-reporting-controls')
        .push(['-u', 'origin', 'automate-mr'], () => console.log('done'));

    shelljs.exec('git push');

    // const simpleGit = require('simple-git');
    // const git = simpleGit(); 
    // try {
    //     const mergeSummary = git.merge();
    //     console.log("Merged");
    //    // console.log(`Merged ${ mergeSummary.merges.length } files`);
    //   }
    //   catch (e) {
    //     // err.message - the string summary of the error
    //     // err.stack - some stack trace detail
    //     // err.git - where a parser was able to run, this is the parsed content
    //    console.log(e);
    //    // console.error(`Merge resulted in ${ err.git.conflicts.length } conflicts`);
    //   }
}
function pull() {

    git()
        .exec(() => console.log('Starting pull...'))
        .pull((err, update) => {
            if (update && update.summary.changes) {
                require('child_process').exec('npm restart');
            }
            if (err) {
                console.log(err);
            }
        })
        .exec(() => console.log('pull done.'));
}