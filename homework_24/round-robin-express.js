const express = require('express');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const app = express();

const backendPorts = [3001, 3002, 3003];
let currentIndex = 0;

backendPorts.forEach((port) => {
    const backendApp = express();
    backendApp.get((req, res) => {
        res.send(`Привіт від бекенд-сервера на порту ${port}`);
    });
    backendApp.listen(port, () => {
        console.log(`Бекенд-сервер працює на порту ${port}`);
    });
});

app.use((req, res) => {
    const targetPort = backendPorts[currentIndex];
    const target = `http://localhost:${targetPort}`;
    currentIndex = (currentIndex + 1) % backendPorts.length;

    proxy.web(req, res, {target}, (err) => {
        res.status(500).send('Помилка проксирування');
    });
});

const PROXY_PORT = 3000;
app.listen(PROXY_PORT, () => {
    console.log(`🚀 Load Balancer (Round Robin) запущено на порті ${PROXY_PORT}`);
});
