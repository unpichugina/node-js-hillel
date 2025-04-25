const {exec} = require('child_process');

const command = process.platform === 'win32' ? 'dir' : 'ls -la';

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Помилка виконання: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Стандартна помилка: ${stderr}`);
        return;
    }

    console.log(`Результат виконання команди "${command}":\n`);
    console.log(stdout);
});
