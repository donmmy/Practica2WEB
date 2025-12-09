"use client";

import { useState } from "react";
import "./WidgetsStyle.css";

export default function DecadeWidget({ onSelect, selectedDecades = [] }) {
    const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
    const [selectedList, setSelectedList] = useState(selectedDecades);
    const [customYear, setCustomYear] = useState({ min: "", max: "" });

    const handleToggleDecade = (decade) => {
        let newList;
        if (selectedList.includes(decade)) {
            newList = selectedList.filter(d => d !== decade);
        } else {
            newList = [...selectedList, decade];
        }
        setSelectedList(newList);
        if (onSelect) {
            onSelect({ target: { value: newList, customYear } });
        }
    };

    const handleCustomYearChange = (type, value) => {
        const newCustomYear = { ...customYear, [type]: value };
        setCustomYear(newCustomYear);
        if (onSelect) {
            onSelect({ target: { value: selectedList, customYear: newCustomYear } });
        }
    };

    return (
        <div className="widget">
            <h2>Decade Widget</h2>
            
            {/* Décadas seleccionadas */}
            <div className="selected-items">
                <p className="selected-label">Selected Decades ({selectedList.length}):</p>
                <div className="chips-container">
                    {selectedList.map((decade) => (
                        <div key={decade} className="selected-chip-simple">
                            <span>{decade}</span>
                            <button onClick={() => handleToggleDecade(decade)} className="remove-btn">×</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selector de décadas */}
            <div className="decade-grid">
                {decades.map((decade) => (
                    <div 
                        key={decade} 
                        className={`decade-item ${selectedList.includes(decade) ? 'selected' : ''}`}
                        onClick={() => handleToggleDecade(decade)}
                    >
                        {decade}
                    </div>
                ))}
            </div>

            {/* Rango personalizado */}
            <div className="custom-range">
                <p className="range-label">Custom Year Range:</p>
                <div className="range-inputs">
                    <input 
                        type="number" 
                        placeholder="From" 
                        min="1900" 
                        max="2024"
                        value={customYear.min}
                        onChange={(e) => handleCustomYearChange('min', e.target.value)}
                        className="year-input"
                    />
                    <span className="range-separator">-</span>
                    <input 
                        type="number" 
                        placeholder="To" 
                        min="1900" 
                        max="2024"
                        value={customYear.max}
                        onChange={(e) => handleCustomYearChange('max', e.target.value)}
                        className="year-input"
                    />
                </div>
            </div>
        </div>
    );
}