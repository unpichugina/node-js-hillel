const message = 'Hello world!';

const buffer = Buffer.from(message, 'utf8');

console.log(`Розмір файлу: ${buffer.length} байтів`);
console.log('Вміст файлу у вигляді Buffer:', buffer);

const restoredMessage = buffer.toString('utf8');

console.log('Відновлене повідомлення:', restoredMessage);
