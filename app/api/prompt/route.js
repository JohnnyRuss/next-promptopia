import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req, res) => {
  try {
    await connectToDatabase();

    const posts = await Prompt.find().populate({ path: "creator" });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts", { status: 500 });
  }
};
