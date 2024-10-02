import Park from "@/db/models/Park";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();
    if (request.method === "GET") {
      const parkDetail = await Park.findById(id);
      if (!parkDetail) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json({ park: parkDetail });
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ status: "Internal Server Error", error: error.message });
  }
}
