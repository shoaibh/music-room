class AuthUtil {
  static currentUser;

  static getHeaders() {
    return {
      jwttoken: this.getJWTToken(),
    };
  }

  static getJWTToken() {
    return this.jwtToken || localStorage.getItem("jwtToken");
  }
  static clearJWTToken() {
    this.jwtToken = null;
    localStorage.setItem("jwtToken", "");
    this.currentUser = null;
  }

  static setJWTToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem("jwtToken", jwtToken);
  }


  static jwtToken = "";
}

export default AuthUtil;
