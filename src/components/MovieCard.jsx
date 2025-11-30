import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const poster = movie.Poster && movie.Poster !== "N/A" 
    ? movie.Poster 
    : "/no-image.png";  // fallback to placeholder

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <Link to={`/movie/${movie.imdbID}`}>
        Details
      </Link>
    </div>
  );
}

export default MovieCard;
