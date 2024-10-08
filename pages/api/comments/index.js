import { getSession } from "next-auth/react";
import Comment from "@/db/models/Comment";

export default async function comment(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { parkId, content } = req.body;

    try {
      const newComment = await Comment.create({
        userId: session.user.id, // Ensure you get the correct user ID
        parkId,
        content,
      });

      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Error saving the comment" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
