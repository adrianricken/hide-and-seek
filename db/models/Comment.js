import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  parkId: { type: Schema.Types.ObjectId, required: true, ref: "Park" },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment =
  mongoose.models.comment || mongoose.model("Comment", commentSchema);

export default Comment;
