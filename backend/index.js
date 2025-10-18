import "dotenv/config"
import express from "express";
import connectDB from "./src/db/db.js";
import * as bodyParser from "express";
import cors from "cors";
import authRoute from "./src/route/auth.route.js";
import merchantRoute from "./src/route/merchant.route.js";

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use("/api/auth",authRoute)
app.use("/api/merchant",merchantRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`)
    connectDB()
})