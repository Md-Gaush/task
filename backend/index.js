import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConn.js";
import userRoutes from "./Route/userRoute.js";
import msgRoutes from "./Route/msgRoute.js";
import { startCron } from "./cron.js";
dotenv.config({});
const app = express();
import path from 'path'


const _dirname = path.resolve()

app.use(
  cors({
    origin: "https://task-h66k.onrender.com",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes);
app.use("/api", msgRoutes);
const port = process.env.PORT;

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(port, () => {
  console.log("Server running on",port);
  dbConnection();
  startCron();
});
