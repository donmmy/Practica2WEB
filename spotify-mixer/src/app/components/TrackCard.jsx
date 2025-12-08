"use client";

import { useState } from "react";

export default function TrackCard({name, artist, album, image}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    return (
        <>
            <h2 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{name}</h2>
            <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{artist}</p>
            <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{album}</p>
            <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} src={image} alt={name} />
        </>
    );
}