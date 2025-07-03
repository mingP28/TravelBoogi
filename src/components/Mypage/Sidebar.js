//src/components/Mypage/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };


  return (
    <div className="sidebar">
        <img src='/images/profile.png' alt='profile' className="profile" />
        <div className="user-nickname">Anne</div>
        <div className="user-intro">I love travel !</div>
        <div onClick={goBack} className="menu-back">뒤로 가기</div>
      </div>
  );
};

export default Sidebar;

