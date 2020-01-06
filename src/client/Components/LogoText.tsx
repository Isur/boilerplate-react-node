import React from "react";
import "./LogoText.scss";

const LogoText = () => {
  return (
    <div className="LogoText">
      <div className="logo">
        <img src="/public/images/logo.png" />
      </div>
      <div className="text">
        <p className="title"> Boilerplate </p>
        <p className="firstLine">Your best online</p>
        <p className="secondLine">boilerplate solution</p>
      </div>
    </div>
  );
};

export default LogoText;
