import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div>
      {isLoading === true ? (
        <p>En cours de chargement ...</p>
      ) : (
        <div>
          <span>{data.title}</span>
          <span>{data.description}</span>
          <span>{data.price}</span>
          <img alt="pictures" src={data.pictures[0]} />
        </div>
      )}
    </div>
  );
};

export default Offer;
