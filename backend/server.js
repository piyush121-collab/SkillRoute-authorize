// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// quick health check
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// POST /api/chat
// body: { message: string, history?: [{role:'user'|'assistant', text}] }
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Keep last 6 turns for context
    const last = history.slice(-6);
    const convo = last
      .map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`)
      .join('\n');

    // Add system instruction for short replies
    const prompt = `You are a helpful chatbot. 
Always answer in **short, concise sentences (max 10 lines)**. 
Avoid long paragraphs.\n
${convo}\nUser: ${message}\nAssistant:`;

    // Call Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error('Chat error', err);
    res.status(500).json({ error: err.message || 'internal error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
