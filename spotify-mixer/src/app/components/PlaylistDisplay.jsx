"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "./ApiRequest";
import "./PlaylistDisplay.css";

export default function PlaylistDisplay({ refreshKey = 0 }) {
    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                setLoading(true);
                const playlists = await apiRequest('https://api.spotify.com/v1/me/playlists');
                setPlaylist(playlists);
            } catch (err) {
                setError(err);
                console.error("Error fetching playlists:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [refreshKey]); // Se ejecuta cada vez que refreshKey cambia

    return (
        <div className="playlist-container">
            <h2 className="playlist-title">Your Playlists</h2>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading playlists...</p>
                </div>
            ) : playlist ? (
                <div className="playlists-grid">
                    {playlist.items.map((pl) => (
                        <div key={pl.id} className="playlist-card">
                            {pl.images && pl.images[0] && (
                                <img src={pl.images[0].url} alt={pl.name} className="playlist-image" />
                            )}
                            <div className="playlist-info">
                                <h3 className="playlist-name">{pl.name}</h3>
                                <p className="playlist-tracks">{pl.tracks.total} tracks</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="error-message">
                    <p>❌ Error loading playlists: {error.message}</p>
                </div>
            ) : (
                <div className="empty-message">
                    <p>No playlists available</p>
                </div>
            )}
        </div>
    );
}

