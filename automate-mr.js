var gulp = require('gulp');
var fs = require('fs');
const git = require('simple-git');
const { schedulingPolicy } = require('cluster');
gulp.task('automate-mr',function(done){
var prefixPath = "C:\\Users\\Public\\Documents\\Bold Reports\\Embedded Reporting\\Samples\\Common\\Javascript\\assets";

var suffixPath = ["scripts\\common\\**","scripts\\data-visualization\\**","scripts\\*.js","themes\\**\\*"];
var destPath = ["Scripts\\common","Scripts\\data-visualization","Scripts\\","Content\\"]
if(fs.existsSync(prefixPath))
{
    // var i = 0;//Copy Script and Contents
    // suffixPath.forEach(sufPath=>
    //     {
    //         copyFiles(`${prefixPath}\\${sufPath}`,`CopiedBuild\\${destPath[i++]}`);
    //     })

    //MR
    mergeRequest();
    

}
else
{
    console.log("Check the build is installed correct path which is under C : ");
    process.exitCode(1);
}

done();


})

function copyFiles(src, dest)
{
    gulp.src(src)
        .pipe(gulp.dest(dest));
}
function mergeRequest()
{
   

    require('simple-git')()
    .init()
    .add('./*')
    .commit("latest_8 commit!")
    .addRemote('origin', 'https://github.com/Sridhar2908/javascript-reporting-controls')
    .push(['-u', 'origin', 'automate-mr'], () => console.log('done'));
    //.push('origin', 'automate-mr');
    
  // require('simple-git')().mergeRequest();

    
    //pull request
    // require('simple-git')()
    //  .exec(() => console.log('Starting pull...'))
    //  .pull((err, update) => {
    //     if(update && update.summary.changes) {
    //        require('child_process').exec('npm restart');
    //     }
    //  })
    //  .exec(() => console.log('pull done.'));


//    // Merge-- push
//     git()
//      .add('./*')
//      .commit("latest commit!")
//      .addRemote('origin', 'https://github.com/Sridhar2908/javascript-reporting-controls')
//      .push(['-u', 'origin', 'automate-mr'], () => console.log('done'));
const simpleGit = require('simple-git');
const git = simpleGit(); 
try {
    const mergeSummary = git.merge();
    console.log(`Merged ${ mergeSummary.merges.length } files`);
  }
  catch (err) {
    // err.message - the string summary of the error
    // err.stack - some stack trace detail
    // err.git - where a parser was able to run, this is the parsed content
   console.log(err);
   // console.error(`Merge resulted in ${ err.git.conflicts.length } conflicts`);
  }

}