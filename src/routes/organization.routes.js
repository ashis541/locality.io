
import { Router } from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { registerUser,loginUser,logoutUser,refreshAccessToken } from '../controllers/organization.controller.js';
import multer from 'multer'

const routes = new Router();
const upload = multer()


routes.route("/register").post(registerUser)
//used to access form data in the body of the request
routes.route('/login').post(upload.none(),loginUser)
//secure routes
routes.route('/logout').post(verifyJWT,logoutUser)
routes.route('/refreshtoken').post(refreshAccessToken)



export default routes