import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Redirect, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "../store";
import Routes from "./Routes";
import AuthUtil from "../utils/AuthUtil";
import UserApi from "../utils/api/UserApi";

const ProtectedRoute = ({ Component, path, roles = [], ...rest }) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      if (!currentUser && AuthUtil.getJWTToken()){ // jwt token in local storage
        setLoading(true);
        const res = await UserApi.getCurrentUser();
         if (res.success) setCurrentUser(res.data);
      }
      setLoading(false)
    }
    asyncFunc();
  }, [])

  useEffect(() => {
    setIsAuthorised(roles && roles.length > 0 && currentUser && roles.includes(currentUser.role));
  }, [currentUser, roles])

  if (loading) return (<div/>);
  else if (!currentUser) return (<Redirect to={Routes.login} />)
  else if (currentUser && !isAuthorised) {
    return (<Redirect to={Routes.apartments} />);
  }
  else if (currentUser && isAuthorised) {
    return (
        <Route path={path} component={Component} {...rest} />
    )
  }
  else {
    return (
      <div>
        Hello
      </div>
    );
  }
};

export default withRouter(ProtectedRoute);
