import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { fetchMovies } from "./utils/api";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    setHasSearched(true);

    try {
      setLoading(true);
      setError("");

      const data = await fetchMovies(query);
      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("Train");
  }, []);

  return (
    <div className="app">
      <h1>🎬 Movie Search</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {hasSearched && !loading && !error && movies.length === 0 && (
        <p>No movies found.</p>
      )}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}