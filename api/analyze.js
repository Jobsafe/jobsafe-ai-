// Serverless function: keeps the Gemini API key on the server (never in the browser).
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: "Server is not set up yet (missing API key)." });
  const prompt = req.body && req.body.prompt;
  if (typeof prompt !== "string" || prompt.trim().length < 20) return res.status(400).json({ error: "Missing or too short input." });
  if (prompt.length > 25000) return res.status(400).json({ error: "Input is too long." });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
      })
    });
    if (r.status === 429) return res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
    if (!r.ok) return res.status(502).json({ error: "The AI service returned an error. Please try again." });
    const data = await r.json();
    let text = (((data.candidates || [])[0] || {}).content || {}).parts;
    text = text && text[0] ? text[0].text : "";
    text = String(text).replace(/```json|```/g, "").trim();
    return res.status(200).json({ result: JSON.parse(text) });
  } catch (e) {
    return res.status(502).json({ error: "The AI answer could not be read. Please try again." });
  }
};
