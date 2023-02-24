import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;
function getMovies(page, sort) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const topRatedApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const upComingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      const movieGenreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`
      );

      let [popularMovies, topRatedMovies, upComingMovies, movieGenre] =
        await Promise.all([
          popularMovieApi,
          topRatedApi,
          upComingApi,
          movieGenreApi,
        ]);

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upComingMovies: upComingMovies.data,
          movieGenre: movieGenre.data,
          //    sortMovie:sortMovie.data
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
      console.log(error);
    }
  };
}
function getDetail(movie_id, page) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      const movieDetailApi = api.get(
        `/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
      );
      const movieReviewApi = api.get(
        `/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US`
      );
      const movieRecommendApi = api.get(
        `/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=${
          page || 1
        }`
      );
      const movieGenreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const movieVideoApi = api.get(
        `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
      );

      let [movieDetail, movieReview, movieRecommend, movieGenre, movieVideo] =
        await Promise.all([
          movieDetailApi,
          movieReviewApi,
          movieRecommendApi,
          movieGenreApi,
          movieVideoApi,
        ]);
      dispatch({
        type: "GET_MOVIE_DETAIL_SUCCESS",
        payload: {
          movieDetail: movieDetail.data,
          movieReview: movieReview.data,
          movieRecommend: movieRecommend.data,
          movieGenre: movieGenre.data,
          movieVideo: movieVideo.data,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}

function getSearch(page, query) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      const searchMovieApi = await api.get(
        `/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}`
      );
      const searchMovie = await searchMovieApi;
      console.log(page, query);

      dispatch({
        type: "GET_SEARCH_SUCCESS",
        payload: {
          searchMovie: searchMovie.data,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}

export const movieAction = {
  getMovies,
  getDetail,
  getSearch,
};
