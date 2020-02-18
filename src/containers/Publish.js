import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "../assets/css/Publish.css";

// Publish : page de création d'annonces

const token = Cookies.get("userToken");

const Publish = ({ setUser }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState({});

  if (token) {
    return (
      <div className="offer-publish">
        <h3>Déposer une annonce</h3>

        <form
          onSubmit={async event => {
            event.preventDefault();

            const formData = new FormData();
            formData.append("title", title);
            formData.append("text", text);
            formData.append("price", price);
            formData.append("picture", file);

            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/api/offer/publish",
                formData,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                  }
                }
              );

              console.log(response.data);

              if (response.data.token) {
                Cookies.set("userToken", token, { expires: 100 });
                setUser({
                  token: token
                });
              } else {
                console.log("erreur");
              }
              // modal;
            } catch (error) {
              console.log("error.message = ", error);
            }
          }}
        >
          <p>Titre de l'annonce *</p>
          <input
            type="text"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />

          <p>Texte de l'annonce *</p>
          <input
            type="text"
            value={text}
            onChange={event => {
              setText(event.target.value);
            }}
          />

          <p>Prix *</p>
          <input
            type="number"
            value={price}
            onChange={event => {
              setPrice(event.target.value);
            }}
          />
          <p>Photo *</p>
          <input
            placeholder="Choose file"
            type="file"
            onChange={event => {
              setFile(event.target.files[0]);
            }}
          />
          <input type="submit" value="Publier" />
        </form>
      </div>
    );
  } else {
    return <Redirect to="/log_in" />;
  }
};
export default Publish;
