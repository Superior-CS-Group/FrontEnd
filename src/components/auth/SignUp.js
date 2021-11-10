import React, { Component } from "react";
import InputField from "../inputField/inputField.component";
import user from "../../images/user.png";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import arrow from "../../images/arrow.png";
import company from "../../images/company.png";
import lock from "../../images/lock.png";

export default class SignUp extends Component {
  render() {
    return (
      <>
        <div className="login-heading mb-4">
          <h1 className="mb-0 text-center position-relative">
            <Link to="/auth/login" className="ant-arrow">
              <img src={arrow} alt="" />
            </Link>{" "}
            Sign Up
          </h1>
        </div>
        <Form>
          <InputField
            value=""
            //   onChange={onChange}

            icon={<img src={user} alt="" />}
            placeholder="Username / Email"
            label="Email Address"
            type="text"
            name="email"
            dclass="ant-icon-space mb-3"
          />
          <InputField
            value=""
            //   onChange={onChange}

            icon={<img src={company} alt="" />}
            placeholder="Company Name"
            label="company"
            type="text"
            name="email"
            dclass="ant-icon-space mb-3"
          />

          <Form.Item className="mb-3">
            <label className="ant-label-login">Password</label>
            <Input.Password
              size="large"
              className="ant-login-input"
              prefix={<img src={lock} alt="" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="mb-5">
            <label className="ant-label-login">Confirm Password</label>
            <Input.Password
              size="large"
              className="ant-login-input"
              prefix={<img src={lock} alt="" />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Link to="/set-dashboard">
            <Button type="primary" type="submit" className="ant-btn-save">
              Sign In
            </Button>
          </Link>
        </Form>
      </>
    );
  }
}
