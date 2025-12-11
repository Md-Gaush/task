import express from "express";
import { showMsg } from "../controllers/showMsgController.js";
const route = express.Router();

route.get("/msg",showMsg)


export default route