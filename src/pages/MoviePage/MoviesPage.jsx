import { useEffect, useState } from "react";
import { getSearchMovie } from "../../api/unsplash-api";
import MovieList from "../../components/MovieList/MovieList";
import { Oval } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ErrorMessage } from "formik";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovies = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!searchMovies) return;

    async function getData() {
      try {
        setMovies([]);
        setIsLoading(true);
        setError(false);
        const data = await getSearchMovie(searchMovies);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [searchMovies]);

  const handleSearch = (newQuery) => {
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Oval />}
      {error && <ErrorMessage />}
      {!error && movies.length > 0 && <MovieList movies={movies} />}
      {!error && !isLoading && searchMovies && movies.length === 0 && (
        <p>The film has not been found!</p>
      )}
    </div>
  );
};

export default MoviesPage;
