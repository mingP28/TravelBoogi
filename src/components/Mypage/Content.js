//src/components/Mypage/Content.js
import React from 'react';
import './Content.css';
import { useNavigate } from 'react-router-dom';

const Content = () => {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className = "my-body">
      <div className="header-content">
        <img src='/images/logo.png' alt="부기의 i들" className="logo" onClick={handleHomeClick} />
        <h1 className="title">MY PAGE</h1>
      </div>
      <div className="header-card">
        <div className="header-card1">
          <img src='images/newyork.png' width={300} height={300} />
          <p className="card1-day">2023.11.05 ~ 2023.11.09</p>
          <h3 className="card1-country">미국 뉴욕</h3>
        </div>
        <div className="header-card2">
          <img src='images/paris.png' width={300} height={300} />
          <p className="card2-day">2023.12.15 ~ 2023.12.29</p>
          <h3 className="card2-country">프랑스 파리</h3>
        </div>
      </div>
    </div>
  );
}

export default Content;
