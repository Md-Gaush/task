import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
  {
    message: String,
  },
  { timestamps: true }
);

 const Msg = mongoose.model("Msg", msgSchema);

 export default Msg