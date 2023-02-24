let initialState ={
  popularMovies:{},
  topRatedMovies:{},
  upComingMovies:{},
  movieGenre:{},
  movieDetail:{},
  movieReview:{},
  movieRecommend:{},
  movieVideo:{},
  searchMovie:{},
  loading:true,
  loaded: false,
}
function movieReducer(state=initialState,action){
  let{type,payload} = action
  switch(type){
      case "GET_MOVIES_REQUEST":
          return{...state,loading:true}
      case "GET_MOVIES_SUCCESS":
          return{...state,
            loading:false,

              popularMovies: payload.popularMovies,
              topRatedMovies: payload.topRatedMovies
              ,upComingMovies: payload.upComingMovies,
              movieGenre:payload.movieGenre,
              sortMovie:payload.movieSort,
             loaded:true,
            
          }
      case "GET_MOVIES_FAILURE":
          return{...state,loading:false}
         
      case "GET_MOVIE_DETAIL_SUCCESS":
          return{...state,movieDetail:payload.movieDetail,
              movieReview:payload.movieReview,
              movieRecommend:payload.movieRecommend,
              movieGenre:payload.movieGenre,
              movieVideo:payload.movieVideo,
              loading:false,
              loaded:true,
          }
    
      case "GET_SEARCH_SUCCESS":
      return{
        ...state, searchMovie:payload.searchMovie,
        loading:false,
        loaded:true,
      }
          default:
              return{...state}
  }
}

export default movieReducer  