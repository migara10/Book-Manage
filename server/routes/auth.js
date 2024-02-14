import express from 'express'; // import express
import userController from './../controllers/authController.js'; // import user controller

const route = express.Router();

route.post('/register', userController.registerUser); // register route
route.post('/login', userController.loginUser); // register route



export default route;