const EmailService = require('./email.service');
const {GMAIL_EMAIL} = require('../config/server-config');

const amqplib = require('amqplib');

async function connectQueue(){
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");

        channel.consume("noti-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail(GMAIL_EMAIL, object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    connectQueue
}