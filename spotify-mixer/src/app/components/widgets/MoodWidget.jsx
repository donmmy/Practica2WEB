"use client";

import { useState } from "react";
import "./WidgetsStyle.css";

export default function MoodWidget({ onSelect, selectedMood = {} }) {
    const [mood, setMood] = useState({
        energy: selectedMood.energy || 50,
        valence: selectedMood.valence || 50,
        danceability: selectedMood.danceability || 50,
        acousticness: selectedMood.acousticness || 50
    });

    const [presetMood, setPresetMood] = useState("");

    const moodPresets = {
        happy: { energy: 70, valence: 80, danceability: 70, acousticness: 30 },
        sad: { energy: 30, valence: 20, danceability: 30, acousticness: 60 },
        energetic: { energy: 90, valence: 70, danceability: 85, acousticness: 10 },
        calm: { energy: 20, valence: 50, danceability: 20, acousticness: 80 },
        party: { energy: 95, valence: 85, danceability: 95, acousticness: 5 },
        romantic: { energy: 40, valence: 70, danceability: 50, acousticness: 50 }
    };

    const handleSliderChange = (attribute, value) => {
        const newMood = { ...mood, [attribute]: parseInt(value) };
        setMood(newMood);
        setPresetMood(""); // Reset preset si se mueve un slider
        if (onSelect) {
            onSelect({ target: { value: newMood } });
        }
    };

    const handlePresetChange = (preset) => {
        if (preset && moodPresets[preset]) {
            setMood(moodPresets[preset]);
            setPresetMood(preset);
            if (onSelect) {
                onSelect({ target: { value: moodPresets[preset] } });
            }
        }
    };

    return (
        <div className="widget">
            <h2>Mood Widget</h2>
            
            {/* Presets de mood */}
            <div className="mood-presets">
                <label>Quick Mood:</label>
                <select 
                    value={presetMood} 
                    onChange={(e) => handlePresetChange(e.target.value)}
                    className="mood-select"
                >
                    <option value="">Custom</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="energetic">Energetic</option>
                    <option value="calm">Calm</option>
                    <option value="party">Party</option>
                    <option value="romantic">Romantic</option>
                </select>
            </div>

            {/* Sliders */}
            <div className="mood-sliders">
                <div className="slider-container">
                    <label>Energy: {mood.energy}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={mood.energy}
                        onChange={(e) => handleSliderChange('energy', e.target.value)}
                        className="mood-slider"
                    />
                </div>

                <div className="slider-container">
                    <label>Valence (Happiness): {mood.valence}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={mood.valence}
                        onChange={(e) => handleSliderChange('valence', e.target.value)}
                        className="mood-slider"
                    />
                </div>

                <div className="slider-container">
                    <label>Danceability: {mood.danceability}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={mood.danceability}
                        onChange={(e) => handleSliderChange('danceability', e.target.value)}
                        className="mood-slider"
                    />
                </div>

                <div className="slider-container">
                    <label>Acousticness: {mood.acousticness}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={mood.acousticness}
                        onChange={(e) => handleSliderChange('acousticness', e.target.value)}
                        className="mood-slider"
                    />
                </div>
            </div>
        </div>
    );
}
