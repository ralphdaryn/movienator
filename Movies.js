import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import comingSoon from "./comingSoon.jpg";

const Movies = () => {
  const { movies, isLoading } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="movies">
      {movies.map((movie) => {
        const { imdbID: id, Poster: poster, Year: year, Title: title } = movie;
        return (
          <Link to={`/movies/${id}`} key={id} className="movie">
            <article>
              <img
                src={poster === "N/A" ? comingSoon : poster}
                style={{ objectFit: "fill" }}
                alt={title}
              />
              <div className="movie-info">
                <h4 className="title">{title}</h4>
                <p>{year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Movies;
