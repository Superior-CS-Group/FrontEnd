import React, { Component } from "react";

import InputField from "../inputField/inputField.component";
import { Formik } from "formik";
import { Form, Button, Checkbox } from "antd";
import GoogleLogin from "react-google-login";
import { Link, Route, Navigate } from "react-router-dom";
import { postData } from "../../utils/fetchApi.js";
import user from "../../images/user.png";
import lock from "../../images/lock.png";
function onChange(e) {
  // console.log(`checked = ${e.target.checked}`);
}
const responseGoogle = (response) => {
  // console.log(response);
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      userRole: "",
      isRedirect: false,
      isValidEmail: false,
      isLoading: false,
      errors: {},
      isToken: false,
    };
  }

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isToken: true });
    } else {
      this.setState({ isToken: false });
    }
  };

  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateFields = () => {
    const errors = {};
    if (!this.state.email) {
      errors.email = "Email id is not blank";
    }
    if (!this.state.password) {
      errors.password = "Password is not blank";
    }
    if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      errors.email = "Email is not valid";
      // this.setState({ isValidEmail:false})
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  handleAllChange = (e) => {
    if (e.target.name === "email") {
      this.setState({ isValidEmail: this.validateEmail(e.target.value) });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errors: {} });
    const { errors, isValid } = this.validateFields();
    if (!isValid) {
      this.setState({ errors });
      return;
    }

    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const body = { email, password };
    // console.log(body);
    try {
      const result = await postData(`auth/sign-in`, body);
      console.log("result: ", result.data);
      localStorage.setItem("token", result.data.token);
      this.setState({
        email: "",
        password: "",
        userRole: result.data.user.userRole,
        message: "Successfully login!",
        isRedirect: true,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ message: err.response?.data.error, isLoading: false });
    }
  };

  render() {
    if (this.state.isRedirect) {
      return <Navigate to="/dashboard" />;
    }
    if (this.state.isToken) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <>
        <div className="login-heading mb-2">
          <h1 className="mb-0">Log In</h1>
        </div>

        <Form layout="vertical">
          <InputField
            icon={<img src={user} alt="" />}
            placeholder="Username/Email"
            label="Email Address"
            type="text"
            name="email"
            onChange={this.handleAllChange}
            dclass="ant-icon-space mb-3"
          />
          <div role="alert" class="text-danger">
            {this.state.errors.email}
          </div>
          <InputField
            icon={<img src={lock} alt="" />}
            placeholder="password"
            label="Password"
            type="password"
            name="password"
            onChange={this.handleAllChange}
            dclass="ant-icon-space mb-0"
          />{" "}
          <div role="alert" class="text-danger">
            {this.state.errors.password}
          </div>
          <Form.Item className="ant-remember mb-2">
            <div className="d-flex align-items-center justify-content-between">
              <Checkbox onChange={onChange} className="mt-2">
                Remember me next time
              </Checkbox>
              <Link to="/forgot" className="forgot">
                Forgot Password?
              </Link>
            </div>
          </Form.Item>
          <Form.Item className="mb-0">
            <div className="v-line">
              <span>Or</span>
            </div>
          </Form.Item>
          <div role="alert" class="text-danger">
            {this.state.message}
          </div>
          <Form.Item className="mb-3">
            <Button
              type="primary"
              type="submit"
              className="ant-btn-save"
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
          </Form.Item>
          <div className="ant-social-icon text-center">
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              render={(renderProps) => (
                <button className="mb-3 " onClick={renderProps.onClick}>
                  Google
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            <button className="facebook-icon mb-4">Facebook</button>
          </div>
          <Link to="/auth/sign-up">
            <Button type="primary" type="submit" className="ant-btn-save">
              Sign Up
            </Button>
          </Link>
        </Form>
      </>
    );
  }
}
