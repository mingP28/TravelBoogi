// MainSearch.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSearch.css';
import locations from '../../data/Location.json';
import { Search } from './Search'; // Import the Search component
import { BiSearch } from 'react-icons/bi'; // Import the search icon

const MainSearch = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleMapSelectClick = () => {
        navigate('/local'); // 절대 경로로 변경
    }
    const handleSearch = (searchTerm) => {
        const destination = locations.find((d) =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (destination) {
            navigate(`/local?id=${encodeURIComponent(destination.id)}`);
        }else {
            alert("검색어와 정확히 일치하는 결과가 없습니다. 검색어를 확인해주세요.");
        }
    };
    const handleSearchIconClick = () => {
        if(query){
            handleSearch(query);
        }
    };

    return (
        <div className="main-search-container" style={{ backgroundImage: "url('/images/airplane.png')" }}>
            <div className="search">
                <div className="search-map">
                    <Search
                        query={query}
                        setQuery={setQuery}
                        onSearch={handleSearch}
                    />
                    <button className="map-select-button map-select-button-white" onClick={handleMapSelectClick}>
                        &gt; 지도에서 선택하기
                    </button>
                </div>
                <BiSearch className='search-icon map-select-button-white' onClick={handleSearchIconClick} />
            </div>
        </div>
    );
};

export default MainSearch;
