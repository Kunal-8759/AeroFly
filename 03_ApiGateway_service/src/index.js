const express =require('express');
const { rateLimit } =require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const {PORT,FLIGHT_SERVICE_URL,BOOKING_SERVICE_URL}=require('./config/server.config');
const apiRouter = require('./routes');
const app=express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 20, // Limit each IP to 3 requests per `window` (here, per 2 minutes).
});

app.use(limiter);


app.use('/flightService',createProxyMiddleware({
	target : FLIGHT_SERVICE_URL,
	changeOrigin :true,
	pathRewrite : {'^/flightService' : '/'}
}));

app.use('/bookingService',createProxyMiddleware({
	target : BOOKING_SERVICE_URL,
	changeOrigin :true,
	pathRewrite : {'^/bookingService' : '/'}
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRouter);




app.listen(PORT,()=>{
    console.log(`Server started on Port : ${PORT}`);
})