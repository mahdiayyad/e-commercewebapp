import React from "react";

export const Contact = () => {
  return (
    <div className="mb-5">
      <div
        className="container contact"
        style={{ marginLeft: "30px", marginTop: "50px" }}
      >
        <div className="row g-0">
          <div className="col-12">
            <div className="contact-container">
              <div className="aside-contact">
                <div className="d-flex align-items-center">
                  <div>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#DB4444" />
                      <path
                        d="M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mx-2">
                    <span className="fw-bold">Call To Us</span>
                  </div>
                </div>

                <div style={{ height: "15px" }}></div>
                <div>
                  <span style={{ fontSize: "15px" }}>
                    We are available 24/7, 7 days a week.
                  </span>
                </div>
                <div style={{ height: "15px" }}></div>
                <div>
                  <span style={{ fontSize: "15px" }}>
                    Phone: +8801611112222
                  </span>
                </div>
                <div style={{ height: "25px" }}></div>
                <div
                  style={{ borderBottom: "1px solid #ccc", height: "1px" }}
                ></div>

                <div style={{ height: "25px" }}></div>

                <div className="d-flex align-items-center">
                  <div>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#DB4444" />
                      <path
                        d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mx-2">
                    <span className="fw-bold">Write To US</span>
                  </div>
                </div>

                <div style={{ height: "15px" }}></div>
                <div>
                  <span style={{ fontSize: "15px" }}>
                    Fill out our form and we will contact you within 24 hours.
                  </span>
                </div>
                <div style={{ height: "15px" }}></div>
                <div>
                  <span style={{ fontSize: "15px" }}>
                    Emails: customer@exclusive.com
                  </span>
                </div>
                <div style={{ height: "15px" }}></div>
                <div>
                  <span style={{ fontSize: "15px" }}>
                    Emails: support@exclusive.com
                  </span>
                </div>
              </div>
              <div className="contact-form-container mx-5 w-100">
                <form>
                  <div className="row g-0">
                    <div className="col-lg-4 col-sm-12">
                      <input
                        className="contact-input"
                        type="text"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <input
                        className="contact-input"
                        type="text"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <input
                        className="contact-input"
                        type="text"
                        placeholder="Your Phone"
                      />
                    </div>
                  </div>

                  <div className="row g-0">
                    <div className="col-12">
                      <textarea
                        placeholder="Your Message"
                        className="contact-textarea"
                        rows={8}
                      />
                    </div>
                  </div>

                  <div className="row g-0">
                    <div className="col-12">
                      <button className="btn submit-contact-btn">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
