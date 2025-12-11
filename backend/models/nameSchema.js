import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    country: String,
    probability: Number,
    status: String,
    synced: { type: Boolean, default: false },
  },{ timestamps: true });

  const User = mongoose.model("User", userSchema);

  export default User;