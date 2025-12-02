'use client'
import { useState } from "react";
import PlaylistDisplay from "../components/PlaylistDisplay.jsx";

export default function Home() {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div>
            {activeTab === 'playlist' && <PlaylistDisplay />}
        </div>
    )
}