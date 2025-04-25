const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

function factorial(n) {
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}

if (isMainThread) {
    const number = 100n;

    const worker = new Worker(__filename, {
        workerData: number
    });

    worker.on('message', (message) => {
        console.log(`Факторіал числа ${number} = ${message}`);
    });

    worker.on('error', (error) => {
        console.error('Помилка у робочому потоці:', error);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.log(`Потік завершив роботу з кодом ${code}`);
        } else {
            console.log('Потік завершив роботу без помилок');
        }
    });

} else {
    const result = factorial(BigInt(workerData));
    parentPort.postMessage(result.toString());
}
