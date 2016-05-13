module.exports = function (grunt) {

    grunt.initConfig({

        shell: {
            dev: {
                command: 'node server.js'
            }
            // запуск сервера через скрипт shell'a
            // https://www.npmjs.com/package/grunt-shell
        },

        watch: {
            scripts: {
                files: ['templates/*.xml', 'public_html/css/*.scss'],
                tasks: ['fest', 'sass'],
                options: {
                    spawn: false
                }
            }
            // запуск watcher'a, который следит за
            // изменениями файлов  templates/*.xml
            // и если они изменяются, то запускает
            // таск сборки шаблонов (grunt fest)
        },

        concurrent: {
            target1: ['shell', 'watch'],
            options: {
                logConcurrentOutput: true
            }
            // одновременный запуска shell'a и watcher'a
            // https://www.npmjs.com/package/grunt-concurrent
        },

        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },

        sass: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'public_html/css',
                    src: '*.scss',
                    dest: 'public_html/css',
                    ext:  '.css'
                }]
            }
        },

        qunit: {
            all: ['./public_html/tests/index.html'],
            options: {
                timeout: 30000
            }
        }


    });

    // подключить все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-sass');

    // результат команды grunt
    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent:target1']);
};
