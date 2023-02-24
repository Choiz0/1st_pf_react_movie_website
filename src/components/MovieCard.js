import React, { useEffect, useState, useDispatch } from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { movieAction } from "../redux/actions/movieAction";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const address = location.pathname;
  const count = item.total_results;
  const items = item.results;

  const { movieGenre, loading } = useSelector((state) => state.movie);
  const handleSetPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleClick = () => {
    navigate(`/MovieDetail/${item.id}`);
    window.location.reload();
  };

  return (
    <div>
      {address !== "/movies" ? (
        <div
          onClick={handleClick}
          className="slidecard"
          style={{
            backgroundImage: `url(${
              item.poster_path == null
                ? "https://www.pngall.com/wp-content/uploads/13/Movie-Hollywood-PNG-File.png"
                : `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}`
            })`,
            backgroundSize: "355px 200px",
          }}
        >
          <div className="overlay">
            <div className="card-info">
              <h5>{item.title}</h5>
              <div className="genrebox">
                {item.genre_ids.map((id) => {
                  const genre =
                    movieGenre &&
                    movieGenre.genres &&
                    movieGenre.genres.find((v) => v.id === id);

                  return (
                    <Badge bg="primary" key={id} className="badge">
                      {genre ? genre.name : "Unknown"}
                    </Badge>
                  );
                })}
              </div>
              <p>
                {" "}
                <FontAwesomeIcon icon={faStar} /> {item.vote_average.toFixed(1)}
              </p>
              <p>
                {item.adults ? (
                  <img src="https://cdn-icons-png.flaticon.com/512/83/83580.png" />
                ) : (
                  <span className="m">M</span>
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="movie_card" onClick={handleClick}>
          <div className="info_section">
            <div className="movie_header">
              <img
                className="locandina"
                src={
                  item.poster_path == null
                    ? "https://www.pngall.com/wp-content/uploads/13/Movie-Hollywood-PNG-File.png"
                    : `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`
                }
              />{" "}
              <div>
                <h2>{item.title}</h2>
                <h4>{item.release_date}</h4>
              </div>
              <div className="genre">
                <p className="minutes"> ⭐{item.vote_average}</p>

                <p className="type">
                  {item.genre_ids.map((id, idx) => {
                    const genre =
                      movieGenre &&
                      movieGenre.genres &&
                      movieGenre.genres.find((v) => v.id === id);

                    return (
                      <React.Fragment key={idx}>
                        {genre ? genre.name : ""}
                        {"  "}
                      </React.Fragment>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="movie_desc">
              <p className="text">{item.overview.slice(1, 100)}</p>
            </div>
          </div>
          <div
            className="blur_back"
            style={{
              backgroundImage: `url(${
                item.poster_path == null
                  ? "https://www.pngall.com/wp-content/uploads/13/Movie-Hollywood-PNG-File.png"
                  : `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}`
              })`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};
export default MovieCard;
