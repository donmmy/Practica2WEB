
'use client'

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import PlaylistDisplay from "../components/PlaylistDisplay";
import "./dashboard.css";
import { generatePlaylist } from "../../lib/spotify";

export default function Home() {
    const [filters, setFilters] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

    const handleFiltersChange = async (filters) => {
        setFilters(filters);
        console.log("Filters applied:", filters);
        
       
        const playlist = await generatePlaylist(filters);
        console.log("Playlist created:", playlist);
    };
    
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Spotify Mixer</h1>
            </div>
            
           

            {isCreatingPlaylist && (
                <div className="creating-overlay">
                    <div className="creating-modal">
                        <div className="spinner"></div>
                        <p>Creando tu playlist personalizada...</p>
                    </div>
                </div>
            )}
            
            <div className="search-section">
                <SearchBar onFiltersChange={handleFiltersChange} />
            </div>

            <div className="playlists-section">
                <PlaylistDisplay refreshKey={refreshKey} />
            </div>
        </div>
    )
}