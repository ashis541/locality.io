import { Router } from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {createProduct,updateProduct,getProducts,getProductById,deleteProduct} from '../controllers/products.controller.js';

const routes = new Router();

routes.route("/createproduct").post(verifyJWT,createProduct)
routes.route("/getproducts").get(verifyJWT,getProducts)
routes.route("/getProductbyid/:id").post(verifyJWT,getProductById)
routes.route("/updatecategory/:id").put(verifyJWT,updateProduct)
routes.route("/deleteproduct/:id").delete(verifyJWT,deleteProduct );


export default routes