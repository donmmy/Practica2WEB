"use client";

import { useState } from "react";
import { apiRequest } from "../ApiRequest";

export default function ArtistWidget({ onSelect, selectedArtist }) {
    const [artists, setArtists] = useState([]);

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
    return (
        <div>
            <h2>Artist Widget</h2>
            <input type="text" onChange={(e) => fetchArtists(e.target.value)} />
            <select onChange={onSelect} value={selectedArtist}>
                <option value="">Select an artist</option>
                {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                        {artist.name}
                    </option>
                ))}
            </select>
        </div>
    );
}