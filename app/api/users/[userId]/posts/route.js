import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    await connectToDatabase();

    const posts = await Prompt.find({ creator: userId }).populate({
      path: "creator",
    });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("failed to get posts", { status: 500 });
  }
};
