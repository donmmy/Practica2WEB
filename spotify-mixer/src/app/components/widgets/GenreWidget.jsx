"use client";

import { useState } from "react";
import "./WidgetsStyle.css";

export default function GenreWidget({ onSelect, selectedGenres = [] }) {
    const allGenres = [ 'acoustic', 'afrobeat', 'alt-rock', 'alternative',
         'ambient', 'anime', 'black-metal', 'bluegrass', 'blues',
          'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop',
           'chicago-house', 'children', 'chill', 'classical', 'club',
            'comedy', 'country', 'dance', 'dancehall', 'death-metal',
             'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass',
              'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk',
               'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth',
                'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock',
                 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm',
                  'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance',
                   'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin',
                    'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore',
                     'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release',
                      'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop',
                       'pop-film', 'post-dubstep', 'power-pop', 'progressive-house',
                        'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day',
                         'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll',
                          'rockabilly', 'romance', 'sad', 'salsa', 'samba',
                           'sertanejo', 'show-tunes', 'singer-songwriter',
                            'ska', 'sleep', 'songwriter', 'soul', 'soundtracks',
                             'spanish', 'study', 'summer', 'swedish',
                              'synth-pop', 'tango', 'techno', 'trance',
                               'trip-hop', 'turkish', 'work-out', 'world-music' ];
    
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedList, setSelectedList] = useState(selectedGenres);

    const filteredGenres = allGenres.filter(genre => 
        genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleGenre = (genre) => {
        let newList;
        if (selectedList.includes(genre)) {
            newList = selectedList.filter(g => g !== genre);
        } else {
            if (selectedList.length >= 5) {
                alert("Maximum 5 genres allowed");
                return;
            }
            newList = [...selectedList, genre];
        }
        setSelectedList(newList);
        if (onSelect) {
            onSelect({ target: { value: newList } });
        }
    };

    return (
        <div className="widget">
            <h2>Genre Widget</h2>
            <input 
                type="text" 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Filter genres..." 
                value={searchQuery}
            />

            {/* Géneros seleccionados */}
            <div className="selected-items">
                <p className="selected-label">Selected ({selectedList.length}/5):</p>
                <div className="chips-container">
                    {selectedList.map((genre) => (
                        <div key={genre} className="selected-chip-simple">
                            <span>{genre}</span>
                            <button onClick={() => handleToggleGenre(genre)} className="remove-btn">×</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lista de géneros disponibles */}
            <div className="genre-list">
                {filteredGenres.slice(0, 20).map((genre) => (
                    <div 
                        key={genre} 
                        className={`genre-item ${selectedList.includes(genre) ? 'selected' : ''}`}
                        onClick={() => handleToggleGenre(genre)}
                    >
                        {genre}
                    </div>
                ))}
                {filteredGenres.length > 20 && (
                    <p className="more-results">+{filteredGenres.length - 20} more genres...</p>
                )}
            </div>
        </div>
    );
}