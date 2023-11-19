//src/components/Mainpage/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="footer-team">
                    <div className="footer-title">부기의 i들</div>
                    <div>여행지</div>
                    <div>일정만들기</div>
                    <div>Q&A</div>
                </div>
                <div className="footer-factory">
                    <div className="factory-title">한성대학교</div>
                    <div>학교이야기</div>
                    <div>학교소개</div>
                    <div>광고 및 제휴</div>
                </div>
                <div className="footer-customer">
                    <div className="customer-center">고객센터</div>
                    <div>FAQ</div>
                    <div>이용약관</div>
                    <div>개인정보 처리방침</div>
                </div>
            </div>
        </div>
    )
}
export default Footer;