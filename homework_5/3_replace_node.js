const fs = require('fs');

fs.readFile('source.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const replacedData = data.replace(/Node/g, 'NODE.JS');

    fs.writeFile('replaced.txt', replacedData, (err) => {
        if (err) throw err;
    });
});
