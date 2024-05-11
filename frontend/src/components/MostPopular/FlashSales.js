import React, { useEffect, useState } from "react";
import itemOneImage from "../../assets/img/item-1.png";
import keyboardImage from "../../assets/img/keyboard.png";
import screenImage from "../../assets/img/screen.png";
import chairImage from "../../assets/img/chair.png";
import OwlCarousel from "react-owl-carousel";

export const FlashSales = () => {
  const options = {
    loop: false,
    margin: 25,
  };

  const items = [
    <div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "250px",
          height: "220px",
          position: "relative",
        }}
      >
        <img
          src={chairImage}
          alt="chair"
          style={{
            position: "absolute",
            top: "50%",
            left: "47%",
            transform: "translate(-52%, -50%)",
          }}
        />
        <div
          style={{
            backgroundColor: "#DB4444",
            width: "55px",
            position: "absolute",
            top: "6px",
            left: "13px",
            padding: "1px 0px 1px 11px",
            borderRadius: "5px",
            fontSize: "13px",
            color: "#ffffff",
          }}
        >
          -40%
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "20px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "60px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7C5.65685 7 7 5.65685 7 4C7 2.34315 5.65685 1 4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(7,4)"
            />
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "#000000",
              border: "none",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              fontSize: "15px",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div>test</div>
      <div>$120</div>
      <div>* * * * *</div>
    </div>,

    <div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "250px",
          height: "220px",
          position: "relative",
        }}
      >
        <img
          src={itemOneImage}
          alt="chair"
          style={{
            position: "absolute",
            top: "50%",
            left: "47%",
            transform: "translate(-52%, -50%)",
          }}
        />
        <div
          style={{
            backgroundColor: "#DB4444",
            width: "55px",
            position: "absolute",
            top: "6px",
            left: "13px",
            padding: "1px 0px 1px 11px",
            borderRadius: "5px",
            fontSize: "13px",
            color: "#ffffff",
          }}
        >
          -40%
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "20px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "60px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7C5.65685 7 7 5.65685 7 4C7 2.34315 5.65685 1 4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(7,4)"
            />
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "#000000",
              border: "none",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              fontSize: "15px",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div>test</div>
      <div>$120</div>
      <div>* * * * *</div>
    </div>,

    <div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "250px",
          height: "220px",
          position: "relative",
        }}
      >
        <img
          src={keyboardImage}
          alt="chair"
          style={{
            position: "absolute",
            top: "50%",
            left: "47%",
            transform: "translate(-52%, -50%)",
          }}
        />
        <div
          style={{
            backgroundColor: "#DB4444",
            width: "55px",
            position: "absolute",
            top: "6px",
            left: "13px",
            padding: "1px 0px 1px 11px",
            borderRadius: "5px",
            fontSize: "13px",
            color: "#ffffff",
          }}
        >
          -40%
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "20px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "60px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7C5.65685 7 7 5.65685 7 4C7 2.34315 5.65685 1 4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(7,4)"
            />
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "#000000",
              border: "none",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              fontSize: "15px",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div>test</div>
      <div>$120</div>
      <div>* * * * *</div>
    </div>,
    <div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "250px",
          height: "220px",
          position: "relative",
        }}
      >
        <img
          src={screenImage}
          alt="chair"
          style={{
            position: "absolute",
            top: "50%",
            left: "47%",
            transform: "translate(-52%, -50%)",
          }}
        />
        <div
          style={{
            backgroundColor: "#DB4444",
            width: "55px",
            position: "absolute",
            top: "6px",
            left: "13px",
            padding: "1px 0px 1px 11px",
            borderRadius: "5px",
            fontSize: "13px",
            color: "#ffffff",
          }}
        >
          -40%
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "20px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "60px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7C5.65685 7 7 5.65685 7 4C7 2.34315 5.65685 1 4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(7,4)"
            />
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "#000000",
              border: "none",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              fontSize: "15px",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div>test</div>
      <div>$120</div>
      <div>* * * * *</div>
    </div>,
    <div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          width: "250px",
          height: "220px",
          position: "relative",
        }}
      >
        <img
          src={screenImage}
          alt="chair"
          style={{
            position: "absolute",
            top: "50%",
            left: "47%",
            transform: "translate(-52%, -50%)",
          }}
        />
        <div
          style={{
            backgroundColor: "#DB4444",
            width: "55px",
            position: "absolute",
            top: "6px",
            left: "13px",
            padding: "1px 0px 1px 11px",
            borderRadius: "5px",
            fontSize: "13px",
            color: "#ffffff",
          }}
        >
          -40%
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "20px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            position: "absolute",
            right: "15px",
            top: "60px",
            padding: "2px 0px 0px 0px",
          }}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7C5.65685 7 7 5.65685 7 4C7 2.34315 5.65685 1 4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(7,4)"
            />
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "#000000",
              border: "none",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              fontSize: "15px",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div>test</div>
      <div>$120</div>
      <div>* * * * *</div>
    </div>,
  ];

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "06-05-2024";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-4">
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
          Today's
        </span>
      </div>

      <div className="my-4">
        <div className="d-flex">
          <h1 className="me-4">Flash Sales</h1>
          <div
            className="d-flex justify-content-evenly"
            style={{ width: "20%" }}
          >
            <div style={{ position: "relative" }}>
              <span className="timer">{days}</span>
              <span className="timer-word">Days</span>
            </div>
            <span className="timer-seperator">:</span>
            <div style={{ position: "relative" }}>
              <span className="timer">{hours}</span>
              <span className="timer-word">Hours</span>
            </div>
            <span className="timer-seperator">:</span>
            <div style={{ position: "relative" }}>
              <span className="timer">{minutes}</span>
              <span className="timer-word">Minutes</span>
            </div>
            <span className="timer-seperator">:</span>
            <div style={{ position: "relative" }}>
              <span className="timer">{seconds}</span>
              <span className="timer-word">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      <OwlCarousel className="owl-theme" {...options}>
        {items}
      </OwlCarousel>
    </div>
  );
};
