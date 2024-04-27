const express = require('express');
const app = express();

let visitCount = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const intervalId = setInterval(() => {
        res.write(`data: ${visitCount}\n\n`);
    }, 1000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

app.use((req, res, next) => {
    visitCount++;
    next();
});

app.listen(3000, () => {
    console.log('Inicia na porta 3000');
});