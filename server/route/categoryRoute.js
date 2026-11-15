import express from "express";
import { createCategory, getAllCategories } from "../controller/categoryController.js";

const categoryRoute = express.Router();

categoryRoute.post("/category", createCategory);
categoryRoute.get("/categories", getAllCategories);

export default categoryRoute;