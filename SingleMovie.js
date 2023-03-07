import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import { FaStar } from "react-icons/fa";
import comingSoon from "./comingSoon.jpg";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "False") {
      setError({ show: true, msg: data.Error });
      setLoading(false);
    } else {
      setMovie(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          Home
        </Link>
      </div>
    );
  }

  const {
    Title: title,
    Poster: poster,
    Plot: plot,
    Year: year,
    Genre: genre,
    Actors: actors,
    Director: director,
    Runtime: runtime,
    BoxOffice: boxoffice,
    imdbRating: score,
    Rated: rated,
    Type: type,
  } = movie;

  return (
    <section className="single-movie">
      <img
        src={poster === "N/A" ? comingSoon : poster}
        alt={title}
        style={{ objectFit: "fill" }}
      />
      <div
        className="single-movie-info"
        style={{ backgroundColor: "rgb(12, 13, 31,.8)", padding: "1rem" }}
      >
        <h2 style={{ color: "rgb(49, 136, 251)", fontSize: "3.25rem" }}>
          {title}
        </h2>
        <h3>{genre}</h3>
        <h3>{runtime}</h3>
        <h3>Rated: {rated}</h3>
        <h3 style={{ color: "yellow" }}>
          IMDb Rating: {score} <FaStar />
        </h3>
        <p style={{ textAlign: "justify" }}>
          {plot === "N/A" ? "No Description Found" : plot}
        </p>
        <h4>Actors: {actors}</h4>
        <h4>Directed by: {director}</h4>
        <h4>Box Office: {boxoffice}</h4>
        <h4>Type: {type}</h4>
        <h3 style={{ color: "rgb(36, 247, 253)" }}>Release Date: {year}</h3>
      </div>
      <div className="btn-container">
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
