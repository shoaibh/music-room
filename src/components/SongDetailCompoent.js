import React from "react";
import "../assets/scss/song-detail-component.scss"

const SongDetailCompoent = ({ info }) => {
  if(!info || info === undefined) return <div>No details</div>
  return (
    <div className="song-details">
      <img src={info.thumbnail} alt={info.title} style={{height: "54px", width: "54px"}}/>
      <div className="author-details">
      <div style={{fontSize: "16px"}}>{info.title}</div>
      <div >Channel : {info.author?.name}</div>
      </div>
    </div>
  );
};

export default SongDetailCompoent;
