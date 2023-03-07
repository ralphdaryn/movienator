import React from "react";
import { useGlobalContext } from "./context";
import { FcFilmReel } from "react-icons/fc";
const SearchForm = () => {
  const { query, setQuery, error } = useGlobalContext();
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h1>
        Movie<span>Nator</span><FcFilmReel />
      </h1>
      <input
        type="text"
        className="form-input"
        placeholder="Search Movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
