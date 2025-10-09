const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    // DEFINE EMAIL OPTIONS
    const mailOptions = {
        from: 'BI3 <bi3@email.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
        // html
    }
    // ACTUALLY SEND THE EMAIL
    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;