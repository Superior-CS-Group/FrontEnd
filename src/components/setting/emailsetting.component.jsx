import React from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Form, Input, Col, Row, Button, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
export default function EmailSetting() {
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <BreadcrumbBar name="Setting" subname="Email-setting" />
      </div>{" "}
      <div className="card-shadow p-4" style={{ borderRadius: "25px" }}>
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col md={12}>
              <Form.Item name="Host Name" label="Host Name">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item name="User" label="User">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item name="Password" label="Password">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item name="Port" label="Port">
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col md={12}>
              {" "}
              <Form.Item
                name="Template"
                label="Template Logo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="main-logo-label"
                // extra="long"
              >
                <Upload
                  name="logo"
                  action="/upload.do"
                  listType="picture"
                  className="check-input-logo"
                >
                  <Button icon={<UploadOutlined />} className="logo-btn">
                    Drag or Click to Upload Logo
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col md={24}>
              {" "}
              {/* <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item> */}
              <div className="text-right">
                <Button type="primary" shape="round" className="">
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
