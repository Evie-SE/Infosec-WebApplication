import express from "express";
import { createOrder, getAllOrders } from "../controller/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/order", createOrder);
orderRoute.get("/orders", getAllOrders);

export default orderRoute;