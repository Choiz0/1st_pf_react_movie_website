import React, { useEffect, useState } from "react";
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import ClipLoader from "react-spinners/ClipLoader";
import MovieSlide from "../components/MovieSlide";
import { useLocation } from "react-router-dom";

const Home = () => {
  const dispacth = useDispatch();
  const location = useLocation();

  const { popularMovies, topRatedMovies, upComingMovies, loading } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispacth(movieAction.getMovies());
  }, [dispacth]);

  if (loading) {
    return <ClipLoader color="red" loading={loading} size={150} />;
  }

  return (
    <div>
      <Banner
        info={
          popularMovies && popularMovies.results && popularMovies.results[0]
        }
      />

      <div className="home_h1">
        <h1>Popular Movie</h1>
        <MovieSlide
          movies={
            popularMovies && popularMovies.results && popularMovies.results
          }
        />
        <h1>Top rated Movie</h1>
        <MovieSlide
          movies={
            topRatedMovies && topRatedMovies.results && topRatedMovies.results
          }
        />
        <h1>Upcoming Movie</h1>
        <MovieSlide
          movies={
            upComingMovies && upComingMovies.results && upComingMovies.results
          }
        />
      </div>
    </div>
  );
};

export default Home;
