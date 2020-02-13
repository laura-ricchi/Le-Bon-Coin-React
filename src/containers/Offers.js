import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//offers = page d'accueil

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

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
      {isLoading === true ? (
        <p>En cours de chargement...</p>
      ) : (
        <div>
          <ul>
            {data.map((element, index) => {
              console.log(element);
              return (
                <Link to={"/offer/" + element._id} key={index}>
                  <li key={element._id}>
                    <span>{element.title}</span>
                    <span>{element.description}</span>
                    <span>{element.price}</span>
                    <img alt="pictures" src={element.pictures[0]} />
                    <img alt="pictures" src={element.pictures[1]} />
                    <img alt="pictures" src={element.pictures[2]} />
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
export default Offers;
