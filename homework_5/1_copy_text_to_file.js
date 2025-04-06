const fs = require('fs');

const content = `Node is a powerful JavaScript runtime built on Chrome's V8 engine.
Many developers choose Node for building fast and scalable network applications.
With its vast ecosystem, Node makes backend development efficient and modern.`;

fs.writeFile('source.txt', content, (err) => {
    if (err) throw err;
});

fs.readFile('source.txt', 'utf8', (err, data) => {
    if (err) throw err;

    fs.writeFile('copy.txt', data, (err) => {
        if (err) throw err;
    });
});