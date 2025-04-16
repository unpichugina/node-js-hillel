const fs = require('fs');
const path = require('path');

const message = 'Hello';
const binaryData = Buffer.from(message, 'utf8');
const filePath = path.join(__dirname, 'my-binary-file.bin');

fs.writeFileSync(filePath, binaryData, (err) => {
    if (err) throw err;
});

const buffer = fs.readFileSync(filePath, (err, data) => {
    if (err) throw err;
});

console.log('Вміст файлу у вигляді Buffer:', buffer);
console.log('Вміст файлу як рядок:', buffer.toString());
