//src/components/Mypage/Content.js
import React, { useState, useEffect } from 'react';
import './Content.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import locations from '../../data/Location.json';

const Content = () => {
  const navigate = useNavigate();
  const initialTab = localStorage.getItem('selectedTab') || 'travelList';
  console.log('Stored selected tab:', initialTab);
  const [selectedTab, setSelectedTab] = useState('travelList'); // 'schedule' 또는 'travelList'

  const [favoriteCities, setFavoriteCities] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const favoriteCityIds = Object.keys(storedFavorites).filter((cityId) => storedFavorites[cityId]);
        setFavoriteCities(favoriteCityIds);
    }, []);

  const handleHomeClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  const handleTabSelect = (tabName) => {
    setSelectedTab(tabName);
    localStorage.setItem('selectedTab', tabName);
  };

const renderLikedCity = () => {
  const handleImageClick = (cityId) => {
    navigate(`/local?id=${encodeURIComponent(cityId)}`);
  };

  const citiesInRows = [];
  const citiesPerRow = 3;

  for (let i = 0; i < favoriteCities.length; i += citiesPerRow) {
    const citiesForRow = favoriteCities.slice(i, i + citiesPerRow);
    const row = (
      <div className='liked-card-container' key={i}>
        {citiesForRow.map((cityId, index) => {
          const city = locations.find((location) => location.id === cityId);
          return (
            <div key={city.id} className={`liked-card${index + 1}`} style={{ marginBottom: '30px', cursor: 'pointer'}} onClick={() => handleImageClick(city.id)}>
              <FaHeart className="heart-icon2" />
              <img src={city.image} width={250} height={200} alt={city.name} />
              <div className="liked-text">
                <h3 className="liked-country">{city.name}</h3></div>
            </div>
          );
        })}
      </div>
    );
    citiesInRows.push(row);
  }

  return (
    <div className="top-section">
      {citiesInRows.map((row, index) => (
        <div className="liked-card-container" key={index}>
          {row}
        </div>
      ))}
    </div>
  );
};



  const renderTravelList = () => {

    const handleCardClick = (cityId, startDate) => {
      navigate('/timetable', { state: { cityName: cityId, startDate } });
    };

    return (
      <div>
        <div className="header-card">
          <div className="header-card1" onClick={() => handleCardClick('New york', '2023-12-05')}>
            <img src='images/newyork.png' width={250} height={200} />
            <div className="card-text">
              <p className="card1-date">2023.12.05 ~ 2023.12.09</p>
              <h3 className="card1-country">미국 뉴욕</h3>
            </div>
          </div>
          <div className="header-card2" onClick={() => handleCardClick('Paris', '2023-12-15')}>
            <img src='images/paris.png' width={250} height={200} />
            <div className="card-text">
              <p className="card2-date">2023.12.15 ~ 2023.12.29</p>
              <h3 className="card2-country">프랑스 파리</h3>
            </div>  
          </div>
          <div className="header-card3" onClick={() => handleCardClick('Chicago', '2024-01-13')}>
            <img src='images/chicago.png' width={250} height={200} />
            <div className="card-text">
              <p className="card3-date">2024.01.13 ~ 2024.01.20</p>
              <h3 className="card3-country">미국 시카고</h3>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-body">
      <div className="header-content">
        <img src='/images/logo.png' alt="트래블부기" className="logo3" onClick={handleHomeClick} />
        <h1 className="title">MY PAGE</h1>
      </div>
      <div>
        <div className="tab-buttons">
        <button
            onClick={() => handleTabSelect('travelList')}
            className={selectedTab === 'travelList' ? 'selected' : ''}
          >
            나의 일정
          </button>
          <button
            onClick={() => handleTabSelect('likedcity')}
            className={selectedTab === 'likedcity' ? 'selected' : ''}
          >
            찜한 도시
          </button>
        </div>
        <div className="content-area">
          {selectedTab === 'likedcity' && renderLikedCity()}
          {selectedTab === 'travelList' && renderTravelList()}
        </div>
      </div>
    </div>
  );
}

export default Content;