import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { parkId, userId, content } = req.body;
    const { db } = await connectToDatabase();

    const newComment = {
      parkId,
      userId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("comments").insertOne(newComment);
    res.status(201).json({ message: "Comment added successfully" });
  } else {
    res.status(405).json({ message: "Only POST requests allowed" });
  }
  if (req.method === "PUT") {
    const { commentId, content } = req.body;
    const { db } = await connectToDatabase();

    await db
      .collection("comments")
      .updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { content, updatedAt: new Date() } }
      );

    res.status(200).json({ message: "Comment updated successfully" });
  } else {
    res.status(405).json({ message: "Only PUT requests allowed" });
  }
  if (req.method === "DELETE") {
    const { commentId } = req.body;
    const { db } = await connectToDatabase();

    await db.collection("comments").deleteOne({ _id: new ObjectId(commentId) });

    res.status(200).json({ message: "Comment deleted successfully" });
  } else {
    res.status(405).json({ message: "Only DELETE requests allowed" });
  }
}
