var gulp = require('gulp');
var fs = require('fs');
const git = require('simple-git');
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
        //pull();
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
        .commit("merge-request-js-report-control 11.34")
        .addRemote('origin', 'https://github.com/Sridhar2908/javascript-reporting-controls')
        .push(['-u', 'origin', 'automate-mr'], () => console.log('done'));

    shelljs.exec('git push');

   // shelljs.exec('git pull')

//pull 
// git().pull('origin', 'master', {'--rebase': 'true'})
    
//   require('simple-git')()
//       .exec(() => console.log('Starting pull...'))
//       .pull((err, update) => {
//          if(update && update.summary.changes) {
//             require('child_process').exec('npm restart');
//          }
//          if(err)
//          {
//              console.log(err);
//          }
//       })
//       .exec(() => console.log('pull done.'));

   //Merge 
   git().merge((err, mergeSummary) => {
    if (err.git) {
       mergeSummary = err.git; // the failed mergeSummary
    }
 })

} 
