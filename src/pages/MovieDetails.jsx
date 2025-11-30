import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=2ae58ef4&i=${id}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    }
    getMovie();
  }, [id]);

  if (!movie) return <p className="loading">Loading...</p>;

  return (
    <div className="movie-detail">
      <Link to="/" style={{ color: "#ff6b6b", fontWeight: "bold" }}>
        &larr; Back
      </Link>
      <h2>{movie.Title}</h2>
      <img
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
      />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
}

export default MovieDetails;
