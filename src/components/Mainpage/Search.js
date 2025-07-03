import React, { useState, useRef, useEffect } from "react";
import "./Search.css";
import locations from "../../data/Location.json";

export const Search = ({ query, setQuery, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(query);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0); // Track selected item index
  const searchRef = useRef(null);

  useEffect(() => {
    // 검색 결과를 다시 계산합니다.
    if (searchTerm) {
      setFilteredDestinations(
        locations.filter((destination) =>
          destination.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]); // searchTerm이 변경될 때마다 실행됩니다.

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredDestinations([]); // 외부 클릭 시 검색 결과창을 숨깁니다.
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setQuery(value);
  };

  const handleInputClick = () => {
    // 검색창을 클릭할 때 이전에 입력한 searchTerm으로 결과를 필터링합니다.
    if (searchTerm) {
      setFilteredDestinations(
        locations.filter((destination) =>
          destination.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleKeyDown = (event) => {
    // Handle arrow key navigation
    if (event.key === "ArrowUp") {
      setSelectedItemIndex((prevIndex) =>
        prevIndex === 0 ? prevIndex : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      setSelectedItemIndex((prevIndex) =>
        prevIndex === filteredDestinations.length - 1
          ? prevIndex
          : prevIndex + 1
      );
    } else if (event.key === "Enter") {
      if (filteredDestinations.length > 0) {
        const destination = filteredDestinations[selectedItemIndex];
        handleDestinationClick(destination);
      }
    }
  };

  const handleDestinationClick = (destination) => {
    setSearchTerm(destination.name);
    setQuery(destination.name);
    onSearch(destination.name);
    setFilteredDestinations([]);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        placeholder="어디로 여행가세요?"
        value={searchTerm}
        onClick={handleInputClick}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} // Handle keydown event
        className="search-input"
      />
      {filteredDestinations.length > 0 && (
        // Inside the return statement of your Search component
      <div className="search-results">
      {filteredDestinations.map((destination, index) => (
        <div
          key={index}
          onClick={() => handleDestinationClick(destination)}
          className={`search-results-item ${
          index === selectedItemIndex ? "selected" : ""
      }`}
      >
      {destination.name}
    </div>
  ))}
</div>

      )}
    </div>
  );
};
