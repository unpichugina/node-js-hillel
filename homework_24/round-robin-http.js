const http = require('http');
const {createProxyServer} = require('http-proxy');

const ports = [3001, 3002, 3003];
let current = 0;

const proxy = createProxyServer({});
const loadBalancer = http.createServer((req, res) => {
    const target = ports[current];
    current = (current + 1) % ports.length;

    proxy.web(req, res, {target: `http://localhost:${target}`}, (e) => {
        res.writeHead(502);
        res.end('Bad Gateway');
    });
});

loadBalancer.listen(8080, () => {
    console.log('Load balancer працює на http://localhost:8080');
});

ports.forEach((port, i) => {
    http.createServer((req, res) => {
        res.end(`Відповідь від сервера ${i + 1}`);
    }).listen(port, () => {
        console.log(`Бекенд-сервер ${i + 1} працює за адресою http://localhost:${port}`);
    });
});
