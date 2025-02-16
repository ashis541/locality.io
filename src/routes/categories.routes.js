import { Router } from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {createCategory,deleteCategory,getCategories,getCategoryById,updateCategory } from '../controllers/categories.controller.js';

const routes = new Router();

routes.route("/createcategory").post(verifyJWT,createCategory)
routes.route("/getcategories").get(verifyJWT,getCategories)
routes.route("/getcategoryById/:id").post(verifyJWT,getCategoryById)
routes.route("/updatecategory/:id").put(verifyJWT,updateCategory)
routes.route("/deletecategory/:id").delete(verifyJWT, deleteCategory);


export default routes