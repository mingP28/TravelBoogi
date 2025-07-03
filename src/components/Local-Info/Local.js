// src/components/Local-Info/Local.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiUserCircle, BiSearch } from 'react-icons/bi';
import locations from '../../data/Location.json';
import LocalInfo from './Local-Info';
import LocalList from './Local-List';
import { Search } from '../Mainpage/Search';
import Footer from '../Mainpage/Footer';
import './Local.css';

const Local = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [lastSelectedDestination, setLastSelectedDestination] = useState(null);
  const [currentPage, setCurrentPage] = useState('main');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedId = params.get('id');
    const destination = locations.find((loc) => loc.id === selectedId);

    if (destination) {
      setSelectedDestination(destination);
      setLastSelectedDestination(destination);
      setCurrentPage('detail');
    } else {
      setCurrentPage('main');
    }
  }, [location.search]);


  const handleSearch = (searchTerm) => {
    setCurrentPage(currentPage === 'detail' ? 'main' : currentPage);
    const destination = locations.find((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (destination) {
      navigate(`/local?id=${encodeURIComponent(destination.id)}`);
    } else {
      alert("검색어와 정확히 일치하는 결과가 없습니다. 검색어를 확인해주세요.");
    }
  };

  const handleMapSelectClick = () => {
    navigate('/local-map'); // 절대 경로로 변경
}

  const handleBack = () => {
    setCurrentPage('main');
  };

  const handleUserIconClick = () => {
    navigate('/mypage');
  }

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearchIconClick = () => {
    if(query){
        handleSearch(query);
    }
  };

  return (
    <div>
      {currentPage === 'main' && (
        <>
          <div className="local-style">
            <div className="navbar2">
              <img src='/images/logo.png' alt="트래블부기" className="logo2" onClick={handleLogoClick} />
              <h1 className="site-name-h11">트래블부기</h1>
            </div>
            <div className ="list-search">
              <div className ="search-block">
              <Search
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              />
              <BiSearch className='search-icon2' onClick={handleSearchIconClick} />
              </div>
            <button className="map-select-button" onClick={handleMapSelectClick}>
              &gt; 지도에서 선택하기
            </button>
            </div>
            <BiUserCircle className="user-icon2" size={35} onClick={handleUserIconClick} />
          </div>
          <br />
          <div className="world-list">
            <LocalList />
            <Footer />
          </div>
        </>
      )}

      {currentPage === 'detail' && (
        <LocalInfo selectedDestination={selectedDestination || lastSelectedDestination} onBack={handleBack} />
      )}
    </div>
  );
};
export default Local; 