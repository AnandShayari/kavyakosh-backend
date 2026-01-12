import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key missing" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    return res.status(200).json({
      reply: response.output_text,
    });

  } catch (error) {
    console.error("OPENAI CRASH:", error);
    return res.status(500).json({
      error: "OpenAI request failed",
      details: error.message,
    });
  }
}
