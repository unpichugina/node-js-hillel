const http = require('http');

const server = http.createServer((req, res) => {
    const {url, method} = req;

    if (method === 'GET' && url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Home Page');
    } else if (method === 'GET' && url === '/about') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('About Us');
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
