//server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// JSON 데이터 파싱
app.use(bodyParser.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0215',
  database: 'signup',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('MySQL 데이터베이스에 연결되었습니다');
});

// CORS 설정
app.use(cors());

// 사용자 등록을 처리하는 API 엔드포인트
app.post('/api/register', (req, res) => {
  const { id, password } = req.body;

  const sql = 'INSERT INTO users (userId, userPassword) VALUES (?, ?)';
  db.query(sql, [id, password], (err, result) => {
    if (err) {
      console.error('데이터 삽입 오류: ' + err.stack);
      res.status(500).send('데이터베이스에 데이터를 삽입하는 중 오류가 발생했습니다');
      return;
    }
    console.log('사용자 등록 성공');
    res.status(200).send('사용자 등록이 성공적으로 완료되었습니다');
  });
});

// 사용자 로그인을 처리하는 API 엔드포인트
app.post('/api/login', (req, res) => {
  const { id, password } = req.body;

  const sql = 'SELECT * FROM users WHERE userId = ? AND userPassword = ?';
  db.query(sql, [id, password], (err, result) => {
    if (err) {
      console.error('데이터 조회 오류: ' + err.stack);
      res.status(500).send('데이터베이스에서 데이터를 조회하는 중 오류가 발생했습니다');
      return;
    }

    if (result.length > 0) {
      // 로그인 성공
      console.log('로그인 성공');
      res.status(200).send('로그인이 성공적으로 완료되었습니다');
    } else {
      // 로그인 실패
      console.log('로그인 실패');
      res.status(401).send('로그인 정보가 일치하지 않습니다');
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다`);
});

