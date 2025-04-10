import React from "react";

const HeaderBanner = ({ title }) => {
  return (
    <div className="header-banner">
      <div className="line"></div>
      <div className="banner-title">{title}</div>
      <div className="line"></div>
    </div>
  );
};

export default HeaderBanner;
