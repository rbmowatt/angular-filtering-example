var gulp=require('gulp');
var concat=require('gulp-concat');
var gulpif=require('gulp-if');
var ngAnnotate=require('gulp-ng-annotate');
var uglify=require('gulp-uglify');
var deporder=require('gulp-deporder');
var runSequence=require('run-sequence');
var stripdebug=require('gulp-strip-debug');



folder={
    js:{
        src:'./sym-test',
        build:'./js/build'
    }
}


gulp.task('js',function (){
    var jsbuild=gulp.src(folder.js.src+'/**/*.js')
            .pipe(deporder())
            .pipe(gulpif('*.js',ngAnnotate())) // ng-annotate if .js
            .pipe(concat('main.js'));

    jsbuild=jsbuild
            .pipe(stripdebug())
            .pipe(uglify());
   
    return jsbuild.pipe(gulp.dest(folder.js.build));
});


watch=require('gulp-watch');

gulp.task('watch',function (){
    gulp.watch(folder.js.src+'/**/*.*',function (){
        runSequence('js');
    });
});
