// src/components/Local-Info/Exchange.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exchange = ({ fromCurrencyCode }) => {
  const [currencyData, setCurrencyData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [amount, setAmount] = useState(1);
  const toCurrencyCode = 'krw';

  useEffect(() => {
    if (fromCurrencyCode) {
      const fromCurrency = fromCurrencyCode.toLowerCase();
      axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrencyCode}.json`)
        .then((response) => {
          // 'date' 속성도 추출하여 상태에 저장합니다.
          setCurrencyData({ [toCurrencyCode]: response.data[toCurrencyCode] });
          setLastUpdated(response.data.date); // 날짜 상태 업데이트
        })
        .catch((error) => {
          console.error("Error fetching currency data", error);
        });
    }
  }, [fromCurrencyCode, toCurrencyCode]);


  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function convertCurrency() {
    const exchangeRate = currencyData[toCurrencyCode];
    if (exchangeRate) {
      const convertedAmount = amount * exchangeRate;
      return convertedAmount.toFixed(2);
    }
    return '0.00';
  }

  return (
    <div className="section-orange">
      <div className="p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">환율 계산기</h2>
        <div className="mt-4">
          <div className="max-w-sm">
            <label htmlFor="amount" className="mr-2">{fromCurrencyCode.toUpperCase()} = </label>
            <input
              id="amount"
              type="number"
              min="0"
              value={amount}
              onChange={handleAmountChange}
              className="border border-gray-400 rounded-md p-2"
            />
          </div>
          <br></br>
          <div className="mt-2">
            {amount} {fromCurrencyCode.toUpperCase()} = <span> {convertCurrency()} KRW </span>
          </div>
          <p className="mt-2">최근 업데이트 : {lastUpdated}</p>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
