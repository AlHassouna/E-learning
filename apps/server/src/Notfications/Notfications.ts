const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile)

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Function to send emails
async function sendEmail(to, subject, username) {
  let htmlTemplate = await readFileAsync('apps/server/src/utils/index.html', 'utf-8');
  htmlTemplate = htmlTemplate.replace('[Recipient]', username);
    const imageAttachment = await readFileAsync('apps/server/src/utils/cat.png');
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
    html: htmlTemplate,
    attachments: [{
        filename: 'image.png',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'uniqueImageCID', // Referenced in the HTML template
    }],  };

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
