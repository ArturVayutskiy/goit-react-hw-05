import { ErrorMessage } from "formik";
import MovieList from "../../components/MovieList/MovieList";
import { Oval } from "react-loader-spinner";
import { getTrendingMovies } from "../../api/unsplash-api";
import { useEffect, useState } from "react";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Oval />}
      {error && <ErrorMessage />}
      {!error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
