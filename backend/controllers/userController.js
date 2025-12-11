import axios from "axios";
import User from "../models/nameSchema.js";

export const userDetails = async (req, res) => {
  try {
    let { names } = req.body;
    if (typeof names === "string") {
        names = names.split(",").map(name => name.trim());
      } 

    const results = await Promise.all(
      names.map(async (name) => {
        const res = await axios.get(`https://api.nationalize.io?name=${name}`);
    //    console.log('yahi dekhna hai',res.data)
        const country = res?.data?.country[0];

        let status = "To Check";
        if (country && country?.probability >= 0.6) status = "Verified";

        const details = await User.create({
          name: name,
          country:  country.country_id ,
          probability: country.probability ,
          status,
        });

        return  details;
      })
    );
  return res.status(201).json({
    success: true,
    data: results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),    
  })
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// get All 

export const getAllDetails = async(req,res)=>{
    try {
      const users = await User.find().sort({ createdAt: -1 });
        return res.status(200).json({
            data:users,
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" });
    }
}