import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req, res) {
  try {
    const { userPrompt } = req.body;

    if (!process.env.API_KEY) {
      return res.status(500).json({ error: "API_KEY not set on server" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const movieSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        year: { type: Type.INTEGER },
        genre: { type: Type.STRING },
        synopsis: { type: Type.STRING },
      },
      required: ["title", "year", "genre", "synopsis"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert movie recommender. Based on the following user request, suggest 5 movies that would be their next cinematic obsession. User request: '${userPrompt}'. Provide output as JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: movieSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const movies = JSON.parse(jsonText);

    return res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({ error: "Server error while fetching movies" });
  }
}
