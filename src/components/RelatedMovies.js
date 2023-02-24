import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import Paging from "./Paging";
import { movieAction } from "../redux/actions/movieAction";

const RelatedMovies = ({ movie_id }) => {
  const dispatch = useDispatch();

  const {
    total_results: count,
    page,
    results: items,
  } = useSelector((state) => state.movie.movieRecommend);

  const setPage = useCallback(
    (page) => {
      dispatch(movieAction.getDetail(movie_id, page));
    },
    [dispatch, movie_id]
  );
  return (
    <div className="recommend_card">
      {items &&
        items.map((movie) => (
          <div key={movie.id}>
            <MovieCard item={movie} />
          </div>
        ))}
      <div>
        <Paging page={page} count={count} setPage={setPage} />
      </div>
    </div>
  );
};

export default RelatedMovies;
