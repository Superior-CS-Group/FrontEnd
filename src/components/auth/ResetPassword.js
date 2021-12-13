import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Card, Button, Form, Divider, message } from "antd";
import logo from "../../images/logo.svg";
import { Link, useParams, Navigate } from "react-router-dom";
import InputField from "../inputField/inputField.component";
import lock from "../../images/lock.png";
import { updatePassword } from "../../api/user";
export default function ResetPassword(props) {
  const params = useParams();
  const [redirect, setRedirect] = useState(null);
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    message: "",
    errors: {},
    isModalForgot: false,
  });

  const validateFields = () => {
    const errors = {};
    if (!state.password) {
      errors.password = "New Password is required";
      message.error(errors.password, 5);
    }
    if (!state.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      message.error(errors.confirmPassword, 5);
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };
  const changePasswordHandle = async (event) => {
    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      // message.success(errors, 5);
      return;
    }
    if (state.password !== state.confirmPassword) {
      message.error("New Password or Confirm Password not match");
    }
    const { password, confirmPassword } = state;
    const body = {
      password,
      confirmPassword,
      token: params.id,
    };
    try {
      const responseData = await updatePassword(body);
      if (responseData.remote === "success") {
        setState({ password: "", confirmPassword: "" });
        message.success("New Password Updated");
        setRedirect("/auth");
      }
    } catch (error) {
      console.log("error", error, error.response);

      setState({
        ...state,
        message: error.response?.data?.errors,
        isLoading: false,
      });
    }
  };
  const handleAllChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errors: [],
    });
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
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
                    placeholder="New Password"
                    label="New Password"
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={handleAllChange}
                    dclass="ant-icon-space mb-3"
                  />
                  <InputField
                    icon={<img src={lock} alt="" />}
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={state.confirmPassword}
                    onChange={handleAllChange}
                    dclass="ant-icon-space mb-0"
                  />{" "}
                  <Divider />
                  <Form.Item className="mb-3">
                    <Button
                      type="primary"
                      onClick={changePasswordHandle}
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
