import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const movieSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The full title of the movie.",
    },
    year: {
      type: Type.INTEGER,
      description: "The year the movie was released.",
    },
    genre: {
      type: Type.STRING,
      description: "The primary genre of the movie (e.g., Sci-Fi, Comedy, Drama).",
    },
    synopsis: {
      type: Type.STRING,
      description: "A brief synopsis of the movie and a short explanation of why it fits the user's request.",
    },
  },
  required: ["title", "year", "genre", "synopsis"],
};

export const findMovies = async (userPrompt: string): Promise<Movie[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert movie recommender. Based on the following user request, suggest 5 movies that would be their next cinematic obsession. User request: '${userPrompt}'. Provide the output as a JSON array of objects. For the synopsis, explain why it's a great match.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: movieSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const movies: Movie[] = JSON.parse(jsonText);
    return movies;
  } catch (error) {
    console.error("Error fetching movies from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get movie recommendations: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching movie recommendations.");
  }
};