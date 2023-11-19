// src/components/Mainpage/CountrySlider.js
import React from "react";
import Slider from 'react-slick';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CountrySlider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 이미지 경로 설정
const prevArrowImage = process.env.PUBLIC_URL + '/prevarrow.png';
const nextArrowImage = process.env.PUBLIC_URL + '/nextarrow.png';

// 커스텀 화살표 컴포넌트
const CustomPrevArrow = (props) => (
  <div {...props} className="custom-arrow custom-prev-arrow">
    <img src={prevArrowImage} alt="Previous" className="arrow-image" />
  </div>
);

const CustomNextArrow = (props) => (
  <div {...props} className="custom-arrow custom-next-arrow">
    <img src={nextArrowImage} alt="Next" className="arrow-image" />
  </div>
);

const CountrySlider = ({ imageData }) => {
  const filteredCities = imageData.filter(city =>
    ["New York", "Paris", "London", "Rome", "Cebu", "Tokyo", "Jeju", "Shanghai"].includes(city.id)
  );

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    draggable: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="slider-container">
      <h1 className="recommended-country">추천 여행지</h1>
      <Slider {...settings}>
        {filteredCities.map((city, idx) => (
          <Link key={idx} to={`/local?id=${city.id}`} className="image-link">
            <div className="image-container">
              <img src={process.env.PUBLIC_URL + city.image} alt={city.id} />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default CountrySlider;
