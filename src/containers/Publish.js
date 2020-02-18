import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "../assets/css/Publish.css";

// Publish : page de création d'annonces

const Publish = ({ setUser }) => {
  const token = Cookies.get("userToken");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState({});
  console.log(token);
  if (token) {
    return (
      <div className="offer-publish">
        <h3>Déposer une annonce</h3>
        <hr></hr>

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
                "http://localhost:3001/upload",
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
            } catch (error) {
              console.log("error.message = ", error);
            }
          }}
        >
          <p style={{ marginTop: "33px" }}>Titre de l'annonce *</p>
          <input
            className="title-offer"
            type="text"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />

          <p style={{ marginTop: "19px" }}>Texte de l'annonce *</p>
          <input
            className="text-offer"
            type="text"
            value={text}
            onChange={event => {
              setText(event.target.value);
            }}
          />

          <p style={{ marginTop: "23px" }}>Prix *</p>
          <input
            className="price-offer"
            type="number"
            value={price}
            onChange={event => {
              setPrice(event.target.value);
            }}
          />
          <p style={{ marginTop: "30px" }}>Photo *</p>
          <input
            className="photo-offer"
            placeholder="Choose file"
            type="file"
            onChange={event => {
              setFile(event.target.files[0]);
            }}
          />

          <input
            className="button-publish"
            style={{ marginTop: "28px" }}
            type="submit"
            value="Valider"
          />
        </form>
      </div>
    );
  } else {
    return <Redirect to="/log_in" />;
  }
};

export default Publish;
