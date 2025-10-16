import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import "./Advertisement.css";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const images = [
    "sliderImage-1.jpg",
    "sliderImage-3.jpg",
    "sliderImage-4.jpg",
    "sliderImage-6.jpg",
    "sliderImage-5.jpg",
    "sliderImage-2.png",
  ];

  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <>
      <Container className="container-fluid sliderImage mb-5 bg-container">
        <Row className="justify-content-center advertisement-container">
          <Col md={8}>
            <div className="slider position-relative">
              <FaArrowAltCircleLeft
                className="left-arrow "
                onClick={prevSlide}
              />
              <FaArrowAltCircleRight
                className="right-arrow"
                onClick={nextSlide}
              />

              <Carousel
                activeIndex={current}
                onSelect={setCurrent}
                interval={null}
                controls={false}
                indicators={false}
              >
                {images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="d-block w-100 image-container img-fluid adv-images boxShadow"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="container container-fluid">
        <div className="d-flex justify-content-evenly mb-5">
          {/* first box */}
          <div className="box">
            <div className="h3">5000+</div>
            <div className="h4">Startups Registered</div>
          </div>

          {/* second box */}
          <div className="box">
            <div className="h3">2000+</div>
            <div className="h4">Investors Registered</div>
          </div>

          {/* third box */}
          <Link to="/post" style={{ textDecoration: "none" }}>
            <div className="box post">
              <div className="h3">Discover Latest Posts</div>
              <div className="h4">
                Stay updated with the latest posts and trends.
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Links */}

      <div className="container container-fluid">
        <div className="d-flex mb-5 gap-5">
          <Link to="/startups" className="view-button startup">
            <div>View Startups</div>
          </Link>

          <Link to="/investors" className="view-button invester">
            <div>View Investors</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Advertisement;

// ========================================================================

// import { useEffect, useState } from "react";

// import "./Advertisement.css";

// function Advertisement() {
//   const images = [
//     "certificate.svg",
//     "eligibility.svg",
//     "notification.svg",
//     "recognised.svg",
//   ];

//   const [currentImage, setCurrentImage] = useState(images[0]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (index === images.length) {
//         setIndex(() => 0);
//         setCurrentImage(images[0]);
//       } else {
//         setCurrentImage(images[index]);
//         setIndex((index) => index + 1);
//       }
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, [currentImage, index, images]);

//   return (
//     <div className="advertisement-container">
//       <img
//         src={currentImage}
//         className="image-container img-fluid adv-images"
//         alt="Responsive image"
//       />
//     </div>
//   );
// }

// export default Advertisement;
