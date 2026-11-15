import express from "express";
import { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from "../controller/productController.js";

const productRoute = express.Router();

productRoute.post("/product", createProduct);
productRoute.get("/products", getAllProducts);
productRoute.get("/product/:id", getProductById);
productRoute.put("/product/:id", updateProduct);
productRoute.delete("/product/:id", deleteProduct);

export default productRoute;