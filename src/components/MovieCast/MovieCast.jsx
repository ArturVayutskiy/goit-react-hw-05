import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { getMovieCredits } from "../../api/unsplash-api";
import { defaultImg } from "../../api/unsplash-api";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const backLinkRef = useRef();

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <>
      <h2 className={css.title}>Movie Cast</h2>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!error && cast.length > 0 ? (
        <ul className={css.list} ref={backLinkRef}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.listItem}>
              <img
                className={css.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : defaultImg
                }
                alt={name}
                width="250"
              />
              <p className={css.text}>{name}</p>
              {character && <p>{character}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.textMessage}>
          Information about this movie has not been found!
        </p>
      )}
    </>
  );
}
