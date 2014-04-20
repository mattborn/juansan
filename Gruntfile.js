module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			build: {
				expand: true,
				src: [
					'**/*.html',
					'!index.html',
					'!**/index.html',
					'!node_modules/**',
					'!template/**'
				],
				rename: function (dest, src) {
					return src.replace(/[^\/]+$/, 'index.html');
				}
			}
		},
		less: {
			options: {
				cleancss: true,
			},
			build: {
				expand: true,
				src: [
					'**/*.less',
					'!helpers.less',
					'!node_modules/**',
					'!template/**'
				],
				ext: '.css'
			}
		},
		watch: {
			htmlmin: {
				files: '<%= htmlmin.build.src %>',
				tasks: ['htmlmin'],
				options: {
					livereload: true
				}
			},
			less: {
				files: ['**/*.less', '!node_modules/**', '!template/**'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			}
		},
		concat: {
			build: {
				files: {
					'vendor.js': [
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
					port: 2000
				}
			}
		},
		shell: {
			generate: {
				command: [
					'cp -r template <%= grunt.option(\"name\") %>/',
					'cd <%= grunt.option(\"name\") %>',
					'mv -v template.html <%= grunt.option(\"name\") %>.html',
					'mv -v template.less <%= grunt.option(\"name\") %>.less',
					'mv -v template.js <%= grunt.option(\"name\") %>.js'
				].join(' && '),
				options: {
					stdout: true
				}
			},
			bump: {
				command: 'npm version patch'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('gen', ['shell:generate']);
	grunt.registerTask('build', ['htmlmin', 'less', 'concat']);
	grunt.registerTask('default', ['build', 'connect', 'watch']);

};
