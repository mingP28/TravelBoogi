//src/components/Mypage/Mypage.js
import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content'; 
import './Mypage.css'; 

const Mypage = () => {
  return (
    <div className="mypage-container">
      <Sidebar />
      <Content />
    </div>
  );
}

export default Mypage;




