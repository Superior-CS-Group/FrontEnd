import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import { Row, Col, Card, Button, Checkbox, Form, Divider } from "antd";
import logo from "../../images/logo.svg";
import SignUp from "./SignUp";
import SetDashboard from "./SetDashboard";
import { Link } from "react-router-dom";
import InputField from "../inputField/inputField.component";
import lock from "../../images/lock.png";
export default function ResetPassword() {
  return (
    <>
      {" "}
      <div
        className="login-bg  d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <Container>
          <Row gutter={[0, 0]}>
            <Col lg={10} className="d-none d-lg-block">
              <div className="title mt-3">
                <h5 className="mb-0">
                  Welcome to <span>ONE PERCENT SOFTWARE</span>
                </h5>
              </div>
              <div className="ant-text-left">Consequat ac gravida proin.</div>
            </Col>
            <Col lg={8} className="ms-auto">
              <Card
                className="radius-40 shadow"
                bordered={false}
                bodyStyle={{ paddingTop: "40px" }}
              >
                <div className="logo text-center mb-4">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <div className="login-heading mb-2">
                  <h1 className="mb-0">Reset Password</h1>
                </div>

                <Form layout="vertical">
                  <InputField
                    icon={<img src={lock} alt="" />}
                    placeholder=""
                    label="New Password"
                    type="New Password"
                    name="New password"
                    dclass="ant-icon-space mb-3"
                  />
                  <InputField
                    icon={<img src={lock} alt="" />}
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    type="password"
                    name="Confirm password"
                    dclass="ant-icon-space mb-0"
                  />{" "}
                  <Divider />
                  <Form.Item className="mb-3">
                    <Button
                      type="primary"
                      type="submit"
                      className="ant-btn-save"
                    >
                      Reset Password
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
