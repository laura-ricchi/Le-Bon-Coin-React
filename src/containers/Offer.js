import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../assets/css/Offer.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

const Offer = ({ onLogin }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  let id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-project-backend-leboncoin.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        console.log(response.data.offer);
        setData(response.data.offers);
        setIsLoading(false);
      } catch (e) {
        console.log("error");
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      {isLoading === true ? (
        <p>En cours de chargement ...</p>
      ) : (
        <div className="container-offer">
          <div className="container-picture-price">
            <img className="picture-offer" alt="offer" src={data.pictures} />

            <div className="container-info-offer">
              <div className="offer-title">{data.title}</div>
              <div className="offer-price">{data.price}€</div>
              <div className="offer-date">
                <Moment format="DD/MM/YYYY à HH:mm">{data.created}</Moment>
              </div>
            </div>
          </div>
          <div className="container-offer-description">
            <p className="descr">Description</p>
            <div className="offer-description">{data.description}</div>
          </div>

          <div className="offer-creator">
            <div className="infos-user">
              <div className="offer-username">
                {/* {data.creator.account} */}
              </div>
            </div>

            {/* <button onClick={() => {
              if (user === null) {
                <Redirect to="/log_in"/>
              } else {
                <Redirect to="/Payment"/>
                history.push("/Payment", 
                {title: data.title},
                {price : data.price}) */}

            <div className="buy-offer">
              <button className="button-buy-offer" onClick={() => {}}>
                <FontAwesomeIcon icon={faCartPlus} />
                <span>Acheter</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Offer;
