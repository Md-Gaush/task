import express from "express";
import {  getAllDetails, userDetails } from "../controllers/userController.js";

const route = express.Router();

route.post("/details",userDetails)
route.get('/all',getAllDetails)

export default route