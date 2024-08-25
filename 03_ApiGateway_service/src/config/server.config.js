const dotenv=require('dotenv');

dotenv.config();
module.exports={
    PORT:process.env.PORT || 3001,
    SALT_ROUNDS:process.env.SALT_ROUNDS,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    FLIGHT_SERVICE_URL : process.env.FLIGHT_SERVICE_URL,
    BOOKING_SERVICE_URL : process.env.BOOKING_SERVICE_URL
}