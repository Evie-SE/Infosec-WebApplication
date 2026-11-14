import express from "express"
import { createProduct } from "../controller/productController.js"

const route = express.Router();

route.post("/product", createProduct);

export default route;
