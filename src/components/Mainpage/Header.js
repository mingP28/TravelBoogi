import React, { useState } from 'react';
import { BiUserCircle, BiSearch } from 'react-icons/bi';
import { Search } from './Search';
import { useNavigate } from 'react-router-dom';
import locations from '../../data/Location.json';
import './Header.css';

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    navigate('/mypage');
  };

  const handleLoginButtonClick = () => {
    navigate('/login'); // 절대 경로로 변경
  }

  const handleMapSelectClick = () => {
    navigate('/local'); // 절대 경로로 변경
  }
  
  const handleHomeClick = () => {
    navigate('/'); // 절대 경로로 변경
  };

  const handleLocalButtonClick = () => {
    navigate('/local'); // 절대 경로로 변경
  }

  const handleCalenderButtonClick = () => {
    navigate('/calendar'); // 절대 경로로 변경
  }
  
  const handleSearch = (searchTerm) => {
    const destination = locations.find((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (destination) {
      navigate(`/local?id=${encodeURIComponent(destination.id)}`);
    }else {
      alert("검색어와 정확히 일치하는 결과가 없습니다. 검색어를 확인해주세요.");
    }
  };
  const handleSearchIconClick = () => {
    if(query){
      handleSearch(query);
    }
  };

  return (
    <div id="header-container">
      <div className="header-contents">
        <div className="header-image">
          <img src='/images/logo.png' alt="부기의 i들" className="logo" onClick={handleHomeClick} />
        </div>
        <div className="site-name">
          {/*<h1 onClick={handleHomeClick}>부기의 아이들</h1>*/}
        </div>
        <div className = "navbar">
        <button className="navbar-local" onClick={handleLocalButtonClick}>여행지 선택</button>
        <button className="navbar-calender" onClick={handleCalenderButtonClick}>일정만들기</button>
        </div>
        {/*<div className="search">*/}
        {/*  <div className="search-map">*/}
        {/*    <Search*/}
        {/*      query={query}*/}
        {/*      setQuery={setQuery}*/}
        {/*      onSearch={handleSearch}*/}
        {/*    />*/}
        {/*    <button className="map-select-button" onClick={handleMapSelectClick}>*/}
        {/*      &gt; 지도에서 선택하기*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*  <BiSearch className='search-icon' onClick={handleSearchIconClick} />*/}
        {/*</div>*/}
        <div className="user">
          <button className="button" onClick={handleLoginButtonClick}>로그인/회원가입</button>
          <BiUserCircle className="user-icon" size={35} onClick={handleUserIconClick} />
        </div>
      </div>
    </div>
  )
}

export default Header;
