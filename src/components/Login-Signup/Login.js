//src/components/Login-Signup/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="container">
      <div className="header">
        <div className="text">LOGIN</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input className="custom-input" type="text" placeholder="ID" value={id}
            onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="input">
          <input className="custom-input" type="password" placeholder="PASSWORD" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit1" onClick={handleLogin}>
          로그인
        </div>
      </div>
      <div className="divider">
        <span>---------------또는---------------</span>
      </div>
      <div className="submit-container">
        <div className="submit2" onClick={() => { window.location.href = '/signin'; }}>
          회원가입
        </div>
      </div>
    </div>
  );
}

export default Login;

