import express from 'express'; // import express
import userController from './../controllers/authController.js'; // import user controller
import tokenVerify from './../middlewares/tokenVerify.js'; // check token is valid

const route = express.Router();

route.post('/register', userController.registerUser); // register route
route.post('/login', userController.loginUser); // register route
route.post('/token', userController.getToken); // get accessToken
route.delete('/logout', userController.logOut) // logout user

route.get('/users',tokenVerify, userController.getAllUsers); // get all registered users



export default route;