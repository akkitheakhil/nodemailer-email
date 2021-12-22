const rateLimit = require("express-rate-limit");
const express = require('express');
require('dotenv').config();
var nodemailer = require('nodemailer');
// Rate Limiter
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});


const router = express.Router();

router.post('/', limiter, async (req, res, next) => {
    let { email, name, subject, message } = req.body;
    try {
        const mailOptions = {
            from: email,  // sender address
            to: 'speaktoakhilp@gmail.com',   // list of receivers
            subject: `PORTFOLIO - ${subject} - ${name}`, // Subject line
            text: `${message}`, // plain text body
            html: `<b>Hey there! </b><br> 
            This is ${name} - ${email} <br>
            <b>Message: </b> ${message}`
        };


        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                next(error);
            }
            res.json({ message: 'Email sent successfully' });
        });
    }
    catch (error) {
        next(error);
    }
})

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    secure: true,
});

module.exports = router;