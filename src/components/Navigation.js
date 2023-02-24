import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Form,
  Button,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Navigation = () => {
  const dispacth = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchMovie = (event) => {
    setQuery(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    navigate(`/search?query=${query}`);
    event.target.reset();
  }
  function handleClick() {
    navigate("/");
  }

  return (
    <Navbar expand="lg" style={{ backgroundColor: "black" }} variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            width={150}
            src="https://camo.githubusercontent.com/5a1dc958469de1d7648247524aad4d3ee2cdfb6e2b5da75ba0bbc499973c4118/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f54683357616c6c2f6173736574732d63646e2f46616b65666c69782f46616b65666c69785f726561646d652e706e67"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <a href="/" color="black" className="navlink">
              Home
            </a>
            <Link to="/movies" className="navlink">
              Movies
            </Link>
          </Nav>

          <form onSubmit={handleSubmit} className="searchbox">
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={searchMovie}
            />
            <button type="submit">
              {" "}
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
