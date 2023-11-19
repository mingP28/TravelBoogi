//src/App.js
import React from 'react';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login-Signup/Login';
import Signin from './components/Login-Signup/Signin';
import Mypage from './components/Mypage/Mypage';
import Timetable from './components/Timetable/Timetable';
import Content from './components/Mypage/Content';
import Header from './components/Mainpage/Header';
import Card from './components/Mainpage/Card';
import cardData from './data/CardData.json';
import CountrySlider from './components/Mainpage/CountrySlider';
import Location from './data/Location.json';
import Footer from './components/Mainpage/Footer';
import Calendar from './components/Timetable/Calendar';
import Exchange from './components/Local-Info/Exchange';
import Weather from './components/Local-Info/Weather';
import LocalInfo from './components/Local-Info/Local-Info';
import Local from './components/Local-Info/Local';
import MainSearch from "./components/Mainpage/MainSearch";

function App() {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/content" element={<Content />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/local-info" element={<LocalInfo />} />
          <Route path="/local" element={<Local />} />

          <Route path="/" element={
            <div className="App">
              <Header />
              <MainSearch />
              <div className="main-info">
                부기의 아이들 페이지에서는
                이런 것들이 가능합니다!
              </div>
              <div className="card-container">
                {cardData.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </div>
              <div className="country-container">
                <CountrySlider imageData={Location} />
              </div>
              <div className="foot-container">
                <Footer />
              </div>
            </div>
          } />

          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;






