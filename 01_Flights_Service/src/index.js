const express=require('express');
const {serverConfig}=require('./config');
const apiRouter = require('./routes');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRouter);

app.listen(serverConfig.PORT,()=>{
    console.log(`server started at port ${serverConfig.PORT}`);
});