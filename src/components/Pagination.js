import React from "react";

const Pagination = ({ setSkip, skip, count }) => {
  // création d'une fonction pour afficher 3 articles sur la page précédente
  const clickOffersPrevious = () => {
    setSkip(skip - 3);
  };
  // création d'une fonction pour afficher 3 articles sur la page suivante
  const clickOffersNext = () => {
    setSkip(skip + 3);
  };

  return (
    <div className="pagination-offers">
      {/* si la pagination est différente de 0 alors afficher la page précédente */}
      {skip !== 0 && (
        <button onClick={clickOffersPrevious}>
          <p>Page précédente</p>
        </button>
      )}
      {/* si la pagination est égale à 3 alors afficher la page suivante */}
      {skip + 3 < count && (
        <button onClick={clickOffersNext}>
          <p>Page suivante</p>
        </button>
      )}
    </div>
  );
};

export default Pagination;
