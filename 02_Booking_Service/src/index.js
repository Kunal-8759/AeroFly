const express = require('express');

const { ServerConfig,Queue } = require('./config');
const apiRouter =require('./routes');
const CRON  = require('./utils/common/cron.jobs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRouter);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    CRON();
    await Queue.connectQueue();
    console.log("Queue Connected");
});
