'use strict';

module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);

    grunt.initConfig({

		browserify: {
			dist: {
				files: {
					'build/_browserify.js': 'app/scripts/**/*.js'
				}
			}
		},

		uglify: {
			dist: {
				src: 'build/_browserify.js',
				dest: 'www/scripts.min.js'
			}
		},

		sass: {
			dist: {
				options: {
				    style: 'compressed'
				},
				files: {
				    'www/styles.css': 'app/styles/*.scss'
				}
			}
		},

		copy: {
			htmls: {
				expand: true,
				cwd: 'app',
				src: '**/*.html',
				dest: 'www/'
			},
            files: {
                expand: true,
                cwd: 'app/files',
                src: '**/*',
                dest: 'www/files'
            },
            diagram_js: {
                files: [
                    {
                        src: 'node_modules/diagram-js/assets/diagram-js.css',
                        dest: 'www/vendor/diagram-js.css'
                    }
                ]
            },
            bpmn_js: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/bpmn-js/assets',
                        src: ['**/*.*', '!**/*.js'],
                        dest: 'www/vendor'
                    }
                ]
            }
		},

		watch: {
			options: { livereload: true },
			scripts: {
				files: ['app/scripts/*.js'],
				tasks: ['browserify', 'uglify'],
				options: {
				    spawn: false
				}
			},
			styles: {
				files: ['app/styles/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['app/**/*.html'],
				tasks: ['copy:htmls'],
				options: {
					spawn: false
				}
			},
            files: {
                files: ['app/files/**/*'],
                tasks: ['copy:files'],
                options: {
                    spawn: false
                }
            }
		},

		connect: {
			server: {
				options: {
					livereload: true,
					port: 9000,
					base: 'www',
                    open: {
                        target: 'http://localhost:9000'
                    }
				}
			}
		}

    });

    grunt.registerTask('default', [
		'browserify',
        'uglify',
		'sass',
		'copy'
	]);

    grunt.registerTask('server', [
		'default',
		'connect',
		'watch'
	]);

};
