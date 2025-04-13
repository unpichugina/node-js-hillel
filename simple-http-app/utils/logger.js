const fs = require('fs');
const path = require('path');

function logger(req) {
    const now = new Date().toISOString();
    const logMessage = `[${now}] ${req.method} ${req.url}\n`;

    const logPath = path.join(__dirname, '../logs.txt');

    fs.appendFile(logPath, logMessage, err => {
        if (err) {
            console.error('Помилка запису в лог-файл:', err);
        }
    });
}

module.exports = logger;
