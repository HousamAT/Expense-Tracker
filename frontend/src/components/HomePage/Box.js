// Box.js
import React from 'react';
import './Box.css';
import { FaDollarSign } from 'react-icons/fa';

const Box = ({ color, title, large }) => {
    return (
        <div className={`box ${large ? 'large' : ''}`} style={{ backgroundColor: color }}>
            <FaDollarSign className="icon" />
            <h3>{title}</h3>
        </div>
    );
};

export default Box;
