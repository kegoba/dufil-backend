import  jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();



export const sigUpMiddleware = (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

      if (!first_name || !last_name || !email || !password) {
          return res.status(400).json({ error: 'All fields required.' });
      }

      if (typeof first_name !== 'string' || first_name.trim().length < 2) {
          return res.status(400).json({ error: 'first name is not valid' });
      }
      if (typeof last_name !== 'string' || last_name.trim().length < 2) {
        return res.status(400).json({ error: 'last name is not valid' });
    }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email.' });
      }

      if (typeof password !== 'string' || password.length < 5) {
          return res.status(400).json({
              error: 'Password must be at least 4 characters',
          });
      }


  next();
};


export const sigInMiddleware = (req, res, next) => {
  const { email, password } = req.body;

      if ( !email || !password) {
          return res.status(400).json({ error: 'All fields required.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email.' });
      }

      if (typeof password !== 'string' || password.length < 5) {
          return res.status(400).json({
              error: 'Password must be at least 4 characters',
          });
      }


  next();
};













