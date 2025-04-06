const fs = require('fs');

const content = `
[INFO] Server started
[INFO] User 'admin' logged in
`.repeat(5);

fs.writeFile('log.txt', content, (err) => {
    if (err) throw err;
});

const stream = fs.createReadStream('log.txt', {encoding: 'utf8'});

stream.on('data', (chunk) => {
    console.log('Новий chunk:\n', chunk);
});

stream.on('end', () => {
    console.log('Читання завершено.');
});
