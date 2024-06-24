module.exports = function(grunt) {
    // Carrega as tarefas do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // Configuração do Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' // Certifique-se de que este caminho existe
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' // Certifique-se de que este caminho existe
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: '/dev/styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '/src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'prebuild/index.html' // Certifique-se de que este caminho existe
                }
            }
        },
        clean: ['prebuild'],
        uglify:{
              target:{
                files: {
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
              }
        }
    });

    // Registra tarefas do Grunt
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'replace:dev', 'htmlmin:dist', 'clean', 'uglify']);
};
