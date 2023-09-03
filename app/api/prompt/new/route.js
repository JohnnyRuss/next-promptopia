import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();

    const newPrompt = await Prompt.create({
      tag,
      prompt,
      creator: userId,
    });

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("failed to create a new prompt", { status: 500 });
  }
};
