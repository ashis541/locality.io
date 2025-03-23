import { Router } from 'express';
import {getAllPlans} from '../jobs/plans.js'

const routes = new Router();
routes.route("/get-plan").get(getAllPlans)

export default routes