//src/components/Login-Signup/Signin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // 절대 경로로 변경
  };

  const handleKakaoButtonClick = () => {
    window.location.href = 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fcs.kakao.com%2Fhelps%3Fcategory%3D25#login';
  }

  const handleNaverButtonClick = () => {
    window.location.href = 'https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/';
  }

  const handleGoogleButtonClick = () => {
    window.location.href = 'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&hl=ko&ifkv=ASKXGp3ByABP5yoPw9z2uVgkwCQpmbeN-isA3j9yToeq2S1FsrZnpONQ7BJzHXSb8LhaGewo6EyjmA&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1828416872%3A1700609004337421&theme=glif';
  }

  const handleAppleButtonClick = () => {
    window.location.href = 'https://appleid.apple.com/sign-in';
  }

  const handleSignin = () => {
    if (id && password) {
      // 로컬 스토리지에서 저장된 사용자 목록 가져오기
      const userList = JSON.parse(localStorage.getItem('userList')) || [];
  
      // 사용자 식별자 생성 (여기서는 간단하게 타임스탬프를 사용)
      const timestamp = new Date().getTime();
      const userIdentifier = `user_${timestamp}`;
  
      // 새로운 사용자 데이터 생성
      const userData = {
        id: userIdentifier,
        userId: id,
        userPassword: password,
      };
  
      // 사용자 목록에 추가
      userList.push(userData);
  
      // 로컬 스토리지에 업데이트된 사용자 목록 저장
      localStorage.setItem('userList', JSON.stringify(userList));
  
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } else {
      alert('회원가입에 실패했습니다. 입력 정보를 확인하세요.');
    }
  };

  return (
    <div className="container">
      <div className="header">
      <img src='/images/logo.png' alt="부기의 i들" className="logo" onClick={handleHomeClick} />
        <div className="text">SIGN UP</div>
      </div>
      <form className="inputs">
        <div className="input">
          <input className="custom-input" type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="input">
          <input className="custom-input" type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </form>
      <div className="submit-container">
        <div className="submit1" onClick={handleSignin}>
          회원가입
        </div>
      </div>
      <div className="divider">
      </div>
      <div className="submit-container">
        <div className="submit2" onClick={() => { window.location.href = '/login'; }}>
          로그인
        </div>
      </div>
      <div className="divider">or</div>
      <div className="login-image">
        <img src='/images/kakao.jpg' className='kakao' width={50} height={50} onClick={handleKakaoButtonClick} ></img>
        <img src='images/naver.jpg' className='naver' width={50} height={50} onClick={handleNaverButtonClick} ></img>
        <img src='images/google.jpg' className='google' width={50} height={50} onClick={handleGoogleButtonClick} ></img>
        <img src='images/apple.jpg' className='apple' width={50} height={50} onClick={handleAppleButtonClick} ></img>
      </div>
    </div>
  );
}

export default Signin;