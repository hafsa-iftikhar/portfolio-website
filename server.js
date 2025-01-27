require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Enable CORS for all requests
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Your frontend URL
}));

// Middleware
app.use(express.json());

// Email sending route
app.post('/send-mail', (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hafsaiftikhar2003@gmail.com', // Your email
      pass: 'hafsa9090',          // Replace with your Gmail App Password
    },
  });
  

  const mailOptions = {
    from: email, // Sender email
    to: 'hafsaiftikhar2003@gmail.com', // Receiver email
    subject: subject,
    text: `You have a new message from ${name} (${email}): \n\n${message}`,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Failed to send message');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Message sent successfully!');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
