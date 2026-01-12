export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    return res.status(200).json({
      ok: true,
      body: req.body,
      message: "Vercel API is finally working"
    });
  } catch (err) {
    return res.status(500).json({
      error: "Crash",
      details: err.message
    });
  }
}
