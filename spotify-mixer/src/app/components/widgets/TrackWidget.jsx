"use client";

import { useState } from "react";
import { apiRequest } from "../ApiRequest";

export default function TrackWidget({ onSelect, selectedTrack }) {
    const [tracks, setTracks] = useState([]);

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

    return (
        <div>
            <h2>Track Widget</h2>
            <input type="text" onChange={(e) => fetchTracks(e.target.value)} placeholder="Search tracks..." />
            <select onChange={onSelect} value={selectedTrack}>
                <option value="">Select a track</option>
                {tracks.map((track) => (
                    <option key={track.id} value={track.id}>
                        {track.name} - {track.artists[0]?.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
