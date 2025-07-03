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
import Calendar from './components/Timetable/Calendar';
import Exchange from './components/Local-Info/Exchange';
import Weather from './components/Local-Info/Weather';
import LocalInfo from './components/Local-Info/Local-Info';
import Local from './components/Local-Info/Local';
import Local_map from './components/Local-Info/Local-map';
import MainScroll from './components/Mainpage/MainScroll';
import Team from "./components/Mainpage/Team";

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
          <Route path="/local-map" element={<Local_map />} />
          <Route path="/team" element={<Team />} />

          <Route path="/" element={
            <div className="App">
              <MainScroll/>
            </div>
          } />

          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;






