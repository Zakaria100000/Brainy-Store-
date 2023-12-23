// Import necessary modules and classes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Client = require('../classes/client')
const Admin = require('../classes/admin')
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY

// Handle client login request
router.post('/client/signin', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Retrieve client data from database
    const client = await Client.findOne({ email: email });
    

    // Check if client exists in the db 
    if (!client) {
      res.status(401).json({ message: 'User does not exist' });
      return;
    }

    // Check if his password is correct and is matching 
    const passwordMatched = await bcrypt.compare(password, client.password);
    if (!passwordMatched) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Save client data in session
    req.session.client = client
    res.status(200).send({ TOKEN_SECRET_KEY, user: 'client' })

    // Redirect to the homepage or the desired page after successful login
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

// Handle Admin login request
router.post('/admin/signin', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Retrieve admin data from database
    const admin = await Admin.findOne({ email: email });

    // Check if admin exists
    if (!admin) {
      res.status(401).json({ message: 'User does not exist' });
      return;
    }

    // Check if password is correct
    const passwordMatched = await bcrypt.compare(password, admin.password);
    if (!passwordMatched) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Save user data in session
    req.session.admin = admin;
    res.status(200).send({ TOKEN_SECRET_KEY , user: 'admin' })

    // Redirect to the homepage or the desired page after successful login
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;