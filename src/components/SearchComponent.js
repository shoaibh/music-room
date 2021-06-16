import React, { useEffect, useState } from "react";
import "../assets/scss/search-component.scss";
import SearchResultComponent from "./SearchResultComponent";

const SearchComponent = ({ chooseSong, setSearch, search, setSearchResults,  searchResults}) => {

  useEffect(() => {
    if (!search) return setSearchResults([]);
    let cancel = false;
    fetch(`http://localhost:5000/song/search?searchQuery=${search}`)
      .then((res) => res.json())
      .then((result) => {
        if (cancel) return;
        setSearchResults(result.data);
      });

    return () => (cancel = true);
  }, [search]);
  return (
    <>
      <div>
        <input
          placeholder="search song"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div style={{position: "absolute", minWidth: "100%", top: "77px", left: 0, zIndex: 9}}>
        <div className="search-results">
          {searchResults.map((result) => (
            <SearchResultComponent
              songInfo={result}
              chooseSong={chooseSong}
              key={result.videoId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
