import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../assets/css/Publish.css";

// Publish : page de création d'annonces

const Publish = () => {
  // 1 Etat pour chaque champ du formulaire
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState({});
  const history = useHistory();

  // enregistrer le token de l'utilisateur
  const token = Cookies.get("token");
  console.log(token);

  // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire => preventDefault()
  const formOnSubmit = async (event) => {
    event.preventDefault();
    // pour la transmission des fichiers vers le serveur, nous devons utiliser d'un objet de type FormData
    const formData = new FormData();
    // ajout de paramètres
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("files", files);

    try {
      // réponse du serveur
      const response = await axios.post(
        "https://my-project-backend-leboncoin.herokuapp.com/offer/publish",
        formData,
        {
          // en tête de la requête
          headers: {
            Authorization: "Bearer" + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.offer);
      // Aller sur la page d'accueil
      // Changement de page
      history.push("/");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return token ? (
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
          <form onSubmit={formOnSubmit}>
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
            <textarea
              rows="20"
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
                setFiles(event.target.files[0]);
              }}
            />
            <br></br>
            <input type="submit" value="Valider" />
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
