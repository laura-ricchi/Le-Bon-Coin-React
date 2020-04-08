import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../assets/css/Publish.css";

// Publish : page de création d'annonces

const Publish = ({ setUser }) => {
  const token = Cookies.get("userToken");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState({});

  if (token) {
    return (
      <div className="offer-publish-container">
        <Helmet>
          <title>Déposer une annonce</title>
        </Helmet>
        <div className="offer-publish">
          <div className="title-publish">
            <h2>Déposer une annonce</h2>
          </div>
          <hr></hr>
          <div className="form-publish-offer">
            <form
              onSubmit={async (event) => {
                event.preventDefault();

                const formData = new FormData();
                formData.append("title", title);
                formData.append("text", text);
                formData.append("price", price);
                formData.append("picture", file);

                try {
                  const response = await axios.post(
                    "https://my-project-backend-leboncoin.herokuapp.com/offer/publish",
                    formData,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  if (response.data.token) {
                    Cookies.set("userToken", token, { expires: 100 });
                    setUser({
                      token: token,
                    });
                  } else {
                    console.log("erreur");
                  }
                } catch (error) {
                  console.log("error.message = ", error);
                }
              }}
            >
              <p>Titre de l'annonce *</p>
              <input
                className="input-title-publish"
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <p>Texte de l'annonce *</p>
              <input
                className="input-text-publish"
                type="text"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
              <p>Prix *</p>
              <input
                className="input-price-publish"
                type="number"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              €<p>Photo *</p>
              <input
                className="photo-publish"
                placeholder="Choose file"
                type="file"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              />
              <input className="button-publish" type="submit" value="Valider" />
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/log_in" />;
  }
};

export default Publish;
