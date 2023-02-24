import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";
import Paging from "../components/Paging";
import { useCallback } from "react";
import { movieSearch } from "../redux/actions/movieSearch";


const Movies = () => {
  const dispatch = useDispatch();
  const [genreClicked, setGenreClicked] = useState(false);
  const [sortClicked, setSortClicked] = useState(true);

  const [genreName, setGenreName] = useState("");
  let loading = useSelector((state) => state.movie.loading);
  const { movieGenre } = useSelector((state) => state.movie);

  let {
    total_results: count,
    results:items,
    page,
  } = useSelector((state) => state.sort.sortMovie);
  const [value, setValue] = React.useState("popularity.desc");
  

  const [displayItems, setDisplayItems] = useState(items);

  const handleChange = (e) => {
    setValue(e);
    setGenreClicked(false);
    setSortClicked(true);
  };


  useEffect(() => {
    dispatch(movieAction.getMovies());
    dispatch(movieSearch.getSort(value, page));
  }, [dispatch, value]);

  useEffect(() => {
    if (sortClicked) {
      setDisplayItems(items);
    }
  }, [items, sortClicked]);

  useEffect(() => {
    if (genreClicked) {
      const genreId = movieGenre?.genres?.find(
        (genre) => genre.name === genreName
      )?.id;
      const genreArr = Object.keys(items)
        .map((id) => (items[id].genre_ids.includes(genreId) ? id : null))
        .filter((id) => id !== null);
      const genreItems = genreArr.map((id) => items[id]);
      setDisplayItems(genreItems);
    }
  }, [genreClicked, genreName, items, movieGenre]);

  const setPage = useCallback(
    (page, value) => {
      dispatch(movieSearch.getSort(page,value));
    },
    [dispatch]
  );

  const handleclickBtn = (value) => {
    setGenreName(value);
    setGenreClicked(true);
    setSortClicked(false);
  };


  let sortValueArr = [
    "popularity.asc",
    "popularity.desc",
    "release_date.asc",
    "release_date.desc",
    "revenue.asc, revenue.desc",
    "primary_release_date.asc",
    "primary_release_date.desc",
    "original_title.asc",
    " original_title.desc",
  ];

  
  return (
    <div>
    <div className="sortName"><h5>{value.toUpperCase()} {genreName ? "& " + genreName :""}</h5></div>
    <div className="contain">
      
      <div className="sort_box">
     
        <Dropdown>
          <DropdownButton
            variant="success"
            onSelect={handleChange}
            title="Sort"
            style={{ width: "100%" }}
          >
            {sortValueArr &&
              sortValueArr.map((value,idx) => (
                <Dropdown.Item key={idx} eventKey={value}>{value}</Dropdown.Item>
              ))}
          </DropdownButton>
        </Dropdown>

        <div className="multi-button">
          {movieGenre &&
            movieGenre.genres &&
            movieGenre.genres.map((v,idx) => (
              <button key={idx}
                style={{
                  backgroundColor:
                    genreClicked && genreName === v.name ? "yellow" : "",
                }}
                onClick={() => handleclickBtn(v.name)}
              >
                {v.name}
              </button>
            ))}
        </div>
      </div>
      <div className="movies_list">
    
        {loading ? (
          <ClipLoader color="red" loading={loading} size={150} />
        ) : (
          displayItems &&
          displayItems.map((item) => (
            <div key={item.id}>
              <MovieCard  key={item.id} item={item} />
            </div>
          ))
        )}
      </div>

      
    </div>
    <div><Paging page={page} count={count} setPage={setPage} /></div>
    </div>
  );
};

export default Movies;
