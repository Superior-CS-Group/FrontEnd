import React, { useEffect, useState } from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Form, Input, Col, Row, Button, Upload } from "antd";

import { fileToBase64 } from "../../utils/fileBase64.js";
import { getEmailSetting, updateEmailSetting } from "../../api/admin";

import Swal from "sweetalert2";

export default function EmailSetting() {
  const [state, setState] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    profileImage: "",
    oldLogo: "",
    message: "",
    resultData: [],
    isLoader:true
  });
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fromEmail, setfromEmail] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmailSetting();
      if (response.remote === "success") {
        console.log(response.data);
        setHost(response.data.host);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setPort(response.data.port);
        setfromEmail(response.data.fromEmail);
        setState({ profileImage: response.data.logo,isLoader:true });
      }
    };

    fetchData();
  }, []);

  const handleProfileImage = async (e) => {
    const base64 = await fileToBase64(e.target.files[0]);

    setState({ profileImage: base64 });
  };
  // console.log(state.profileImage,"state.profileImage");
  const handleSave = async () => {
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
    console.log(body);
    const response = await updateEmailSetting(body);
    if (response.remote === "success") {
      // console.log(response.data);
      // setHost(response.data.host);
      // setUsername(response.data.username);
      // setPassword(response.data.password);
      // setfromEmail(response.data.fromEmail);
      // setPort(response.data.port);
      // setState({ profileImage: response.data.logo });
      // setState({ oldLogo: response.data.logo });
      // setState({ message: "Data Updated" });
      setState({isLoader:false})
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

  Swal.fire({
    icon: "success",
    title: "success",
    text: "Data successfully Added",
    showConfirmButton: true,
  });
  // console.log("host: ", host);
  if(state.isLoader===true){
    <Loader />
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <BreadcrumbBar name="Setting" subname="Email-setting" />
      </div>{" "}
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
                <img src={state.profileImage} />
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
    </>
  );
}
