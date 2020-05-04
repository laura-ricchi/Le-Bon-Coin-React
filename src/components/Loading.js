import React from "react";
import Loader from "react-loader-spinner";
import "../assets/css/Loading.css";

const Loading = () => {
  return (
    <div className="container-loader">
      <Loader type="Circles" color="#f56b2a" height={100} width={100} />
    </div>
  );
};
export default Loading;
