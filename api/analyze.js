// Serverless function: keeps the Gemini API key on the server (never in the browser).
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  const key = (process.env.GEMINI_API_KEY || "").trim();
  if (!key) return res.status(500).json({ error: "Server is not set up yet (missing GEMINI_API_KEY in Vercel)." });
  const prompt = req.body && req.body.prompt;
  if (typeof prompt !== "string" || prompt.trim().length < 20) return res.status(400).json({ error: "Missing or too short input." });
  if (prompt.length > 25000) return res.status(400).json({ error: "Input is too long." });

  // Try the chosen model first, then a few backups if a model is unavailable.
  const models = [...new Set([process.env.GEMINI_MODEL, "gemini-2.5-flash", "gemini-flash-latest", "gemini-2.0-flash"].filter(Boolean))];
  let lastError = "Unknown error";
  for (const model of models) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
        })
      });
      if (!r.ok) {
        let msg = "";
        try { msg = ((await r.json()).error || {}).message || ""; } catch (e) {}
        lastError = `Gemini error ${r.status} (${model}): ${msg}`.slice(0, 300);
        if ([404, 429, 503].includes(r.status)) continue; // try the next model
        return res.status(502).json({ error: lastError });
      }
      const data = await r.json();
      let parts = (((data.candidates || [])[0] || {}).content || {}).parts;
      let text = parts && parts[0] ? parts[0].text : "";
      text = String(text).replace(/```json|```/g, "").trim();
      if (!text) { lastError = "The AI returned an empty answer. Please try again."; continue; }
      return res.status(200).json({ result: JSON.parse(text) });
    } catch (e) {
      lastError = "The AI answer could not be read. Please try again.";
    }
  }
  return res.status(502).json({ error: lastError });
};
