import dbConnect from "../../../../db/connect";
import Park from "@/db/models/Park";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();
    if (request.method === "GET") {
      const placeDetail = await Place.findById(id);
      if (!placeDetail) {
        return response.status(404).json({ status: "Not Found" });
      }
      const comments = await Comment.find({
        _id: { $in: placeDetail.comments },
      });

      return response.status(200).json({ place: placeDetail, comments });
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ status: "Internal Server Error", error: error.message });
  }
}
