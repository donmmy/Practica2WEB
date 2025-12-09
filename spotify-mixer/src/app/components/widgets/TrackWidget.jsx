"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "../ApiRequest";
import "./WidgetsStyle.css";

export default function TrackWidget({ onSelect, selectedTracks = [] }) {
    const [tracks, setTracks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedList, setSelectedList] = useState(selectedTracks);

    // Debouncing para búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                fetchTracks(searchQuery);
            } else {
                setTracks([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchTracks = async (query) => {
        if (!query) {
            setTracks([]);
            return;
        }
        try {
            const response = await apiRequest(`https://api.spotify.com/v1/search?type=track&q=${query}`);
            setTracks(response.tracks.items || []);
        } catch (error) {
            console.error("Error fetching tracks:", error);
            setTracks([]);
        }
    };

    const handleAddTrack = (track) => {
        if (selectedList.find(t => t.id === track.id)) {
            return; // Ya está seleccionado
        }
        const newList = [...selectedList, track];
        setSelectedList(newList);
        if (onSelect) {
            onSelect({ target: { value: newList } });
        }
    };

    const handleRemoveTrack = (trackId) => {
        const newList = selectedList.filter(t => t.id !== trackId);
        setSelectedList(newList);
        if (onSelect) {
            onSelect({ target: { value: newList } });
        }
    };

    return (
        <div className="widget">
            <h2>Track Widget</h2>
            <input 
                type="text" 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search tracks..." 
                value={searchQuery}
            />

            {/* Lista de tracks buscados */}
            {tracks.length > 0 && (
                <div className="search-results">
                    {tracks.slice(0, 5).map((track) => (
                        <div key={track.id} className="track-result" onClick={() => handleAddTrack(track)}>
                            {track.album.images && track.album.images[0] && (
                                <img src={track.album.images[0].url} alt={track.name} className="track-image-small" />
                            )}
                            <div className="track-info">
                                <span className="track-name">{track.name}</span>
                                <span className="track-artist">{track.artists[0]?.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tracks seleccionados */}
            <div className="selected-items">
                <p className="selected-label">Selected ({selectedList.length}):</p>
                {selectedList.map((track) => (
                    <div key={track.id} className="selected-chip">
                        {track.album.images && track.album.images[0] && (
                            <img src={track.album.images[0].url} alt={track.name} className="chip-image" />
                        )}
                        <div className="chip-info">
                            <span className="chip-name">{track.name}</span>
                            <span className="chip-artist">{track.artists[0]?.name}</span>
                        </div>
                        <button onClick={() => handleRemoveTrack(track.id)} className="remove-btn">×</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
