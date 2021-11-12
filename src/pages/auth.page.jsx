import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import { Row, Col, Card } from "antd";
import logo from "../images/logo.svg";
import SignUp from "../components/auth/SignUp";
import SetDashboard from "../components/auth/SetDashboard";
import { Link } from "react-router-dom";

export default class Auth extends Component {
  render() {
    return (
      <div className="login-bg  d-flex align-items-center">
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
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route
                    path="/set-dashboard"
                    element={<SetDashboard />}
                  />
                </Routes>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
