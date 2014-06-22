module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // chech our JS
        jshint: {
            options: {
                "bitwise": true,
                "browser": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "esnext": true,
                "immed": true,
                "jquery": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "node": true,
                "strict": false,
                "trailing": true,
                "undef": true,
                "globals": {
                    "jQuery": true,
                    "alert": true
                }
            },
            all: [
                'gruntfile.js',
                '../assets/js/custom.js',
                '../assets/js/color-picker.js'
            ]
        },

        // concat and minify our JS
        uglify: {
            dist: {
                files: {
                    '../assets/js/scripts.min.js': [
                        '../assets/js/vendor/modernizr.js',
                        '../assets/js/vendor/jquery.js',
                        '../assets/js/vendor/fitvids.js',
                        '../assets/js/custom.js'
                    ]
                }
            },
            'dist-cp': {
                files: {
                    '../assets/js/scripts.min.js': [
                        '../assets/js/vendor/modernizr.js',
                        '../assets/js/vendor/jquery.js',
                        '../assets/js/vendor/fitvids.js',
                        '../assets/js/vendor/cookie.js',
                        '../assets/js/color-picker.js',
                        '../assets/js/custom.js'
                    ]
                }
            },
            'option-cp': {
                files: {
                    '../assets/js/scripts-with-cp.min.js': [
                        '../assets/js/vendor/modernizr.js',
                        '../assets/js/vendor/jquery.js',
                        '../assets/js/vendor/fitvids.js',
                        '../assets/js/vendor/cookie.js',
                        '../assets/js/color-picker.js',
                        '../assets/js/custom.js'
                    ]
                }
            }
        },

        // compile our SCSS
        sass: {
            dev: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../assets/css/style.css': '../assets/scss/style.scss'
                }
            },
            scheme0: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../assets/css/style-0.css': '../assets/scss/style.scss'
                }
            },
            scheme1: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../assets/css/style-1.css': '../assets/scss/schemes/color-scheme-1.scss'
                }
            },
            scheme2: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../assets/css/style-2.css': '../assets/scss/schemes/color-scheme-2.scss'
                }
            },
            scheme3: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../assets/css/style-3.css': '../assets/scss/schemes/color-scheme-3.scss'
                }
            },
            scheme4: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../assets/css/style-4.css': '../assets/scss/schemes/color-scheme-4.scss'
                }
            },
            scheme5: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../assets/css/style-5.css': '../assets/scss/schemes/color-scheme-5.scss'
                }
            }

        },

        // watch for changes
        watch: {
            scss: {
                files: ['../assets/scss/**/*.scss'],
                tasks: [
                    'sass:dev',
                    'notify:scss'
                ]
            },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: [
                    'jshint',
                    'uglify:dist',
                    'notify:js'
                ]
            },
            inject: {
                files: [
                    '../assets/css/style.css'
                ],
                options: {
                    livereload: true
                }
            },
            hbs: {
                files: ['../**/*.hbs'],
                options: {
                    livereload: true
                }
            }
        },

        // notify via OSX
        notify: {
            scss: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'SCSS is all good'
                }
            },
            js: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'JS is all good'
                }
            }
        }

    });

    // Load NPM's via matchdep
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Development task
    grunt.registerTask('default', [
        'jshint',
        'uglify:dist',
        'sass'
    ]);

    grunt.registerTask('color-picker', [
        'jshint',
        'uglify:dist-cp',
        'sass'
    ]);

    grunt.registerTask('distribution', [
        'jshint',
        'uglify:dist',
        'uglify:option-cp',
        'sass'
    ]);
};