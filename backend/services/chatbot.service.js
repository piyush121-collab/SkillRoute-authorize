import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-small-latest", // ✅ use latest stable model name
        messages: [{ role: "user", content: message }],
      }),
    });

    const text = await response.text(); // 👀 grab raw response
    console.log("Raw Mistral API response:\n", text); // log everything

    let botReply = "Sorry, I couldn’t respond.";
    try {
      const data = JSON.parse(text);

      if (data?.choices && data.choices.length > 0) {
        botReply = data.choices[0].message?.content || botReply;
      }
    } catch (jsonErr) {
      console.error("Failed to parse JSON:", jsonErr);
    }

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error with Mistral API:", error);
    res.status(500).json({ reply: "Error connecting to AI service." });
  }
});

export default router;
