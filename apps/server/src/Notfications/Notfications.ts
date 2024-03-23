import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Function to send emails
function sendEmail(to, subject, text) {
  // Creating a transporter using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use the appropriate email service provider
    auth: {
      user: 'andalusmh2002@gmail.com',
      pass: 'wbjp aqfa qxqe arsy',
    },
  });

  // Email details
  let mailOptions = {
    from: 'andalusmh2002@gmail.com', // Sender address
    to: to, // List of recipients
    subject: subject, // Subject line
    text: text, // Plain text body
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
module.exports = sendEmail;
