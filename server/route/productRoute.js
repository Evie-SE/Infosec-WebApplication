import express from "express";
import { 
  createProduct, 
  getAllProducts, 
  getProductByName, 
  updateProductByName, 
  deleteProductByName 
} from "../controller/productController.js";

const productRoute = express.Router();

productRoute.post("/product", createProduct);
productRoute.get("/products", getAllProducts);
productRoute.get("/product/:name", getProductByName);
productRoute.put("/product/:name", updateProductByName);
productRoute.delete("/product/:name", deleteProductByName);

export default productRoute;