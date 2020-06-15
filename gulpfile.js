/*

импортируем функции из модуля gulp:
src - работает с исходными файлами, которые надо преобразовать, на вход передаем массив путей из которых надо включать (или исключать) исходные файлы.
dest - куда надо помещать собранные файлы.
watch - следит за изменениями файлов в папке, нужна для автоматической пересборки проекта.

*/

const { src, dest, watch } = require('gulp');

const data = require('gulp-data');

// переименовывает файлы, в нашем случае из *.njk - файлы шаблонизатора Nunjucks в html
const rename        = require('gulp-rename');

// плагин Nunjucks для Gulp
const nunjucks      = require('gulp-nunjucks');

// плагин Gulp для того, чтобы получившиеся html файлы были читаемы
const prettifyHtml  = require('gulp-pretty-html');

// для автоматической очистки папки с собранными страницами
const del           = require('del');

// Плагин препроцессора SASS
const sass          = require('gulp-sass');
sass.compiler       = require('node-sass');

// удаляет лишние переводы строк в сгенерированных html файлах
const removeEmptyLines = require('gulp-remove-empty-lines');


// сборка шаблонов в html файлы
const template = () => (
    src([
        './src/templates/**/*.njk',       // включаемые пути
        '!./src/templates/includes/**/*', // исключаемые пути начинаюся со знака (!)
        '!./src/templates/macro/**/*'
    ])
        .pipe(data(function() {
            return {
                items: require('./src/scripts/sql.json')
            }
        }))
        .pipe(nunjucks.compile())           // компипилируем шаблон
        .pipe(rename({ extname: '.html' })) // переименовываем в html
        .pipe(prettifyHtml())               // форматируем получившийся html
        .pipe(removeEmptyLines())           // удаляем лишние пробелы
        .pipe(dest('dist'))                 // сохраняем результат в папке dist
);

// собираем стили
const styles = () => (
    src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/styles'))
);


// скрипты
const scripts = () => (
    src('./src/scripts/**/*.js')
        .pipe(dest('./dist/js'))
);


// задача очистки
const clean = () => del(['dist/*']);


// задача перестройки проекта при изменении файлов в нем
const buildOnChange = () =>  (
    watch('src/**/*').on('all',(path,file) => {

        console.log('Rebuild running...');

        template();
        styles();
        scripts();

        console.log('Rebuild completed.');
    })
);


// экспорт задач
exports.default = () => (template(), styles(), scripts())

exports.buildOnChange = buildOnChange;
exports.build = template;
exports.sass  = styles;
exports.js    = scripts;
exports.clean = clean;