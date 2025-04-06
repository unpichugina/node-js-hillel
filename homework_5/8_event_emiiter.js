const EventEmitter = require('events');

class Chat extends EventEmitter {
    send(text) {
        this.emit('message', text);
    }
}

const chat = new Chat();

chat.on('message', (msg) => {
    console.log('Отримано повідомлення:', msg);
});

chat.send('Привіт');
