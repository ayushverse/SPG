import "dotenv/config"
import express from "express";
import connectDB from "./src/db/db.js";
import * as bodyParser from "express";
import cors from "cors";
import authRoute from "./src/route/auth.route.js";

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use("/auth",authRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`)
    connectDB()
})