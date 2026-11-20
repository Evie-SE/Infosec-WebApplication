import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"

import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRoute.js";
import brandRoute from "./route/brandRoute.js";
import orderRoute from "./route/orderRoute.js";
import categoryRoute from "./route/categoryRoute.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();


app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", brandRoute);
app.use("/api", orderRoute);
app.use("/api", categoryRoute);


const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

mongoose
        .connect(MONGOURL)
        .then(()=>{
            console.log("DB connected successfully...");
            app.listen(PORT,()=>{
                console.log(`Server is running on port: ${PORT}`)
            })
        })
        .catch((error) => console.log(error));

