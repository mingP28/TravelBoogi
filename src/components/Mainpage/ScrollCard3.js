import React from 'react';

const cardStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '80%', // 섹션 높이에 맞춤
    width: '80%',
    textAlign: 'left',
    color: '#333', // 글자 색상
    backgroundColor: 'white',
    marginTop: '60px',
}
const imageStyle = {
    marginTop: '200px',
    width: 'auto',
    height: '310px',
    boxShadow: '10px 10px 15px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: '55px',
    overflow: 'hidden',
};
const textStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left',
    height: '25%',
    padding: '17% 0',
    fontSize: '1.25rem',
    marginRight: '60px',
};
const titleStyle = {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#00006c',
}

const ScrollCard3 = () => {
    return (
        <div className="card3-container" style={cardStyle}>

            <div style={textStyle}>
                <h3 style={titleStyle}>일정 관리</h3>
                <p>
                    날짜별, 시간별 일정을 세워보세요.<br /> <br/>
                    TimeTable로 일정을 한눈에 파악하세요.<br />
                    <br />
                </p>
            </div>
            <img src="/images/image3.png" alt="일정 관리" style={imageStyle} />
        </div>
    );
};

export default ScrollCard3;