
'use client'

import { useState } from "react";
import ArtistWidget from "../components/widgets/ArtistWidget";
import TrackWidget from "../components/widgets/TrackWidget";
import PopularityWidget from "../components/widgets/PopularityWidget";

export default function Home() {
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedPopularity, setSelectedPopularity] = useState(null);
    
    return (
        <div>
            <ArtistWidget onSelect={setSelectedArtist} selectedArtist={selectedArtist}/>
            <TrackWidget onSelect={setSelectedTrack} selectedTrack={selectedTrack}/>
            <PopularityWidget onSelect={setSelectedPopularity} selectedPopularity={selectedPopularity}/>
        </div>
    )
}