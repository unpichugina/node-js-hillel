const fs = require('fs');
const path = require('path');

fs.readdir('.', (err, files) => {
    if (err) throw err;

    let largestFile = '';
    let largestSize = 0;

    files.forEach((file) => {
        const filePath = path.join('.', file);
        const stats = fs.statSync(filePath);

        if (stats.isFile() && stats.size > largestSize) {
            largestSize = stats.size;
            largestFile = file;
        }
    });

    if (largestFile) {
        console.log(`Найбільший файл: ${largestFile}`);
        console.log(`Розмір: ${largestSize} байт`);
    } else {
        console.log('Файли не знайдені у поточній папці.');
    }
});
