"use client";

import { useState, useEffect } from "react";
import { saveTokens } from "@/lib/auth";

export default function PlaylistDisplay() {
    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                setLoading(true);

                const token = await fetch('/api/spotify-token').then(res => res.json());
                const response = await fetch('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        'Authorization': `Bearer ${token.access_token}`
                    }
                });
                const playlists = await response.json();
                setPlaylist(playlists);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading playlist...</p>
            ) : playlist ? (
                <ul>
                    {playlist.items.map((pl) => (
                        <li key={pl.id}>{pl.name}</li>
                    ))}
                </ul>
            ) : error ? (
                <p>Error loading playlist: {error.message}</p>
            ) : (
                <p>No hay playlists para mostrar.</p>
            )}
        </div>
    );
}


