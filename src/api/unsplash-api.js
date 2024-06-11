import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDFmODJkZTcxZTQ0MTQ0Y2RjYTZjZjZlMWFjNDY4NyIsInN1YiI6IjY2NjQ0ZWEwNDBlMzlhNDg5ZDIyMzBhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s_C-0lD3Jzd4vuuboAHlUVv7cISd1z3cfodkiWWB4P0",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get("trending/movie/week", options);
  return response.data;
}

export async function getSearchMovie(query) {
  const response = await axios.get(`search/movie?query=${query}`, options);
  return response.data;
}

export async function getMovieDetail(movieId) {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data;
}

export const defaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png";
