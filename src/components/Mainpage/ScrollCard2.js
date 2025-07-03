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
    height: '320px',
    boxShadow: '10px 10px 15px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: '55px',
    overflow: 'hidden',
};
const textStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'right',
    height: '25%',
    padding: '17% 0',
    fontSize: '1.25rem',
};
const titleStyle = {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#00006c',
}

const ScrollCard2 = () => {
    return (
        <div className="card2-container" style={cardStyle}>
            <img src="/images/image2.png" alt="여행 계획" style={imageStyle} />
            <div style={textStyle}>
                <h3 style={titleStyle}>여행 계획</h3>
                <p>
                    나만의 여행 계획을 세워보세요.<br /><br/>
                    Drag&Drop으로 간편하게 계획하세요.<br />
                    <br />
                </p>
            </div>

        </div>
    );
};

export default ScrollCard2;