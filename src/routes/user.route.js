
import { Router } from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { registerUser,loginUser,logoutUser,refreshAccessToken } from '../controllers/user.controller.js';

const routes = new Router();


routes.route("/register").post(registerUser)
routes.route('/login').post(loginUser)

//set profile and update profile

//secure routes
routes.route('/logout').post(verifyJWT,logoutUser)
routes.route('/refreshtoken').post(refreshAccessToken)



export default routes