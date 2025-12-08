"use client";

export default function DecadeWidget({ onSelect, selectedDecade }) {
    
    return (
        <>
            <h2>Decade Widget</h2>
            <select onChange={onSelect} value={selectedDecade}>
                <option value="">Select a decade</option>
                <option value="1960s">1960s</option>
                <option value="1970s">1970s</option>
                <option value="1980s">1980s</option>
                <option value="1990s">1990s</option>
                <option value="2000s">2000s</option>
                <option value="2010s">2010s</option>
                <option value="2020s">2020s</option>
            </select>
        </>
    );
}