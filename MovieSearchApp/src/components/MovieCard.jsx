export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img
          src={movie.Poster}
          alt={movie.Title}
          onError={(e) => {
            e.target.src = "https://imgs.search.brave.com/_P-lWzE9st9gz1OY75ww4PgXSLJXPB30AKvi3VAOEzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDQu/ZGVwb3NpdHBob3Rv/cy5jb20vMTQ5NTM4/NTIvMjI3NzIvdi80/NTAvZGVwb3NpdHBo/b3Rvc18yMjc3MjQ5/OTItc3RvY2staWxs/dXN0cmF0aW9uLWlt/YWdlLWF2YWlsYWJs/ZS1pY29uLWZsYXQt/dmVjdG9yLmpwZw";
          }}
        />

        <div className="overlay">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <span className="type">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
}