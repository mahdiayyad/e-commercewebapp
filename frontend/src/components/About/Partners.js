import React from "react";
import image1 from "../../assets/img/image46.png";
import image2 from "../../assets/img/image51.png";
import image3 from "../../assets/img/image47.png";
import OwlCarousel from "react-owl-carousel";

export const Partners = () => {
  const options = {
    loop: false,
    margin: 25,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
    },
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row g-0">
        <div className="col-12">
          <OwlCarousel className="owl-theme partners-container " {...options}>
            <div className="partner-box">
              <img className="img1" src={image1} alt="image1" />
            </div>
            <div className="partner-box">
              <img className="image-fluid img2" src={image2} alt="image2" />
            </div>
            <div className="partner-box">
              <img className="img3" src={image3} alt="image3" />
            </div>
            <div className="partner-box">
              <img className="img3" src={image3} alt="image3" />
            </div>
            <div className="partner-box">
              <img className="img3" src={image3} alt="image3" />
            </div>
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};
