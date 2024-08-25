const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_SERVICE_URL : process.env.FLIGHT_SERVICE_URL,
    API_GATEWAY_URL : process.env.API_GATEWAY_URL
}