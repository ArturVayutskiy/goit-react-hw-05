import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { getMovieReviews } from "../../api/unsplash-api";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./MovieReviews.module.css";
import { Oval } from "react-loader-spinner";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const backLinkRef = useRef();

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Movie Reviews</h2>
      {isLoading && <Oval />}
      {error && <ErrorMessage />}
      {reviews.length > 0 ? (
        <ul className={css.list} ref={backLinkRef}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={css.author}>{author}</p>
              <p className={css.comment}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.textMessage}>
          Reviews about this movie has not been found!
        </p>
      )}
    </div>
  );
}
