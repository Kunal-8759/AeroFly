const express=require('express');
const { BookingController } = require('../../controllers');
const { BookingMiddleware } = require('../../middlewares');

const bookingRouter=express.Router();

// api/v1/bookings POST
bookingRouter.post('/',BookingMiddleware.validateCreateBookingRequest,BookingController.createBooking);

// api/v1/bookings/payments POST
bookingRouter.post('/payments',BookingMiddleware.validatePaymentRequest,BookingController.makePayment);

bookingRouter.post('/seats',BookingController.seatBooking);

module.exports=bookingRouter;