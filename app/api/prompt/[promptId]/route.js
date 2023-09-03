import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.promptId).populate({
      path: "creator",
    });

    if (!prompt) return new Response("Prompt not fount", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 });
  }
};

const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();

    await Prompt.findByIdAndRemove(params.promptId);

    return new Response("Prompt deleted successfully", { status: 204 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};

const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();

    const { prompt, tag } = await req.json();

    const existingPrompt = await Prompt.findById(params.promptId);

    if (!prompt) return new Response("Prompt not fount", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export { GET, DELETE, PATCH };
