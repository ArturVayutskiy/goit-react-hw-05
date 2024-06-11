import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { defaultImg, getMovieDetail } from "../../api/unsplash-api";
import { Oval } from "react-loader-spinner";
import { ErrorMessage } from "formik";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMovieDetail(movieId);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [movieId]);

  const { original_title, poster_path, overview, genres, release_date } =
    movie || {};

  console.log(location.state);

  return (
    <div>
      <div className={css.container}>
        {isLoading && <Oval />}
        {error && <ErrorMessage />}
        <Link to={backLinkRef.current} className={css.backBtn}>
          ←Back
        </Link>
        <h1 className={css.title}>{original_title}</h1>

        {movie && (
          <div className={css.overview}>
            <img
              className={css.poster}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : defaultImg
              }
              alt={original_title}
            />
            {genres && (
              <>
                <div className={css.wrapper}>
                  <p className={css.country}>
                    <span className={css.span}>Release date: </span>
                    {release_date}
                  </p>
                  <h className={css.overview}>
                    <span className={css.span}>About:</span> {overview}
                  </h>
                  <h3 className={css.genres_title}>Genres:</h3>
                </div>
                <ul className={css.genres_list}>
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <ul className={css.links}>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<Oval />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
