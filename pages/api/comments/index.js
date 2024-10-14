import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { userId, parkId, content } = req.body;

    try {
      const newComment = await Comment.create({
        userId,
        parkId,
        content,
        timestamp: new Date(),
      });

      return res.status(201).json(newComment);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating comment", error: error.message });
    }
  }

  if (req.method === "GET") {
    const { parkId } = req.query;

    if (!parkId) {
      return res.status(400).json({ message: "parkId is required" });
    }

    try {
      const comments = await Comment.find({ parkId }).sort({ timestamp: -1 });
      return res.status(200).json(comments);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching comments", error: error.message });
    }
  }

  if (req.method === "DELETE") {
    const { commentId } = req.query;

    if (!commentId) {
      return res.status(400).json({ message: "commentId is required" });
    }

    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting comment", error: error.message });
    }
  }

  // Method not allowed for any other request type
  return res.status(405).json({ message: "Method not allowed" });
}
