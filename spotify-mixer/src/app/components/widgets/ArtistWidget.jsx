"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "../ApiRequest";
import "./WidgetsStyle.css";

export default function ArtistWidget({ onSelect, selectedArtists = [] }) {
    const [artists, setArtists] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedList, setSelectedList] = useState(selectedArtists);

    // Debouncing para búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                fetchArtists(searchQuery);
            } else {
                setArtists([]);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchArtists = async (query) => {
        if (!query) {
            setArtists([]);
            return;
        }
        try {
            const response = await apiRequest(`https://api.spotify.com/v1/search?type=artist&q=${query}`);
            setArtists(response.artists.items || []);
        } catch (error) {
            console.error("Error fetching artists:", error);
            setArtists([]);
        }
    };

    const handleAddArtist = (artist) => {
        if (selectedList.length >= 5) {
            alert("Maximum 5 artists allowed");
            return;
        }
        if (selectedList.find(a => a.id === artist.id)) {
            return; // Ya está seleccionado
        }
        const newList = [...selectedList, artist];
        setSelectedList(newList);
        if (onSelect) {
            onSelect({ target: { value: newList } });
        }
    };

    const handleRemoveArtist = (artistId) => {
        const newList = selectedList.filter(a => a.id !== artistId);
        setSelectedList(newList);
        if (onSelect) {
            onSelect({ target: { value: newList } });
        }
    };

    return (
        <div className="widget">
            <h2>Artist Widget</h2>
            <input 
                type="text" 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search artists..." 
                value={searchQuery}
            />
            
            {/* Lista de artistas buscados */}
            {artists.length > 0 && (
                <div className="search-results">
                    {artists.slice(0, 5).map((artist) => (
                        <div key={artist.id} className="artist-result" onClick={() => handleAddArtist(artist)}>
                            {artist.images && artist.images[0] && (
                                <img src={artist.images[0].url} alt={artist.name} className="artist-image-small" />
                            )}
                            <span>{artist.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Artistas seleccionados */}
            <div className="selected-items">
                <p className="selected-label">Selected ({selectedList.length}/5):</p>
                {selectedList.map((artist) => (
                    <div key={artist.id} className="selected-chip">
                        {artist.images && artist.images[0] && (
                            <img src={artist.images[0].url} alt={artist.name} className="chip-image" />
                        )}
                        <span>{artist.name}</span>
                        <button onClick={() => handleRemoveArtist(artist.id)} className="remove-btn">×</button>
                    </div>
                ))}
            </div>
        </div>
    );
}