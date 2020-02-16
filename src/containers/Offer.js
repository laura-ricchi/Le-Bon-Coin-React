import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leboncoin-api.herokuapp.com/api/offer/" + id
        );
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
      {isLoading === true ? (
        <p>En cours de chargement ...</p>
      ) : (
        <>
          <div className="offer">
            <img alt="pictures" src={data.pictures[0]} />
            <div className="offer-title">{data.title}</div>
            <div className="offer-price">{data.price}€</div>
            <div className="offer-date">
              <Moment format="DD/MM/YYYY à HH:mm">{data.created}</Moment>
            </div>
          </div>
          <div className="offer-description">
            <p>Description</p>
            <div className="offer-description">{data.description}</div>
          </div>

          <div className="offer-creator">
            <div className="offer-username">
              {data.creator.account.username}
            </div>

            <button>
              <div className="icon-offer">
                <FontAwesomeIcon icon={faCartPlus} />
                <span>Acheter</span>
              </div>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Offer;
