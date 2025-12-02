
import { useState, useEffect } from "react";

export default function PlaylistDisplay() {

    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch('/me/playlist');
                const data = await response.json();
                setPlaylist(data => data.name, data.description, data.id);
            } catch (error) {
                setError(error);
            }
        };
        fetchPlaylist();
    }, []);

    return (

        <div>
            <h1>{playlist.name}</h1>
            <p>{playlist.description}</p>
            <p>{playlist.id}</p>
        </div>
    )
}


