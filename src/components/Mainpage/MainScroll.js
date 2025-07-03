import React, { useRef, useState, useEffect } from 'react';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import Header from './Header';
import MainSearch from './MainSearch';
import Card1 from './ScrollCard1';
import Card2 from './ScrollCard2';
import Card3 from './ScrollCard3';
import CountrySlider from './CountrySlider';
import Footer from './Footer';
import './MainScroll.css';

const MainScroll = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const scrollToSection = (sectionIndex) => {
     const section = sectionRefs.current[sectionIndex];
     if (section) {
      section.current.scrollIntoView({ 
        behavior: 'smooth',
      });
      setCurrentSection(sectionIndex);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const offsets = [0, 600, 1300, 1900, 2600]; // 페이지별 오프셋 값
      const currentOffset = window.pageYOffset;
  
      // 현재 스크롤 위치가 각 페이지 오프셋 값에 해당하는지 확인
      const current = offsets.findIndex((offset, index) => {
        return currentOffset >= offset && (index === offsets.length - 1 || currentOffset < offsets[index + 1]);
      });
  
      setCurrentSection(current); // 현재 섹션 상태 업데이트
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-container">
      <Header />
      <div ref={sectionRefs.current[0]} className="scroll-section">
        <MainSearch />
      </div>
      <div ref={sectionRefs.current[1]} className="scroll-section">
        <Card1 />
      </div>
      <div ref={sectionRefs.current[2]} className="scroll-section">
        <Card2 />
      </div>
      <div ref={sectionRefs.current[3]} className="scroll-section">
        <Card3 />
      </div>
      <div ref={sectionRefs.current[4]} className="scroll-section">
        <CountrySlider />
        <Footer />
      </div>
      <div className="indicator-container">
        {sectionRefs.current.map((_, index) => (
          <span
            key={index}
            className={`indicator-dot ${index === currentSection ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>
      <button className="scroll-top" onClick={scrollToTop}>
      <FaRegArrowAltCircleUp />
    </button>
    </div>
  );
};

export default MainScroll;