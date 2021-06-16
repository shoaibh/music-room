import {Button, Col, Row} from "antd";
import React, {useEffect, useState} from "react";
import InputComponent from "../components/input/InputComonent";
import InputErrorComponent from "../components/input/InputErrorComponent";
import {Link} from "react-router-dom";
import AuthUtil from "../utils/AuthUtil";
import UserApi from "../utils/api/UserApi";
import {useAtom} from "jotai";
import {currentUserAtom} from "../store";
import "../assets/scss/signUpLoginIn.scss";
import {toast} from "react-toastify";
import UserValidator from "../lib/validators/userValidator";

const LoginContainer = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [ currentUser ,setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    if(currentUser)
    {
      history.replace('/rooms');
    }
    const asyncHelper = async () => {
      if ( AuthUtil.getJWTToken()) {
        const msg = await UserApi.getCurrentUser();
        if (msg.success) {
          setCurrentUser({ ...msg.data });
          history.replace('/rooms');
        }
      }
    };
    asyncHelper();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  let vr;
  vr = UserValidator.validateEmail(email)
    if (!vr.success) {
      setErrors({ email: vr.message });
      return;
    }
    if (!password) {
      setErrors({ password: "Enter a valid password" });
      return;
    }
    const msg = await UserApi.login({ email, password });
    if (!msg.success) {

      toast.error(msg.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setCurrentUser(msg.data);
    AuthUtil.setJWTToken(msg.data.jwt);

    toast.success(msg.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    history.replace('/rooms');
  };

  return (
    <div className="login-container">
      <Row type="flex" justify="center" >
        <Col span={34} xs={22} lg={16} sm={12} xl={12}>
          <div className="back-error-container">
            <form onSubmit={handleSubmit} className="my-login-form ">
              <h1>Log in </h1>
              <div className={errors.email ? "has-error" : ""} style={{marginBottom: "15px"}}>

                <InputComponent
                    placeholder="Email"
                    className="email-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                <InputErrorComponent error={errors.email} />
              </div>
              <div  className={errors.role ? "has-error" : ""} style={{marginBottom: "15px"}}>

                <InputComponent
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-input"
                  />

                <InputErrorComponent error={errors.password} />
              </div>
              <Button htmlType="submit" className="primary-button login-button">
                LOGIN
              </Button>
            </form>

            <Link to={'/signup'} className="sign-up-button" style={{fontSize:"20px"}}>
             Need to Signup ?
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginContainer;
