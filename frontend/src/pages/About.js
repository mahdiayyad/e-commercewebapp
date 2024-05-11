import React from "react";
import aboutImg from "../assets/img/about.png";
import { Growth } from "../components/About/Growth";
import { Partners } from "../components/About/Partners";
import { Service } from "../components/About/Service";

export const About = () => {
  return (
    <div className="mb-5">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-6 col-sm-12">
            <div className="title-header" style={{ marginLeft: "30px" }}>
              <span
                className="ourstory"
                style={{ fontSize: "3rem", fontWeight: "700" }}
              >
                Our Story
              </span>
            </div>
            <div style={{ marginLeft: "30px" }}>
              <p style={{ fontSize: "19px", width: "95%", margin: "20px 0px" }}>
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </p>
              <p style={{ fontSize: "19px", width: "95%", margin: "20px 0px" }}>
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
          </div>
          <div className="col-6 about-img">
            <img
              className="img-fluid"
              src={aboutImg}
              alt="about"
              style={{ width: "85%" }}
            />
          </div>
        </div>
      </div>

      <Growth />
      <Partners />
      <Service />
    </div>
  );
};
