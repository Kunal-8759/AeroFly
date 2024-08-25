const cron = require('node-cron');

const { BookingService ,SeatBookingService} = require('../../services');

function scheduleCrons() {
    cron.schedule('*/5 * * * *', async () => {//the cron job will run after every 5 min
        const unpaidBookingId=await BookingService.getOldBooking();
        console.log(unpaidBookingId);
        if(unpaidBookingId.length){
            await BookingService.cancelOldBookings(unpaidBookingId);

            await SeatBookingService.destroyUnpaidBooking(unpaidBookingId);
        }
    });
}

module.exports = scheduleCrons;