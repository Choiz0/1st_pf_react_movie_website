import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Paging from "./Paging";
import MovieCard from "./MovieCard";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const query = new URLSearchParams(location.search).get("query");
  const { total_results: count, results: items } = useSelector(
    (state) => state.movie.searchMovie
  );

  useEffect(() => {
    dispatch(movieAction.getSearch(page, query));
  }, [dispatch, page, query]);
  const handleSetPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <Container>
      <div>
        <div className="search_result">
          {items &&
            items.map((item) => (
              <div key={item.id}>
                <MovieCard item={item} />
              </div>
            ))}
          <Paging page={page} count={count} setPage={handleSetPage} />
        </div>
      </div>
    </Container>
  );
};

export default Search;
