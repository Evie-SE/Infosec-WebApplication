import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/productController.js"

const route = express.Router();

route.post("/product", createProduct);
route.get("/products", getAllProducts);
route.get("/product/:id", getProductById);
route.put("/product/:id", updateProduct);
route.delete("/product/:id", deleteProduct);

export default route;
