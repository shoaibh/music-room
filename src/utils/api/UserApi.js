import API from "./API";
import AuthUtil from "../AuthUtil";


const userURL = `${process.env.REACT_APP_BASE_URL}/user`

class UserApi{
  static async login({email,password}) {
    return  await API.post({url:`${userURL}/login`,data: {email,password}})

  }
  static async signup({name, email, password}){
    return await API.post({url: `${userURL}/signup`,data: {name,email,password}})
  }

  static async createUserWithRole({name, email, password}){
    return await API.post({url: `${userURL}`,data: {name,email,password}, headers: AuthUtil.getHeaders()})
  }

  static async getCurrentUser(){
    return await API.get({url: `${userURL}/details`, headers: AuthUtil.getHeaders()})
  }
  static async getUserById(id){
    return await API.get({url: `${userURL}/${id}`, headers: AuthUtil.getHeaders()})
  }

  static async getAllUsers(filteredParams){
    return await API.get({url: `${userURL}`, headers: AuthUtil.getHeaders(), queryParams: filteredParams})
  }

  static async logoutUser(){
    return await API.post({url: `${userURL}/logout`, headers: AuthUtil.getHeaders()})
  }

  static async updateUser(id,{name, email, role, password}){
    return await API.put({url: `${userURL}/${id}`,data: {name,email,role,password}, headers: AuthUtil.getHeaders()})
  }

  static async deleteUser(id){
    return await API.delete({url:`${userURL}/${id}`,headers: AuthUtil.getHeaders()})
  }
}

export default UserApi