"use client";

import { useState } from "react";
import "./WidgetsStyle.css";

export default function PopularityWidget({ onSelect, selectedPopularity = 50 }) {
    const [popularity, setPopularity] = useState(selectedPopularity);
    const [category, setCategory] = useState(getCategory(selectedPopularity));

    function getCategory(value) {
        if (value >= 80) return "mainstream";
        if (value >= 50) return "popular";
        return "underground";
    }

    function getCategoryRange(cat) {
        switch(cat) {
            case "mainstream": return [80, 100];
            case "popular": return [50, 80];
            case "underground": return [0, 50];
            default: return [0, 100];
        }
    }

    function getValueAsRange(value) {
        // Convert single value to a range based on the current category
        const cat = getCategory(value);
        return getCategoryRange(cat);
    }

    const handleSliderChange = (value) => {
        const intValue = parseInt(value);
        setPopularity(intValue);
        setCategory(getCategory(intValue));
        if (onSelect) {
            onSelect({ target: { value: getValueAsRange(intValue) } });
        }
    };

    const handleCategoryChange = (cat) => {
        setCategory(cat);
        const range = getCategoryRange(cat);
        const value = range[0] + (range[1] - range[0]) / 2; // Set to middle of range
        setPopularity(value);
        if (onSelect) {
            onSelect({ target: { value: range } });
        }
    };

    return (
        <div className="widget">
            <h2>Popularity Widget</h2>
            
            {/* Categorías preestablecidas */}
            <div className="popularity-categories">
                <button 
                    className={`category-btn ${category === 'underground' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('underground')}
                >
                    Underground<br/><span className="range-text">(0-50)</span>
                </button>
                <button 
                    className={`category-btn ${category === 'popular' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('popular')}
                >
                    Popular<br/><span className="range-text">(50-80)</span>
                </button>
                <button 
                    className={`category-btn ${category === 'mainstream' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('mainstream')}
                >
                    Mainstream<br/><span className="range-text">(80-100)</span>
                </button>
            </div>

            {/* Slider de popularidad */}
            <div className="slider-container">
                <label>Custom Popularity: {popularity}</label>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={popularity}
                    onChange={(e) => handleSliderChange(e.target.value)}
                    className="popularity-slider"
                />
                <div className="slider-labels">
                    <span>Hidden Gems</span>
                    <span>Billboard Hits</span>
                </div>
            </div>
        </div>
    );
}