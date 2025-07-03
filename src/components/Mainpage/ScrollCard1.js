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
};
const titleStyle = {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#00006c',
}

const ScrollCard1 = () => {
    return (
        <div className="card1-container" style={cardStyle}>

            <div style={textStyle}>
                <h3 style={titleStyle}>현지정보</h3>
                <p>
                    현지 날씨를 참고하여 여행을 설계하세요.<br/><br/>
                    환율 정보를 통해 경비를 효율적으로 관리하세요.<br/>
                </p>
            </div>
            <img src="/images/image1.png" alt="현지 정보" style={imageStyle}/>
        </div>
    );
};

export default ScrollCard1;