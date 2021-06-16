import React, { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent";
import LyricsComponent from "../components/LyricsComponent";
import Player from "../components/Player";
import SongDetailCompoent from "../components/SongDetailCompoent";
import "../assets/scss/audio-player-screen.scss";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import RoomApi from "../utils/api/RoomApi";

const AudioPlayerScreen = () => {
  const [info, setInfo] = useState({});
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [socket, setSocket] = useState();
  const { id } = useParams();

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    const asyncHelper = async () => {
      const roomInfo = await RoomApi.getRoomById(id);
      if (roomInfo.success) {
        fetch(`http://localhost:5000/song/${roomInfo.data.videoId}`)
          .then((res) => res.json())
          .then((result) => {
            setInfo(result.data);
          });
      }
    };

    asyncHelper();
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-change-song", song => {
      setInfo(song);
    });
  }, [socket]);

  useEffect(() => {
    if (socket == null) return

    socket.once("load-room", id => {
      console.log(id)
    })

    socket.emit("get-room", id)
  }, [socket, id])

  const chooseSong = async (song) => {
    if (socket == null) return;
    const roomInfo = await RoomApi.updateSong({
      videoId: song.videoId,
      roomId: id,
    });
    if (roomInfo.success) {
      socket.emit("change-song", song);
      setInfo(song);
      setSearchResults([]);
    }
  };
  return (
    <div className="screen-container">
      <SearchComponent
        chooseSong={chooseSong}
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <LyricsComponent />
      <Player videoId={info?.videoId} />
      <SongDetailCompoent info={info} />
    </div>
  );
};

export default AudioPlayerScreen;
