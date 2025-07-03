import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import locations from '../../data/Location.json';
import './Local-List.css';

const Local_List = () => {
    const [favorites, setFavorites] = useState({});
    const navigate = useNavigate();

    // 로컬 스토리지에서 즐겨찾기 정보를 불러옵니다.
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleFavorite = (id, e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        const updatedFavorites = {
            ...favorites,
            [id]: !favorites[id]
        };
        setFavorites(updatedFavorites);
        // 로컬 스토리지에 변경된 즐겨찾기 정보를 저장합니다.
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleImageClick = (id) => {
        navigate(`/local?id=${id}`);
    };

    return (
        <div className="list-container">
            {locations.map((city) => (
                <div className="list-items" key={city.id}>
                    <img
                        src={city.image}
                        alt={city.id}
                        className="list-image"
                        onClick={() => handleImageClick(city.id)}
                    />
                    <div
                        className="image-description"
                        onClick={() => handleImageClick(city.id)} // image-description을 클릭해도 handleImageClick이 호출되도록 함
                    >
                        {city.description}
                    </div>
                    <FaHeart
                        className={`heart-icon ${favorites[city.id] ? 'favorite' : ''}`}
                        onClick={(e) => toggleFavorite(city.id, e)}
                    />
                    <h2 className="list-title-eng">{city.id}</h2>
                    <p className="list-title-kor">{city.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Local_List;
