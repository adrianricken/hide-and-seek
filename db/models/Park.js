import mongoose from "mongoose";

const { Schema } = mongoose;

const parkSchema = new Schema({
  name: { type: String, required: true },
  location: { type: Object, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  amenities: { type: Array, required: true },
  accessible: { type: Boolean, required: true },
});

const Park = mongoose.models.Park || mongoose.model("Park", parkSchema);

export default Park;
