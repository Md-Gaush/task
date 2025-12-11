
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({})

const db = process.env.MONN

export const dbConnection = () =>{
    mongoose.connect(db).then((res)=>{
        console.log('DB Connected')
    }).catch((error)=>{
        console.log("DB Error",error)
    })
}