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
  const [selectedMovie, setSelectedMovie] = useState(null);
  const closeModal = () => setSelectedMovie(null);

  const handleSelectMovie = async (movie) => {
    try {
      setLoading(true);

      const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
      );

      const data = await res.json();

      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      setSelectedMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

      {movies.length > 0 && (
        <MovieList
          movies={movies}
          onSelectMovie={handleSelectMovie}
        />
      )}

      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>

            <div className="modal-layout">
              {/* left: poster */}
              <div className="modal-poster">
                <img
                  src={selectedMovie.Poster}
                  alt={selectedMovie.Title}
                />
              </div>

              {/* right: info */}
              <div className="modal-info">
                <h2 className="title">{selectedMovie.Title}</h2>

                <div className="meta">
                  <span>{selectedMovie.Year}</span>
                  <span className="dot">•</span>
                  <span className="type">
                    {selectedMovie.Type.toUpperCase()}
                  </span>
                </div>

                <p className="description">
                  {selectedMovie.Plot}
                </p>

                <div className="badges">
                  <span className="badge primary">HD</span>
                  <span className="badge">IMDb</span>
                  <span className="badge subtle">
                    {selectedMovie.imdbID}
                  </span>
                </div>

                {/* optional action */}
                <button className="watch-btn">
                  ▶ Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}