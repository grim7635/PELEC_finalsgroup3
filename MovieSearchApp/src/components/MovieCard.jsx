export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
      />

      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <p className="type">{movie.Type}</p>
    </div>
  );
}