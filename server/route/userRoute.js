import express from "express";
import { createUser, getAllUsers } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.post("/user", createUser);
userRoute.get("/users", getAllUsers);

export default userRoute;