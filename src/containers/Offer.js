import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../App.css";
import "../assets/css/Offer.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

const Offer = ({ onLogin }) => {
  const history = useHistory();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-project-backend-leboncoin.herokuapp.com/offer/${id}`
        );
        console.log("response data", response.data);
        setData(response.data);
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
        <div className="container">
          <div className="offer-container">
            <div className="container-description-offer">
              <div className="container-info-offer">
                <img
                  alt="offer"
                  className="picture-offer"
                  src={data.files.url}
                />
                <div className="detail-offer">
                  <div className="title-offer">{data.title}</div>
                  <div className="price-offer">{data.price}€</div>
                  <div className="created-offer">
                    <Moment format="DD/MM/YYYY à HH:mm">{data.created}</Moment>
                  </div>
                </div>
              </div>
            </div>
            <div className="tobuy-offer">
              <div className="info-buyer">
                <p>{data.creator.account.username}</p>
                <p>x annonces en ligne</p>
              </div>
              <div className="button-buy-offer">
                <button
                  className="button-tobuy"
                  onClick={() => {
                    history.push("/payment", {
                      productId: data._id,
                      files: data.files.url,
                      title: data.title,
                      price: data.price,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                  <span>Acheter</span>
                </button>
              </div>
            </div>
          </div>
          <div className="description-offer">
            <p>Description</p>
            <p>{data.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Offer;
