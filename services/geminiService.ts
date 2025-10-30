import { Movie } from "../types";

export const findMovies = async (userPrompt: string): Promise<Movie[]> => {
  try {
    const response = await fetch("/api/findMovies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt }),
    });

    if (!response.ok) throw new Error("Server error fetching movies");

    const data = await response.json();
    return data.movies;
  } catch (err) {
    console.error("Error in findMovies:", err);
    return [];
  }
};
