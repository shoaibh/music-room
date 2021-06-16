import React, { useState } from "react";
import { Button, Col, Row, Select } from "antd";
import InputComponent from "../components/input/InputComonent";
import InputErrorComponent from "../components/input/InputErrorComponent";
import UserApi from "../utils/api/UserApi";
import "../assets/scss/signUpLoginIn.scss";
import { toast } from "react-toastify";
import UserValidator from "../lib/validators/userValidator";
import {Link} from "react-router-dom";


const SignUpContainer = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let vr;
    vr = UserValidator.validateName(name)
    if (!vr.success) {
      setErrors({ name: vr.message });
      return;
    }

    vr = UserValidator.validateEmail(email)
    if (!vr.success) {
      setErrors({ email: vr.message });
      return;
    }
    vr = UserValidator.validatePassword(password)
    if (!vr.success) {
      setErrors({ password: vr.message });
      return;
    }



    const msg = await UserApi.signup({ name, email, password });
    if (!msg.success) {
      toast.error(msg.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    toast.success(msg.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    history.replace('/login');
  };

  return (
    <div className="login-container">
      <Row type="flex" justify="center" align="middle">
        <Col span={24} xs={22} lg={12} sm={12} xl={12}>
          <div className="back-error-container">
            <form onSubmit={handleSubmit} className="sign-up-form">
              <h2>Sign Up </h2>
              <div className={errors.name ? "has-error" : ""}>

                <InputComponent
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="name-input"
                />

                <InputErrorComponent error={errors.name} />
              </div>
              <div className={errors.email ? "has-error" : ""}>

                <InputComponent
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                />

                <InputErrorComponent error={errors.email} />
              </div>
              <div className={errors.password ? "has-error" : ""}>

                <InputComponent
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                />

                <InputErrorComponent error={errors.password} />
              </div>

              <Button htmlType="submit" className="primary-button login-button">
                SIGN UP
              </Button>
            </form>
            <Link to={'/login'} className="sign-up-button" style={{fontSize:"20px"}}>
             Go to Login
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpContainer;
