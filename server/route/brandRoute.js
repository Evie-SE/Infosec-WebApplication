import express from "express";
import { createBrand, getAllBrands } from "../controller/brandController.js";

const brandRoute = express.Router();

brandRoute.post("/brand", createBrand);
brandRoute.get("/brands", getAllBrands); // Note: standard method is route.get

export default brandRoute;