const API_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query, page = 1) => {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const res = await fetch(
    `${API_URL}?apikey=${API_KEY}&s=${query}&page=${page}`
  );

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};