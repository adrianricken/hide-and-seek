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
        timestamp: new Date(), // Optional: add a timestamp
      });

      return res.status(201).json(newComment); // Respond with the newly created comment
    } catch (error) {
      return res.status(400).json({ message: "Error creating comment", error });
    }
  }

  // Handle GET requests (if needed)
  if (req.method === "GET") {
    const { parkId } = req.query;

    try {
      const comments = await Comment.find({ parkId }).sort({ timestamp: -1 }); // Get comments for the specific park
      return res.status(200).json(comments);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error fetching comments", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" }); // Handle unsupported methods
}
