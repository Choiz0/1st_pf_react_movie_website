import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";
import { Container, Row, Col, Badge, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStar,
  faHeart,
  faClock,
  faDollarSign,
  faFilm,
  faLanguage,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";

import ClipLoader from "react-spinners/ClipLoader";
import Review from "../components/Review";
import RelatedMovies from "../components/RelatedMovies";

const MovieDetail = () => {
  let { id } = useParams();
  let movie_id = id;
  const dispatch = useDispatch();

  const {
    movieDetail,
    loading,
    movieReview,
    movieRecommend,
    movieGenre,
    movieVideo,
  } = useSelector((state) => state.movie);

  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    dispatch(movieAction.getDetail(movie_id));
  }, [dispatch, movie_id]);

  const [reviewClicked, setReviewClicked] = useState(true);
  const [relatedClicked, setRelatedClicked] = useState(false);
  const [page, setPage] = useState(1);

  const handleReviewClick = () => {
    setReviewClicked(true);
    setRelatedClicked(false);
  };

  const handleRelatedClick = () => {
    setReviewClicked(false);
    setRelatedClicked(true);
  };

  const opts = {
    height: "400",
    width: "600",
    playerVars: {
      autoplay: 0,
    },
  };

  if (loading) {
    return <ClipLoader color="red" loading={loading} size={150} />;
  }

  return (
    <Container className="detailbox">
      <Row>
        <Col>
          <img
            className="detail_img"
            src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
        </Col>
        <Col>
          <div className="detail_genres">
            {movieDetail.genres.map((genre) => (
              <div className="detail_badge" pill="true" bg="danger" key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          <h1 className="title">{movieDetail.title}</h1>
          <h3>{movieDetail.tagline}</h3>
          <div className="detail_score">
            <h4>
              {" "}
              <FontAwesomeIcon icon={faStar} />{" "}
              {movieDetail.vote_average.toFixed(1)}
            </h4>

            <h4>
              <FontAwesomeIcon icon={faHeart} />{" "}
              {movieDetail.popularity.toFixed()}
            </h4>

            <h4>
              <FontAwesomeIcon icon={faClock} /> {movieDetail.runtime}Min{" "}
            </h4>
          </div>

          <div className="detail_overview">
            <p>{movieDetail.overview}</p>
          </div>
          <div className="detail_extra">
            <h4>
              {" "}
              <Badge bg="secondary">
                <FontAwesomeIcon icon={faDollarSign} /> Budget
              </Badge>
              {"  "}${new Intl.NumberFormat().format(movieDetail.budget)}
            </h4>
            <h4>
              {" "}
              <Badge bg="secondary">
                {" "}
                <FontAwesomeIcon icon={faDollarSign} /> Revenue
              </Badge>
              {"  "}${new Intl.NumberFormat().format(movieDetail.revenue)}
            </h4>
            <h4>
              {" "}
              <Badge bg="secondary">
                {" "}
                <FontAwesomeIcon icon={faFilm} /> Staus
              </Badge>
              {"  "}
              {movieDetail.status}
            </h4>
            <h4>
              {" "}
              <Badge bg="secondary">
                {" "}
                <FontAwesomeIcon icon={faLanguage} /> Language
              </Badge>
              {"  "}
              {movieDetail.original_language}
            </h4>
            <h4>
              {" "}
              <Badge bg="secondary">
                {" "}
                <FontAwesomeIcon icon={faCalendarAlt} /> Release-Date
              </Badge>
              {"  "}
              {movieDetail.release_date}
            </h4>
            <h4>
              {" "}
              <Button
                size="sm"
                variant="danger"
                onClick={() => setLgShow(true)}
              >
                <span>
                  <h5>
                    Preview <FontAwesomeIcon icon={faPlayCircle} />
                  </h5>
                </span>{" "}
              </Button>
            </h4>
            <div className="modal">
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Large Modal
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="youtube">
                  <YouTube videoId={movieVideo.results[0].key} opts={opts} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="review_box">
        <Col>
          <Button onClick={handleReviewClick} href="#">
            Review{" "}
            <span className="btnNumber">{movieReview.total_results} </span>
          </Button>{" "}
          <Button onClick={handleRelatedClick} href="#">
            Related Movies{" "}
            <span className="btnNumber"> {movieRecommend.total_results}</span>
          </Button>
          {reviewClicked && <Review review={movieReview} />}
          {relatedClicked && (
            <RelatedMovies movie_id={movie_id} movieGenre={movieGenre} />
          )}
        </Col>
      </Row>
      <div></div>
    </Container>
  );
};

export default MovieDetail;
