import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Search.css";

const Search = ({ setData }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://leboncoin-api-final.herokuapp.com/offer/with-count?title=${searchInput}`
    );
    setData(response.data);
  };

  return (
    <div className="container">
      <div className="ellipsis-container">
        <div>
          <div className="container-form">
            <div className="search-form">
              <form onSubmit={handleSubmit}>
                <input
                  className="search-input"
                  placeholder="Que recherchez-vous ?"
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
    </div>
  );
};

export default Search;
