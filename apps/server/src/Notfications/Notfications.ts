const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile)

const app = express();

app.use(express.json());

async function sendEmail(to, subject, username) {
  let htmlTemplate = await readFileAsync('apps/server/src/utils/index.html', 'utf-8');
  htmlTemplate = htmlTemplate.replace('[Recipient]', username);
  const imageAttachment = await readFileAsync('apps/server/src/utils/cat.png');
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'andalusmh2002@gmail.com',
      pass: 'wbjp aqfa qxqe arsy',
    },
  });

  let mailOptions = {
    from: 'andalusmh2002@gmail.com',
    to: to,
    subject: subject,
    html: htmlTemplate,
    attachments: [{
      filename: 'image.png',
      content: imageAttachment,
      encoding: 'base64',
      cid: 'uniqueImageCID',
    }],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
module.exports = sendEmail;
