import React from 'react';
import { BiUserCircle} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    navigate('/mypage');
  };

  const handleLoginButtonClick = () => {
    navigate('/login'); // 절대 경로로 변경
  }
  
  const handleHomeClick = () => {
    navigate('/'); // 절대 경로로 변경
  };

  const handleLocalButtonClick = () => {
    navigate('/local'); // 절대 경로로 변경
  }

  const handleTeamButtonClick = () => {
    navigate('/team'); // 절대 경로로 변경
  }
  const handleAirplaneButtonClick = () => {
    window.location.href = 'https://flight.naver.com/';
  }


  return (
    <div id="header-container">
      <div className="header-contents">
        <div className="header-image">
          <img src='/images/logo.png' alt="트래블부기" className="logo" onClick={handleHomeClick} />
        </div>
        <div className="site-name">
          <h1 className="site-name-h1">트래블부기</h1>
        </div>
        <div className = "navbar">
          <button className="navbar-local" onClick={handleLocalButtonClick}>여행지 선택</button>
          <button className="navbar-airplane" onClick={handleAirplaneButtonClick}>항공권 예약</button>
          <button className="navbar-calender" onClick={handleTeamButtonClick}>팀원 소개</button>
        </div>
        <div className="user">
          <button className="button" onClick={handleLoginButtonClick}>로그인</button>
          <BiUserCircle className="user-icon" size={35} onClick={handleUserIconClick} />
        </div>
      </div>
    </div>
  )
}

export default Header;
