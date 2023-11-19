// src/components/Local-Info/Local.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import locations from '../../data/Location.json';
import LocalInfo from './Local-Info';
import Map from './Map';
import './Local.css';

const Local = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [lastSelectedDestination, setLastSelectedDestination] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentPage, setCurrentPage] = useState('main');

  const goHome = () => {
    navigate('/');
  };

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


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(currentPage === 'detail' ? 'main' : currentPage);
  };

  const filteredDestinations = locations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setLastSelectedDestination(destination);
    setCurrentPage('detail');
    navigate(`/local?id=${destination.id}`);
  };

  const handleBack = () => {
    setCurrentPage('main');
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setCurrentPage('main');
  };

  const handleUserIconClick = () => {
    navigate('/mypage');
  }

  return (
    <div>
      {currentPage === 'main' && (
        <>
          <div className="local-style">
          <div className="navbar">
            <img src='/images/logo.png' alt="부기의 i들" className="logo2" onClick={goHome}/>
          </div>
            <input
              className="search-input"
              type="text"
              placeholder="어디로 여행가시나요?"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && filteredDestinations.length > 0 && (
              <ul>
                {filteredDestinations.map((destination, index) => (
                  <li key={index} onClick={() => handleDestinationClick(destination)}>
                    {destination.name}
                  </li>
                ))}
              </ul>
            )}
            <img src='/images/search.png' alt="돋보기" className='search_icon'
            style={{ width: '30px', height: '30px' }} />
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
          {selectedRegion && (
            <Map region={selectedRegion} onCitySelect={handleDestinationClick} />
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

export default Local;
