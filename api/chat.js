import OpenAI from "openai";

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    // Read message from request body
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Ensure API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key not set" });
    }

    // Create OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // NEW OpenAI API (correct & supported)
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    // Send reply back
    return res.status(200).json({
      reply: response.output_text,
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
