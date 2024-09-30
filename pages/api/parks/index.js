import dbConnect from "@/db/connect";
import Park from "@/db/models/Parks";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const parks = await Park.find();
    return response.status(200).json(parks);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
