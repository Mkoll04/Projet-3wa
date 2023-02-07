import express from "express";
import addProductsController from "../controllers/addProductsController.js";
import uploadFilesController from "../controllers/uploadFiles.js"
import getAllProductsController from "../controllers/getAllProducts.js"
const router = express.Router();

router.post("/addProducts", addProductsController);
router.post("/uploadFiles", uploadFilesController);
router.get("/getAllProducts", getAllProductsController)

export default router;
