module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
          watch: {
            concat: {
                files: 'resources/stylesheet/*.css',
                tasks: ['concat:styles']
            }
        },
        concat: {
            options: {
                separator: '\n \n ',
             },
            dist: {
                src: ['resources/javascripts/Main.js'],
                dest: 'resources/javascripts/bin/<%= pkg.name %>.js',
            },
            styles: {
                src: ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'resources/stylesheet/Main.css'],
                dest: 'resources/stylesheet/bin/styles.css'
            }
        },
        uglify: {
            options: {
            mangle:false
            },
            my_target: {
            files: {
                'resources/javascripts/bin/<%= pkg.name %>.min.js': ['resources/javascripts/bin/<%= pkg.name %>.js']
            }
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-style');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Tasks
    grunt.registerTask('FixWholeJavaScript', ['concat','uglify']);
    grunt.registerTask('default', ['concat']);

}