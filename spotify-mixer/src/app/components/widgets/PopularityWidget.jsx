"use client";

export default function PopularityWidget({ onSelect, selectedPopularity }) {
   
    return (
        <div>
            <h2>Popularity Widget</h2>
            <select onChange={onSelect} value={selectedPopularity}>
                <option value="">Select a popularity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </div>
    );
}