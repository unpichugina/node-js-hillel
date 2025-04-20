const fs = require('fs');
const path = require('path');

const message = 'Hello';
const binaryData = Buffer.from(message, 'utf8');
const filePath = path.join(__dirname, 'my-binary-file.bin');

fs.writeFileSync(filePath, binaryData);

const buffer = fs.readFileSync(filePath);

console.log('Вміст файлу у вигляді Buffer:', buffer);
console.log('Вміст файлу як рядок:', buffer.toString());
