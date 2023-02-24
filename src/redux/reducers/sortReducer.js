let initialState ={
    searchMovie:{},
    sortMovie:{},
    loading:true,
    
  }
  function sortReducer(state=initialState,action){
    let{type,payload} = action
 

    switch(type){
        case "GET_MOVIES_REQUEST":
            return{...state,loading:true}

        case "GET_SORTMOVIE_SUCCESS":
            return{...state,
              loading:false,
              sortMovie:payload.sortMovie,
              
            }
          
        case "GET_SEARCH_SUCCESS":
        return{
          ...state, searchMovie:payload.searchMovie,
          loading:false,
        
        }
            default:
                return{...state}
    }

    
  }
  export default sortReducer  