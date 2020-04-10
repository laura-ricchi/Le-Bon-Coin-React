import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../assets/css/Publish.css";

// Publish : page de création d'annonces

const Publish = () => {
  const token = Cookies.get("userToken");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
              // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire => preventDefault()
              onSubmit={async (event) => {
                event.preventDefault();
                // pour la transmission des fichiers vers le serveur, nous devons utiliser d'un objet FormData
                const formData = new FormData();
                formData.append("title", title);
                formData.append("description", description);
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
                  alert(JSON.stringify(response.data));
                } catch (error) {
                  if (error.response.status === 500) {
                    console.error("An error occurred");
                  } else {
                    console.error(error.message);
                  }
                }
              }}
            >
              <p style={{ marginTop: "33px" }}>Titre de l'annonce *</p>
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
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
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
              <br></br>
              <input type="submit" value="Valider" />
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Publish;
