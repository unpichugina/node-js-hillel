const {Transform} = require('stream');

const maskPassword = new Transform({
    transform(chunk, encoding, callback) {
        const input = chunk.toString();
        const masked = input.replace(/password/gi, '********');
        callback(null, masked);
    }
});

process.stdin.pipe(maskPassword).pipe(process.stdout);
