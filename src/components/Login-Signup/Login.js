//src/components/Login-Signup/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleHomeClick = () => {
        navigate('/'); // 절대 경로로 변경
  };
  const handleLogin = () => {
    // 저장된 사용자 목록 가져오기
    //아래의 두 줄의 코드를 개발자 모드 console에 입력하면 회원가입 데이터 볼 수 있음
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    console.log(userList);

    // 입력한 아이디와 비밀번호와 일치하는 사용자 찾기
    const user = userList.find((user) => user.userId === id && user.userPassword === password);
  
    // 로그인 성공 시 Main으로 이동
    if (user) {
      navigate('/');
    } else {
      alert('로그인 정보가 일치하지 않습니다.');
    }
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

  return (
    <div className="container">
      <div className="header">
          <img src='/images/logo.png' alt="부기의 i들" className="logo" onClick={handleHomeClick} />
        <div className="text">LOGIN</div>

      </div>
      <div className="inputs">
        <div className="input">
          <input className="custom-input" placeholder="ID" type="text" value={id}
            onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="input">
          <input className="custom-input" placeholder="PASSWORD" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit1" onClick={handleLogin}>
          로그인
        </div>
      </div>
      <div className="submit-container">
        <div className="submit2" onClick={() => { window.location.href = '/signin'; }}>
          아직 회원이 아니신가요? 회원가입
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

export default Login;

