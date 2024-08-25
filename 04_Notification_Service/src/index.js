const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { connectQueue } = require('./services/queue.service');


const app = express();

app.use('/api', apiRoutes);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    console.log(`checkout the rabbitmq Dashboard at http://localhost:15672`);
    await connectQueue();
    console.log("queue is up");
});
