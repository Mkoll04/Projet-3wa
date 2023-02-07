import express from "express";

import uploadFilesController from "../controllers/uploadFiles.js"

import addProductsController from "../controllers/addProductsController.js";
import getAllProductsController from "../controllers/getAllProducts.js"
import editProductsController from "../controllers/editProductsController.js"
import getProductsByIDController from "../controllers/getProductsByIDController.js"
import deleteProductsByIDController from "../controllers/deleteProductsByIDController.js"



const router = express.Router();

router.post("/uploadFiles", uploadFilesController);

router.post("/addProducts", addProductsController);
router.get("/getAllProducts", getAllProductsController)
router.post("/editProducts", editProductsController)
router.post("/getProductsByID", getProductsByIDController)
router.post("/deleteProductsByID", deleteProductsByIDController)

export default router;
