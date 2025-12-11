import Msg from "../models/messageSchema.js";

export const showMsg = async(req,res)=>{
    try {
        const msg = await Msg.find().sort({ createdAt: -1 }).limit(50);
        return res.status(200).json({ success: true, data: msg })
 
    } catch (error) {
        console.log(error)
    }
}