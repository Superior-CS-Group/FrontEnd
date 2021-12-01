import React, { useEffect, useState } from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Form, Input, Col, Row, Button, message, Upload } from "antd";

import { fileToBase64 } from "../../utils/fileBase64.js";
import { getEmailSetting, updateEmailSetting } from "../../api/admin";
import SmallLoader from "../loader/smallLoader";
// import Swal from "sweetalert2";

export default function EmailSetting() {
  const [state, setState] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    profileImage: "",
    oldLogo: "",
    successMessage: "",
    errorMessage: "",
    resultData: [],
    isLoader: true,
    errors: {},
    errorUsername: "",
    smallLoader: true,
  });
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fromEmail, setfromEmail] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmailSetting();
      if (response) {
        if (response.remote === "success") {
          console.log(response.data);
          setHost(response.data.host);
          setUsername(response.data.username);
          setPassword(response.data.password);
          setPort(response.data.port);
          setfromEmail(response.data.fromEmail);
          setTimeout(
            () =>
              setState({
                profileImage: response.data.logo,
                isLoader: true,
                smallLoader: false,
              }),
            1000
          );
        }
      } else {
      }
    };

    fetchData();
  }, []);

  const handleProfileImage = async (e) => {
    const base64 = await fileToBase64(e.target.files[0]);

    setState({ profileImage: base64 });
  };

  const validateFields = () => {
    const errors = {};
    if (!host) {
      errors.host = "Host is not blank";
      message.error(errors.host, 5);
    }
    if (!username) {
      errors.username = "Username is not blank";
      message.error(errors.username, 5);
    }
    if (!password) {
      errors.password = "Password is not blank";
      message.error(errors.password, 5);
    }
    if (!port) {
      errors.port = "Port is not blank";
      message.error(errors.port, 5);
    }
    if (!fromEmail) {
      errors.fromEmail = "From Email is not blank";
      message.error(errors.fromEmail, 5);
    }
    if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(username)) {
      errors.email = "Email is not valid";
      message.error(errors.email, 5);
      // setState({ errorUsername:errors.email})
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      // message.success(errors, 2);
      return;
    }
    const base64 = state.profileImage.split(",")[1];
    const body = {
      host: host,
      username: username,
      password: password,
      port: port,
      fromEmail: fromEmail,
      profileImage: base64,
      oldLogo: state.profileImage,
    };
    // console.log(body);
    const response = await updateEmailSetting(body);
    if (response.remote === "success") {
      // const message1 = "Data Updated";
      setState({ oldLogo: response.data.logo });
      // setState({ message: "Data Updated" });
      setState({ isLoader: false });
      message.success("Data Updated", 2);
    }
  };

  const handleAllChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const normFile = (e) => {
    // console.log("Upload event:", e.target);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  // Swal.fire({
  //   icon: "success",
  //   title: "success",
  //   text: "Data successfully Added",
  //   showConfirmButton: true,
  // });

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <BreadcrumbBar name="Setting" subname="Email-setting" />
      </div>{" "}
      {state.smallLoader ? (
        <>
          <div className="text-center d-flex align-items-center justify-content-center ht-100">
            <span className="">
              <SmallLoader />
              <p className="mt-2">Loading Please Wait....</p>
            </span>
          </div>
        </>
      ) : (
        <div className="card-shadow p-4" style={{ borderRadius: "25px" }}>
          <div role="alert" class="text-success">
            {state.message}
          </div>
          <Form layout="vertical">
            <Row gutter={[24, 0]}>
              <Col md={12}>
                <Form.Item label="Host Name">
                  {/* <span style={{display: "none"}}>{host}</span> */}
                  <Input
                    placeholder="Host"
                    name="host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="User ">
                  <Input
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Password">
                  <Input
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Port">
                  <Input
                    placeholder="Port"
                    name="port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col md={12}>
                {" "}
                <Form.Item label="From Email">
                  <Input
                    placeholder="From Email"
                    name="fromEmail"
                    value={fromEmail}
                    onChange={(e) => setfromEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="CRM Logo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="main-logo-label"
                  // extra="long"
                >
                  <input type="file" onChange={handleProfileImage} />
                  <img src={state.profileImage} className="preview-logo" />
                  {/* <Upload
                  listType="picture"
                  className="check-input-logo" 
                >
                  <Button icon={<UploadOutlined />} className="logo-btn">
                    Drag or Click to Upload Logo
                  </Button>
                </Upload> */}
                </Form.Item>
              </Col>
              <Col md={24}>
                {" "}
                {/* <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item> */}
                <div className="text-right">
                  <Button
                    type="primary"
                    shape="round"
                    className=""
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
}
