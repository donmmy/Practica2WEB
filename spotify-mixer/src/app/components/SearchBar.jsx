"use client";

import { useState } from "react";
import ArtistWidget from "./widgets/ArtistWidget";
import TrackWidget from "./widgets/TrackWidget";
import PopularityWidget from "./widgets/PopularityWidget";
import DecadeWidget from "./widgets/DecadeWidget";
import GenreWidget from "./widgets/GenreWidget";
import MoodWidget from "./widgets/MoodWidget";
import "./SearchBar.css";


export default function SearchBar({ onFiltersChange }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedPopularity, setSelectedPopularity] = useState([0, 100]);
    const [selectedDecades, setSelectedDecades] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedMood, setSelectedMood] = useState({});

    const handleSearchClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleApplyFilters = () => {
        if (onFiltersChange) {
            onFiltersChange({
                artists: selectedArtists,
                tracks: selectedTracks,
                popularity: selectedPopularity,
                decades: selectedDecades,
                genres: selectedGenres,
                mood: selectedMood
            });
        }
    };

    const handleClearAll = () => {
        setSelectedArtists([]);
        setSelectedTracks([]);
        setSelectedPopularity([0, 100]);
        setSelectedDecades([]);
        setSelectedGenres([]);
        setSelectedMood([]);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar" onClick={handleSearchClick}>
                <input 
                    type="text" 
                    placeholder="Mixer Widgets" 
                    readOnly
                    className="search-input"
                />
            </div>

            {isExpanded && (
                <div className="widgets-expanded">
                    <div className="widgets-grid">
                        <ArtistWidget 
                            onSelect={(e) => setSelectedArtists(e.target.value)} 
                            selectedArtists={selectedArtists}
                        />
                        <TrackWidget 
                            onSelect={(e) => setSelectedTracks(e.target.value)} 
                            selectedTracks={selectedTracks}
                        />
                        <GenreWidget 
                            onSelect={(e) => setSelectedGenres(e.target.value)} 
                            selectedGenres={selectedGenres}
                        />
                        <DecadeWidget 
                            onSelect={(e) => setSelectedDecades(e.target.value)} 
                            selectedDecades={selectedDecades}
                        />
                        <MoodWidget 
                            onSelect={(e) => setSelectedMood(e.target.value)} 
                            selectedMood={selectedMood}
                        />
                        <PopularityWidget 
                            onSelect={(e) => setSelectedPopularity(e.target.value)} 
                            selectedPopularity={selectedPopularity}
                        />
                    </div>
                    <div className="search-actions">
                        <button className="apply-button" onClick={handleApplyFilters}>
                            Apply Filters
                        </button>
                        <button className="clear-button" onClick={handleClearAll}>
                            Clear All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
