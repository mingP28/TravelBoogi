// src/components/Mainpage/Team.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import './Team.css';

function Team() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="team">
      <div id="team-header-container">
        <Header />
      </div>
      <div className="team-title"><h1>팀원소개</h1></div>
      <div className="team_contents">
        <div className="team_member">
          <img src='/images/chaeyoung.png' alt="채영" className="img_cy" />
          <h2 className="name">채영</h2>
          <h3>ISFJ</h3>
          <p className="mem_des">&nbsp;&nbsp;일정 계획 페이지<br/>여행지 상세 페이지</p>
        </div>
        <div className="team_member">
          <img src='/images/seoyeong.png' alt="서영" className="img_sy" />
          <h2 className="name">서영</h2>
          <h3>INTP</h3>
          <p className="mem_des">여행지 선택 페이지<br/>디자인 및 기능개선</p>
        </div>
        <div className="team_member">
          <img src='/images/minseo.png' alt="민서" className="img_ms" />
          <h2 className="name">민서</h2>
          <h3>ISTP</h3>
          <p className="mem_des">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;메인페이지<br/>홈페이지 레이아웃</p>
        </div>
        <div className="team_member">
          <img src='/images/gyuri.png' alt="규리" className="img_gr" />
          <h2 className="name">규리</h2>
          <h3>ISFJ</h3>
          <p className="mem_des">&nbsp;&nbsp;마이페이지<br/>로그인 페이지 </p>
        </div>
      </div>
      <div className="tbutton"><div onClick={goBack} className="button-cancel">뒤로가기</div></div>
    </div>
  );
}


export default Team;