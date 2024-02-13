import express from 'express'; // import express
import userController from './../controllers/authController.js'; // import user controller

const route = express.Router();

route.post('/register', userController.registerUser); // register route



export default route;