import express from "express";

import uploadFilesController from "../controllers/uploadFiles.js"

import addProductsController from "../controllers/addProductsController.js";
import getAllProductsController from "../controllers/getAllProducts.js"
import editProductsController from "../controllers/editProductsController.js"
import getProductsByIDController from "../controllers/getProductsByIDController.js"
import deleteProductsByIDController from "../controllers/deleteProductsByIDController.js"
import getCategoriesController from "../controllers/getCategoriesController.js"

import middlewareUploadFile from "../controllers/middlewareUploadFile.js"
import editPicturesController from "../controllers/editPicturesController.js"

import registerUserController from "../controllers/registerUserController.js"
import updateUserController from "../controllers/updateUserController.js"
import getUserByIdController from "../controllers/getUserByIdController.js"
import loginController from "../controllers/loginController.js"
import checkToken from '../controllers/checkToken.js'

import addToCartController from "../controllers/addToCartController.js"
import getCartController from "../controllers/getCartController.js"
import deleteCartController from "../controllers/deleteCartController.js"
const router = express.Router();

router.post("/uploadFiles", uploadFilesController);

router.post("/addProducts",middlewareUploadFile, addProductsController);
router.get("/getAllProducts", getAllProductsController)
router.post("/editProducts", editProductsController)
router.post("/getProductsByID", getProductsByIDController)
router.post("/deleteProductsByID", deleteProductsByIDController)
router.get("/getCategories", getCategoriesController)
router.post("/editPictures", middlewareUploadFile, editPicturesController)

router.post("/registerUser",registerUserController)
router.post("/updateUser", updateUserController)
router.post("/getUserById", getUserByIdController)
router.post("/login", loginController)
router.get("/relogged", checkToken)

router.post("/addToCart", addToCartController)
router.post("/getCart", getCartController)
router.post("/deleteCart", deleteCartController)


export default router;
