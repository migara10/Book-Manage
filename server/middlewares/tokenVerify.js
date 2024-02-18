import jwt from "jsonwebtoken";
import config from '../config.js';

const tokenVerifyMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], config.ACCESS_KEY);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export default tokenVerifyMiddleware;
