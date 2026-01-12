export default async function handler(req, res) {
  // ✅ Allow CORS (important for browser + Hoppscotch)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ❌ Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    // ✅ Safely read request body
    const body = req.body;
    const message = body?.message;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    // ✅ TEMP RESPONSE (testing phase)
    return res.status(200).json({
      reply: `You sent: ${message}`
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error"
    });
  }
}
