module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dest: 'build',
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			build: {
				expand: true,
				cwd: 'source',
				src: '**/*.html',
				dest: '<%= dest %>',
				rename: function (dest, src) {
					return dest +'/'+ src.replace(/[^\/]+$/, 'index.html');
				}
			}
		},
		less: {
			options: {
				cleancss: true,
			},
			build: {
				expand: true,
				cwd: 'source',
				src: ['**/*.less', '!helpers.less'],
				dest: '<%= dest %>',
				ext: '.css'
			}
		},
		uglify: {
			build: {
				expand: true,
				cwd: 'source',
				src: '**/*.js',
				dest: '<%= dest %>'
			}
		},
		watch: {
			options: {
				cwd: 'source',
			},
			htmlmin: {
				files: '<%= htmlmin.build.src %>',
				tasks: ['htmlmin'],
				options: {
					livereload: true
				}
			},
			less: {
				files: '<%= less.build.src %>',
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			uglify: {
				files: '<%= uglify.build.src %>',
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			}
		},
		concat: {
			build: {
				files: {
					'source/vendor.js': [
						'bower_components/jquery/dist/jquery.min.js',
						'bower_components/lodash/dist/lodash.min.js',
						'bower_components/backbone/backbone.js',
						'bower_components/moment/min/moment.min.js',
						'bower_components/mustache/mustache.js',
						'bower_components/react/react.min.js'
					]
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 2000,
					base: '<%= dest %>'
				}
			}
		},
		shell: {
			generate: {
				command: [
					'cp -r template source/<%= grunt.option(\"name\") %>/',
					'cd source/<%= grunt.option(\"name\") %>',
					'mv -v template.html <%= grunt.option(\"name\") %>.html',
					'mv -v template.less <%= grunt.option(\"name\") %>.less',
					'mv -v template.js <%= grunt.option(\"name\") %>.js',
					'perl -pi -w -e \'s/template/<%= grunt.option(\"name\") %>/g;\' <%= grunt.option(\"name\") %>.html'
				].join(' && '),
				options: {
					stdout: true
				}
			},
			bump: {
				command: 'npm version patch -m "Bumped to version %s"'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('gen', ['shell:generate']);
	grunt.registerTask('build', ['htmlmin', 'less', 'concat', 'uglify']);
	grunt.registerTask('default', ['build', 'connect', 'watch']);

};
