// src/components/Local-Info/Local-map.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiUserCircle, BiSearch } from 'react-icons/bi';
import locations from '../../data/Location.json';
import LocalInfo from './Local-Info';
import Map from './Map';
import { Search } from '../Mainpage/Search';
import './Local.css';
import mapimg from "./map.png";

const Local_map = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [lastSelectedDestination, setLastSelectedDestination] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
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

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setLastSelectedDestination(destination);
    setCurrentPage('detail');
    navigate(`/local-map?id=${destination.id}`);
  };

  const handleMapSelectClick = () => {
    navigate('/local'); // 절대 경로로 변경
  }

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setCurrentPage('main');
  };

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
    if (query) {
      handleSearch(query);
    }
  };

  return (
    <div>
      {currentPage === 'main' && (
        <>
          <div className="local-style">
            <div className="navbar">
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
                        &gt; 목록에서 선택하기
                    </button>
            </div>
            <BiUserCircle className="user-icon2" size={35} onClick={handleUserIconClick} />
          </div>
          <br />
          <div className="world-map">
            <div className = "region-select">
            <div onClick={() => handleRegionSelect('북아메리카')} className="region-tab">북아메리카</div>
            <div onClick={() => handleRegionSelect('남아메리카')} className="region-tab">남아메리카</div>
            <div onClick={() => handleRegionSelect('유럽')} className="region-tab">유럽</div>
            <div onClick={() => handleRegionSelect('동북아시아')} className="region-tab">동북아시아</div>
            <div onClick={() => handleRegionSelect('동남아시아')} className="region-tab">동남아시아</div>
            </div>
            {selectedRegion ? (
                // selectedRegion이 있을 때 Map 컴포넌트를 렌더링합니다.
                <Map region={selectedRegion} onCitySelect={handleDestinationClick} />
            ) : (
                // selectedRegion이 없을 때 map.png 이미지를 렌더링합니다.
                <img src={mapimg} alt="mapimage" className="map-f-image" />
            )}
          </div>
        </>
      )}

      {currentPage === 'detail' && (
        <LocalInfo selectedDestination={selectedDestination || lastSelectedDestination} onBack={handleBack} />
      )}

    </div>
  );
};
export default Local_map; 