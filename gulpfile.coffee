"use strict"

gulp = require "gulp"
coffee = require "gulp-coffee"
gutil = require "gulp-util"

gulp.task "build", ->
    gulp.src "./src/*.coffee"
        .pipe coffee().on "error", gutil.log
        .pipe gulp.dest "./"

gulp.task "default", ["build"]
