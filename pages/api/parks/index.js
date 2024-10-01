import Park from "@/db/models/Park";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const parks = await Park.find();
      return response.status(200).json(parks);
    }
  } catch (error) {
    console.log(error);
  }
}
