import express from "express";

import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post('/add', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
]), addProduct)
userRouter.post('/remove', adminAuth, removeProduct)
userRouter.get('/single', singleProduct)
userRouter.get('/list', listProduct)

export default userRouter;