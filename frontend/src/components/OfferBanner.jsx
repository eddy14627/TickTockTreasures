import React from "react";

const OfferComponent = () => {
  const offers = [
    {
      image:
        "https://pplx-res.cloudinary.com/image/upload/v1744134302/user_uploads/SCZmseuinNbHStR/11.jpg",
      title: "PLEIN SPORTS",
      description: "Get discount on all latest & trending watches.",
      discount: "30% OFF",
    },
    {
      image:
        "https://pplx-res.cloudinary.com/image/upload/v1744134347/user_uploads/jAItwSpIwmClYNl/1.jpg",
      title: "TIMEX",
      description: "Get discount on all latest & trending watches.",
      discount: "50% OFF",
    },
    {
      image:
        "https://pplx-res.cloudinary.com/image/upload/v1744134347/user_uploads/VeFKcxfBLntobhq/3.jpg",
      title: "GUESS",
      description: "Get discount on all latest & trending watches.",
      discount: "30% OFF",
    },
    {
      image:
        "https://pplx-res.cloudinary.com/image/upload/v1744134347/user_uploads/pWJdVcAzsXxpSQI/2.jpg",
      title: "DANIEL WELLINGTON",
      description: "Get discount on all latest & trending watches.",
      discount: "40% OFF",
    },
  ];

  return (
    <div className="offer-container">
      {offers.map((offer, index) => (
        <div key={index} className="offer-card">
          <img src={offer.image} alt={offer.title} className="offer-image" />
          <div className="offer-details">
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-description">{offer.description}</p>
            <span className="offer-discount">{offer.discount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferComponent;
