// src/components/Mainpage/Card.js
import React from 'react';
import './Card.css';

const Card = ({ title, description, image}) => {
    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>
            <img src={image} alt={title} className="card-image"/>
            <p className="card-des">{description}</p>
        </div>
    );
};

export default Card;
