import {combineReducers} from "redux"
import movieReducer from "./movieReducer"
import sortReducer from "./sortReducer"

export default combineReducers({
    movie: movieReducer,
    sort :sortReducer,
})