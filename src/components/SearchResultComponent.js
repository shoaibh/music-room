import React from 'react';
import "../assets/scss/search-result-component.scss"

const SearchResultComponent = ({songInfo,chooseSong}) => {
    return (
        <div className="search-result-container" onClick={()=>chooseSong(songInfo)}>
            <img src={songInfo.thumbnail} alt={songInfo.title} style={{height: "54px", width: "54px"}}/>
            <div className="song-detail">
                <div style={{fontSize: "16px"}}>{songInfo.title}</div>
                <div>{songInfo.author?.name}</div>
            </div>
            <div style={{color: "grey"}}>{songInfo.timestamp}</div>
        </div>
    );
};

export default SearchResultComponent;