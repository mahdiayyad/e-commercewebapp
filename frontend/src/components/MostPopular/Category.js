import React, { useState } from "react";
import cellPnImage from "../../assets/img/Category-CellPhone.png";
import pcImage from "../../assets/img/Category-Computer.png";
import smartWatchImg from "../../assets/img/Category-SmartWatch.png";
import cameraImg from "../../assets/img/Category-Camera.png";
import headphonesImg from "../../assets/img/Category-Headphone.png";
import gamingImg from "../../assets/img/Category-Gamepad.png";
import OwlCarousel from "react-owl-carousel";

export const Category = () => {
  const options = {
    loop: false,
    margin: 0,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  const categories = [
    <div
      className="d-flex align-items-center justify-content-evenly flex-column"
      style={{ border: "1px solid #7D8184", width: "75%", height: "140px" }}
    >
      <img src={cellPnImage} alt="cellphone" />
      <div>
        <span>Phones</span>
      </div>
    </div>,
    <div
      className="d-flex align-items-center justify-content-evenly flex-column"
      style={{ border: "1px solid #7D8184", width: "75%", height: "140px" }}
    >
      <img src={pcImage} alt="Computers" />
      <div>
        <span>Computers</span>
      </div>
    </div>,
    <div
      className="d-flex align-items-center justify-content-evenly flex-column"
      style={{ border: "1px solid #7D8184", width: "75%", height: "140px" }}
    >
      <img src={smartWatchImg} alt="SmartWatch" />
      <div>
        <span>SmartWatch</span>
      </div>
    </div>,
    <div
      className="d-flex align-items-center justify-content-evenly flex-column"
      style={{ border: "1px solid #7D8184", width: "75%", height: "140px" }}
    >
      <img src={cameraImg} alt="Camera" />
      <div>
        <span>Camera</span>
      </div>
    </div>,
    <div
      className="d-flex align-items-center justify-content-evenly flex-column"
      style={{ border: "1px solid #7D8184", width: "75%", height: "140px" }}
    >
      <img src={headphonesImg} alt="HeadPhones" />
      <div>
        <span>HeadPhones</span>
      </div>
    </div>,
    <div
      className="d-flex align-items-center justify-content-evenly flex-column"
      style={{ border: "1px solid #7D8184", width: "75%", height: "140px" }}
    >
      <img src={gamingImg} alt="gaming" />
      <div>
        <span>Gaming</span>
      </div>
    </div>,
  ];

  return (
    <div>
      <div
        style={{
          border: "10px solid #DB4444",
          height: "40px",
          borderRadius: "5px",
          width: "20px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "30px",
            bottom: "-2px",
            color: "#D84444",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          Categories
        </span>
      </div>

      <div className="my-4">
        <div className="d-flex">
          <h1 className="me-4">Browse By Category</h1>
        </div>
      </div>

      <OwlCarousel className="owl-theme" {...options}>
        {categories}
      </OwlCarousel>
    </div>
  );
};
