import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./App.css";
import React, { useEffect, useState } from "react";
import AudioPlayerScreen from "./screens/AudioPlayerScreen";
import LoginContainer from "./screens/LoginContainer";
import SignUpContainer from "./screens/SignUpContainer";
import RoomScreen from "./screens/RoomScreen";
import { useAtom } from "jotai";
import { currentUserAtom } from "./store";
import AuthUtil from "./utils/AuthUtil";
import UserApi from "./utils/api/UserApi";

export const history = createBrowserHistory();

function App() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setShowProfile(true);
      return
    }
    const asyncHelper = async () => {
      if (AuthUtil.getJWTToken()) {
        const msg = await UserApi.getCurrentUser();
        if (msg.success) {
          setCurrentUser({ ...msg.data });
          setShowProfile(true);
        }
        else{
          history.replace('/login')
        }
      }
    };
    asyncHelper();
  }, []);

  const onLogOut = () => {
    const asyncHelper = async () => {
      const msg = await UserApi.logoutUser();
      if (!msg.success) {
        return;
      }
      setCurrentUser(null);
      AuthUtil.clearJWTToken();
      history.replace('/login');
    };

    asyncHelper();
  };

  return (
    <div className="App">
      {showProfile && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              backgroundColor: "pink",
              maxWidth: "50px",
              width: "100%",
              padding: "10px",
              fontSize: "20px",
              borderRadius: "50%",
              position: "fixed",
              top: "20px",
              marginLeft: "10px",
              cursor: "pointer",
              zIndex: "999"
            }}
            onClick={() => setShowLogout(!showLogout)}
          >
            {currentUser?.name.slice(0,1)}
          </div>
          {showLogout && (
            <div
              style={{
                position: "absolute",
                border: "1px solid black",
                backgroundColor: "white",
                padding: "5px 10px",
                top: "50px",
                left: " 45px",
                cursor: "pointer",
                zIndex: "1000"
              }}
              onClick={onLogOut}
            >
              Logout
            </div>
          )}
        </div>
      )}
      <Layout className="layout">
        <Router history={history}>
          <div>
            <Switch>
              <Route path={"/login"} component={LoginContainer} />
              <Route path={"/signup"} component={SignUpContainer} />
              <Route path={"/room/:id"} component={AudioPlayerScreen} />
              <Route path={"/rooms"} component={RoomScreen} />
              <Route component={LoginContainer} />
            </Switch>
          </div>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
