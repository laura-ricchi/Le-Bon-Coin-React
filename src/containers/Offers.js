import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/Offers.css";
import Search from "../components/Search";
import { Helmet } from "react-helmet";
const moment = require("moment");
require("moment/locale/fr");

//offers = page d'accueil

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leboncoin-api.herokuapp.com/api/offer/with-count"
        );
        setData(response.data.offers);
        console.log(response.data);

        setIsLoading(false);
      } catch (e) {
        console.log("error");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Toutes les annonces</title>
      </Helmet>
      <Search setData={setData} />
      {isLoading === true ? (
        <p>En cours de chargement...</p>
      ) : (
        <div className="all-offers">
          {data.map((element, index) => {
            if (element.pictures.length === 0) {
              return null;
            }
            return (
              <div className="container-offers">
                <Link to={"/offer/" + element._id} key={index}>
                  <div className="container-picture-offers">
                    <img
                      alt="pictures"
                      src={element.pictures[0]}
                      className="pictures-offers"
                    />
                  </div>
                </Link>

                <div className="container-description-offers">
                  <div className="offer-title">{element.title}</div>
                  <div className="offer-price">{element.price} €</div>
                  <div className="offer-date">
                    {moment(element.created).format("L")} à{" "}
                    {moment(element.created).format("hh:mm")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Offers;
