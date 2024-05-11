import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import sellersActive from "../../assets/img/sellers_active.png";
import monthlyProductSale from "../../assets/img/monthly_product_sale.png";
import customerActive from "../../assets/img/customer_active.png";
import annualGrowth from "../../assets/img/annual_growth.png";

export const Growth = () => {
  const [isVisible, setIsVisible] = useState(false);

  const formatNumber = (value) => {
    if (value >= 1000 && value < 1000000) {
      return `${(value / 1000).toFixed(1)}k`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}m`;
    }
    return value;
  };

  const animations = [
    {
      number: useSpring({
        number: isVisible ? 10000 : 0,
        from: { number: 0 },
        config: { duration: 4000 },
      }),
      label: "Sellers active our site",
      src: sellersActive,
    },
    {
      number: useSpring({
        number: isVisible ? 33000 : 0,
        from: { number: 0 },
        config: { duration: 4000 },
      }),
      label: "Monthly Product Sale",
      src: monthlyProductSale,
    },
    {
      number: useSpring({
        number: isVisible ? 45500 : 0,
        from: { number: 0 },
        config: { duration: 4000 },
      }),
      label: "Customer active in our site",
      src: customerActive,
    },
    {
      number: useSpring({
        number: isVisible ? 25000 : 0,
        from: { number: 0 },
        config: { duration: 4000 },
      }),
      label: "Annual growth sale in our site",
      src: annualGrowth,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const section = document.getElementById("growth-section");
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollY > sectionTop - window.innerHeight + sectionHeight / 2) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div id="growth-section" className="row g-0">
        <div className="col-12">
          <div className="growth-container">
            {animations.map(({ number, label, src }, index) => (
              <div
                className="box"
                style={{
                  backgroundColor: index === 1 ? "#DB4444" : "",
                  color: index === 1 ? "#fff" : "",
                }}
                key={index}
              >
                <span>
                  <img src={src} width={60} height={60} alt={label} />
                </span>
                <p
                  className="m-0 mt-2"
                  style={{ fontSize: "1.5rem", fontWeight: 700 }}
                >
                  <animated.div>
                    {number.number.to((val) => {
                      return formatNumber(Math.floor(val));
                    })}
                  </animated.div>
                </p>
                <p className="m-0" style={{ fontSize: "16px" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
