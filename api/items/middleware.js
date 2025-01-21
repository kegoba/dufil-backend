
import dotenv from 'dotenv';
dotenv.config();



import  jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;



export const checkAuth = (req, res, next) => {
    console.log(" i amhere")
  const authHeader = req.header('Authorization');


  if (!authHeader) {
    return res.status(401).json({error: 'Access denied. Invalid token format.', status : 401});
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json('Access denied. Invalid token format.');
  }
   
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(400).send('Invalid token.');
  }
};




export const createItemMiddleware = (req, res, next) => {
    const { name, description } = req.body;


    if (!name || !description) {
        return res.status(400).json({ error: 'Both name and description are required.' });
    }

   
    if (typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ error: 'Name must be at least 3 characters.' });
    }

   
    if (typeof description !== 'string' || description.trim().length < 5) {
        return res.status(400).json({ error: 'Description must be at least 5.' });
    }

    next();
};



export const updateMiddleware = (req, res, next) => {
    const { name, description } = req.body;


    if (!name || !description) {
        return res.status(400).json({ error: 'request body can not be empty.' });
    }

    next();
};


