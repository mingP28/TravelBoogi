// src/components/Local-Info/Local-Info.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Local-Info.css';
import Header from '../Mainpage/Header';
import Weather from './Weather';
import Exchange from './Exchange';

const Local_Info = ({ selectedDestination }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/calendar', { state: { cityName: selectedDestination.id } });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
      <div className="schedule-container">
        <Header />
        {selectedDestination ? (
            <>
              <div className="sections-container">
                <div className="city-imgcontainer">
                  <img src={selectedDestination.square} alt={selectedDestination.name} className="city-image" />
                  <div className="city-description">
                  </div>
                </div>
                <div className="sections-group">
                  <Weather city={selectedDestination} apiKey="f6b774b761a9272ecf00b7cc52c623de" />
                  <Exchange fromCurrencyCode={selectedDestination.currencyCode} />
                </div>
              </div>
              <div className="button-local">
                      <button className="button-schedule" onClick={handleButtonClick}>
                        일정 만들기
                      </button>
                      <button className="button-cancel3" onClick={goBack}>
                        취소
                      </button>
                    </div>
            </>
        ) : (
            <p>여행지가 선택되지 않았습니다.</p>
        )}
      </div>
  );
};

export default Local_Info;
