import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: yes },
  email: { type: String, unique: true },
  image: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Park" }],
});
