import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs'; // Make sure to install dayjs with `npm install dayjs`
import './Calendar.css'; // ScheduleDate.css 파일을 import
import Header from '../Mainpage/Header';

function Calendar() {
    // 선택된 시작 날짜와 끝 날짜 상태를 저장
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        if (location.state && location.state.cityName) {
            setCityName(location.state.cityName);
        }
    }, [location.state]);

    const goBack = () => {
        navigate(-1);
    };

    const handleConfirm = () => {
        // Pass the selected date range to Timetable.js
        console.log("Selected cityName:", cityName);
        navigate("/timetable", { state: { startDate, endDate, cityName } });
    };

    const dateDisplayStyle = {
        marginBottom: '20px',
        padding: '10px',
        background: '#f7f7f7',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const dateInfoStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
        marginTop: '10px',
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: '50px',
        //fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    };

    const titleStyle = {
        color: '#2c3e50',
        letterSpacing: '1px',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    };

    // 날짜 포맷과 차이를 계산하는 함수
    const formatDateRangeAndDifference = (start, end) => {
        if (start && end) {
            const formattedStartDate = dayjs(start).format('YYYY.MM.DD');
            const formattedEndDate = dayjs(end).format('YYYY.MM.DD');
            // dayjs를 사용하여 시작 날짜와 끝 날짜 사이의 차이를 '일' 단위로 계산
            const differenceInDays = dayjs(end).diff(dayjs(start), 'day') + 1; // 시작하는 날도 포함하여 계산
            return (
                <>
                    {`${formattedStartDate} ~ ${formattedEndDate}`}
                    <br />
                    <div style={dateInfoStyle}>
                        {`총 ${differenceInDays}일`}
                    </div>
                </>
            );
        }
        return '여행 기간을 선택하세요';
    };

    return (
        <div className="cal-page">
            <Header />
            <div className="calendar"  style={containerStyle}>
            <h1 className="title11" style={titleStyle}>Schedule Your Trip</h1>
            {cityName && <h1 className="title22" style={titleStyle}>To <span style={{color: '#1f73c7'}}>{cityName}</span></h1>}
            <div style={dateDisplayStyle}>
                {formatDateRangeAndDifference(startDate, endDate)}
            </div>
            <DatePicker
                inline
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                monthsShown={2} // 동시에 보여질 달력의 개수를 2개로 설정
                onChange={(dates) => {
                    const [start, end] = dates;
                    console.log("DatePicker onChange start : ", start, "end : ",end);
                    setStartDate(start);
                    setEndDate(end);
                }}
                minDate={new Date(2023, 0, 1)} // JavaScript의 월은 0부터 시작합니다: 0 = 1월
                maxDate={new Date(2100, 11, 31)} // 2100년 12월 31일까지 선택 가능
            />
            <div className = "button-calendar">
                <button onClick={handleConfirm} className="button-confirm">확인</button>
                <div onClick={goBack} className= "button-cancel2">취소</div>
            </div>
            </div>
        </div>
    );
}


export default Calendar;