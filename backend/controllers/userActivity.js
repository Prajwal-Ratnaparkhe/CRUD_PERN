const express = require("express");
const { status } = require("express/lib/response");
const dotenv = require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../db/db');


router.post("/register", async (req, res, next) => {
  try {
      const { fullName, email, mobile, gender, password } = req.body;

      // Check if the email is already registered
      const emailExistsQuery = 'SELECT id FROM users WHERE email = $1';
      const emailExistsResult = await pool.query(emailExistsQuery, [email]);

      if (emailExistsResult.rows.length > 0) {
          // If the email already exists, return an error indicating that the user is already registered
          return res.status(400).json({ msg: 'Email already registered' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user data into the 'users' table
      const insertUserQuery = 'INSERT INTO users (fullName, email, mobile, gender, password) VALUES ($1, $2, $3, $4, $5) RETURNING id';
      const insertUserResult = await pool.query(insertUserQuery, [fullName, email, mobile, gender, hashedPassword]);

      // If the insertion is successful, return the user ID
      const userId = insertUserResult.rows[0].id;
      res.status(201).json({ userId });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


  router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Query to fetch the user based on the email
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
  
      // Check if user exists
      if (result.rows.length === 0) {
        return res.status(401).json({
          msg: 'User Not Found',
        });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, result.rows[0].password);
      
      if (passwordMatch) {
        // Generate JWT token
        const token = jwt.sign(
          {
            email: result.rows[0].email,
            userId: result.rows[0].id, // Assuming the user ID is stored in a column named 'id'
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1d',
          }
        );
  
        return res.status(200).json({
          _id: result.rows[0].id,
          token: token,
        });
      } else {
        // If passwords don't match
        return res.status(401).json({
          msg: 'Password does not match',
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({
        err: 'Internal server error',
      });
    }
  });
  

module.exports = router;
