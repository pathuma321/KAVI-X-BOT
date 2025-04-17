const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk')
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let logs = [];

app.use(express.json());

app.use(express.static('public'));

io.on('connection', (socket) => {

  logs.forEach(logMessage => {
    socket.emit('log', logMessage);
  });

  socket.on('disconnect', () => {
  });
});

app.get('/', (req, res) => {
    res.json({ message: 'Server is running', status: 'OK' });
});

app.post('/log', (req, res) => {
    const { level, message } = req.body;
    const logMessage = `${new Date().toISOString()} [${level}]: ${message}`;

    logs.push(logMessage);

    io.emit('log', logMessage);
  
    res.status(200).send('Log sent');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(chalk.bold.greenBright(`\nServer is running on port ${PORT}\n`))
});
