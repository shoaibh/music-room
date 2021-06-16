import React, {useEffect, useMemo, useState} from "react";
import RoomApi from "../utils/api/RoomApi";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import "../assets/scss/room-screen.scss";
import {useAtom} from "jotai";
import {currentUserAtom} from "../store";

const RoomScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [socket, setSocket] = useState();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    const asyncHelper = async () => {
      const roomInfo = await RoomApi.getAllRooms();
      if (roomInfo.success) {
        const reverseData = roomInfo.data.reverse();
        setRooms((rooms) => [...reverseData]);
      }
    };
    asyncHelper();
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);



  useEffect(() => {
    if (socket == null) return;
    socket.on("refresh", async () => {
      const roomInfo = await RoomApi.getAllRooms();
      if (roomInfo.success) {
        const reverseData = roomInfo.data.reverse();

        setRooms((rooms) => [...reverseData]);
      }
    });
  }, [socket]);

  const onCreateRoom = async (e) => {
    e.preventDefault();
    const room = await RoomApi.create({ name });
    if (room.success) {
      socket.emit("refresh-rooms");
      const roomInfo = await RoomApi.getAllRooms();
      if (roomInfo.success) {
        const reverseData = roomInfo.data.reverse();
        setRooms((rooms) => [...reverseData]);
      }
    }
  };
  return (
    <div style={{paddingTop: "20px"}}>
     <div style={{display: "flex", justifyContent: 'space-around'}}> <img src={'/img/search.png'} height='30px' width='30px' style={{marginLeft: "25px"}}/><h2>{currentUser?.name.toUpperCase()}'s Rooms</h2><img src={'/img/notification.png'} height='30px' width='30px' style={{marginRight: "25px"}}/></div>
      <div className="create-room">{show ? (
        <div className="form">
          <form onSubmit={onCreateRoom}>
            <h2>Create new Room</h2>
            <input
              name="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type={"submit"} className="plus">+</button>
            <button onClick={()=>setShow(false)} className="cross">X</button>

          </form>
        </div>
      ) : (
        <button onClick={setShow} className="create">Create Room +</button>
      )}
      </div>
      <div>
        {rooms.map((r) => {
          return (
            <div
              style={{
                maxWidth: "70%",
                width: "100%",
                margin: "auto",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "0 20px"
              }}
            >
              <Link to={`/room/${r.id}`}>
                <div className="room">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="author">Harshit's</div>
                    <img
                      src={"img/song-album.png"}
                      height="24px"
                      width="24px"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div className="name">{r.name}</div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {" "}
                      <img
                        src={"img/people.png"}
                        height="18px"
                        width="18px"
                      />{" "}
                      <p style={{ marginTop: "12px", marginLeft: "5px" }}>25</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={"img/album.png"} height="18px" width="18px" />
                      <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                        Song
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomScreen;
