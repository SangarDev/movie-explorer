import { useState, useEffect, useRef } from "react";
import MovieList from "../components/MovieList";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const popularKeywords = [
    "Batman", "Spiderman", "Inception", "Avengers", "Matrix",
    "Harry Potter", "Lord of the Rings", "Star Wars", "Thor", "Iron Man"
  ];

  // Fetch movies from multiple pages (up to 50 results)
  const fetchMovies = async (query) => {
    setLoading(true);
    let allMovies = [];
    try {
      for (let page = 1; page <= 5; page++) {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=2ae58ef4&s=${query}&page=${page}`
        );
        const data = await res.json();
        if (data.Search) {
          allMovies = [...allMovies, ...data.Search];
        } else {
          break; // No more results
        }
      }
      setMovies(allMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
    setLoading(false);
  };

  // Random movie load on page load
  useEffect(() => {
    const randomKeyword =
      popularKeywords[Math.floor(Math.random() * popularKeywords.length)];
    fetchMovies(randomKeyword);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (query) fetchMovies(query);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        <input
          ref={inputRef}
          className="searchInput"
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <div className="loading">
          {/* Simple skeleton cards */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "180px",
                height: "270px",
                backgroundColor: "#2a2a2a",
                margin: "0.75rem",
                borderRadius: "8px",
                display: "inline-block",
              }}
            ></div>
          ))}
          <p>Loading movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <p className="empty">No Movies Found.</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}

export default Home;
