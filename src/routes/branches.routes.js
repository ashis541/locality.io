import { Router } from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { createNewBranch,getAllBranch} from '../controllers/branches.controller.js';

const routes = new Router();

routes.route("/createbranch").post(verifyJWT,createNewBranch)
routes.route("/getallBranch").get(verifyJWT,getAllBranch)

export default routes