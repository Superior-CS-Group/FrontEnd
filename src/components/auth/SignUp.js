import React, { Component } from "react";
import InputField from "../inputField/inputField.component";
import user from "../../images/user.png";
import { Form, Input, Button } from "antd";
import { Link,Navigate } from "react-router-dom";
import arrow from "../../images/arrow.png";
import company from "../../images/company.png";
import lock from "../../images/lock.png";
import { postData } from "../../utils/fetchApi";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      profileImage: "",
      companyLogo: "",
      message: "",
      isRedirect: false,
      isValidEmail: false,
      isLoading: false,
      errors: {},
    };
  }
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
    if (!this.state.confirmPassword) {
      errors.confirmPassword = "Confirm Password is not blank";
    }
    if (this.state.password != this.state.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password is not match";
    }
    if (!this.state.companyName) {
      errors.companyName = "Company Name is not blank";
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
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
    const { email, password, companyName } = this.state;
    const body = { email, password, companyName };
    // console.log("body: ", body);

    try {
      const result = await postData(`auth/sign-up`, body);
      // console.log("result: ", result);
      localStorage.setItem("token", result.data.token);
      setTimeout(() => {
        this.setState({
          email: "",
          password: "",
          message: "Successfully Sign-up!",
          isRedirect: true,
          isLoading: false,
        });
      }, 1000);
    } catch (err) {
      console.log("error", err, err.response);
      setTimeout(() => {
        this.setState({
          errors: err.response.data.errors,
          isLoading: false,
        });
      }, 1000);
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
        <div className="login-heading mb-4">
          <h1 className="mb-0 text-center position-relative">
            <Link to="/auth" className="ant-arrow">
              <img src={arrow} alt="" />
            </Link>{" "}
            Sign Up
          </h1>
        </div>
        <Form>
          <InputField
            icon={<img src={user} alt="" />}
            placeholder="Username / Email"
            label="Email Address"
            type="text"
            name="email"
            dclass="ant-icon-space mb-3"
            onChange={this.handleAllChange}
          />
          <div role="alert" class="text-danger">
            {this.state.errors.email}
          </div>
          <InputField
            value=""
            icon={<img src={company} alt="" />}
            placeholder="Company Name"
            label="company"
            type="text"
            name="companyName"
            dclass="ant-icon-space mb-3"
            onChange={this.handleAllChange}
          />

          <div role="alert" class="text-danger">
            {this.state.errors.companyName}
          </div>
          <Form.Item className="mb-3">
            <label className="ant-label-login">Password</label>
            <Input.Password
              size="large"
              className="ant-login-input"
              prefix={<img src={lock} alt="" />}
              placeholder="Password"
              name="password"
              onChange={this.handleAllChange}
            />
            <div role="alert" class="text-danger">
              {this.state.errors.password}
            </div>
          </Form.Item>
          <Form.Item className="mb-5">
            <label className="ant-label-login">Confirm Password</label>
            <Input.Password
              size="large"
              className="ant-login-input"
              prefix={<img src={lock} alt="" />}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={this.handleAllChange}
            />
            <div role="alert" class="text-danger">
              {this.state.errors.confirmPassword}
            </div>
          </Form.Item>
          {/* <Link
            to={{
              pathname: "/auth/set-dashboard",
            }}
            state={{
              email: this.state.email,
              password: this.state.password,
              companyName: this.state.companyName,
              confirmPassword: this.state.confirmPassword,
            }}
          > */}
            <Button type="primary" type="submit" className="ant-btn-save" 
              onClick={this.handleSubmit}>
              Sign Up
            </Button>
          {/* </Link> */}
        </Form>
      </>
    );
  }
}
