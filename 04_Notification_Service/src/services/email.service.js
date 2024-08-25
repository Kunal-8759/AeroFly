const { Mailer } = require("../config");

async function sendEmail(mailFrom,mailTo,subject,text){
    try {
        const response = await Mailer.sendMail({
            from : mailFrom,
            to : mailTo,
            subject : subject,
            text : text
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    sendEmail
}