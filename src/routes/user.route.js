
import { Router } from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { registerUser,loginUser,logoutUser } from '../controllers/user.controller.js';

const routes = new Router();


routes.route("/register").post(registerUser)
routes.route('/login').post(loginUser)
routes.route('/logout').post(verifyJWT,logoutUser)



export default routes