import api from "../api"

const API_KEY = process.env.REACT_APP_API_KEY


function getSearch(page,query) {
    return async (dispatch) => {
      try {
     
        const searchMovieApi =await api.get(`/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}`);
        const searchMovie = searchMovieApi;
       
  
        dispatch({
          type: "GET_SEARCH_SUCCESS",
          payload: {
            searchMovie: searchMovie.data,
          },
        });
      } catch (error) {
        dispatch({type:"GET_MOVIES_FAILURE"})
      }
    };
  }


  function getSort(sort,page) {
    return async (dispatch) => {
      try {
     
        const sortMovieApi = await api.get(`/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page? page: 1}`)
        const sortMovie = await sortMovieApi;
      
  
        dispatch({
          type: "GET_SORTMOVIE_SUCCESS",
          payload: {
            sortMovie: sortMovie.data,
         
          },
        });
      } catch (error) {
        dispatch({type:"GET_MOVIES_FAILURE"})
      }
    };
  }









export const movieSearch = {
    getSort,
 
};