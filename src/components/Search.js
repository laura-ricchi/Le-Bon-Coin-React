import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Search.css";

const Search = ({ setData }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://my-project-backend-leboncoin.herokuapp.com/offers/with-count?title=${searchInput}`
    );
    setData(response.data);
  };

  return (
    <div className="ellipsis-container">
      <div>
        <div className="container-form">
          <div className="search-form">
            <form onSubmit={handleSubmit}>
              <input
                className="search-input"
                type="text"
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <input
                className="button-search"
                type="submit"
                value="Rechercher"
                name="search"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
