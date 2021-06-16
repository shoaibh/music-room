import API from "./API";
import AuthUtil from "../AuthUtil";

const userURL = `${process.env.REACT_APP_BASE_URL}/room`;

class RoomApi {
  static async create({ name }) {
    return await API.post({ url: `${userURL}/create`, data: { name } });
  }

  static async getRoomById(id) {
    return await API.get({
      url: `${userURL}/${id}`,
      headers: AuthUtil.getHeaders(),
    });
  }

  static async getAllRooms() {
    return await API.get({ url: `${userURL}`, headers: AuthUtil.getHeaders() });
  }

  static async joinRoom(id) {
    return await API.post({
      url: `${userURL}/join/${id}`,
      headers: AuthUtil.getHeaders(),
    });
  }

  static async leaveRoom(id) {
    return await API.post({
      url: `${userURL}/leave/${id}`,
      headers: AuthUtil.getHeaders(),
    });
  }

  static async updateSong({ roomId, videoId }) {
    return await API.put({
      url: `${userURL}/update/${roomId}`,
      headers: AuthUtil.getHeaders(),
      data: { videoId },
    });
  }
}

export default RoomApi;
