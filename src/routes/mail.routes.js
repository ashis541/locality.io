import { Router } from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {completeEmailConnection,initiateEmailConnection} from '../controllers/Emailhandeler/emailauth.controller.js'
import {sendOrganizationEmail} from '../controllers/Emailhandeler/sendemail.controller.js'
import {requireEmailConnection} from'../middlewares/connectmail.middleware.js'

const routes = new Router();

routes.route("/connectmail").get(verifyJWT, initiateEmailConnection);
routes.route("/complete-email-connection").post(verifyJWT,completeEmailConnection)
routes.route("/send-email").post(verifyJWT,requireEmailConnection,sendOrganizationEmail)

export default routes