//src/components/Mypage/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="sidebar">
      <div className="menu-title">마이페이지</div>
      <div className="menu-bottom">
        <Link to="/timetable" className="menu-item">내가 만든 일정</Link>
        <div onClick={goBack} className="menu-back">뒤로 가기</div>
      </div>
    </div>
  );
};

export default Sidebar;

