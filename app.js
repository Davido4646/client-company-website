const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Use body-parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.render('index', { title: 'My Company' });
});

app.get('/contact', function(req, res) {
    res.render('index', { status: 'success' }); // you can replace 'success' with 'error' to test the error message
  });  

app.post('/contact', (req, res) => {
  // Send email using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'New Contact Request',
    html: `
      <h2>New Contact Request</h2>
      <p>Name: ${req.body.name}</p>
      <p>Email: ${req.body.email}</p>
      <p>Phone: ${req.body.phone}</p>
      <p>Message: ${req.body.message}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.redirect('/contact?status=error');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/contact?status=success');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
