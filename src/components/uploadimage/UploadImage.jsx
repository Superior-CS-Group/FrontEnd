import React from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Upload, Card, Row, Col } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
export default function UploadImage() {
  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  };
  return (
    <>
      <BreadcrumbBar
        name="Dashboard"
        subname="Settings"
        subtitle="Upload image"
        link="/"
        sublink="#"
        breaclass="mb-3"
      />
      <Row gutter={[24, 0]}>
        <Col lg={12} className="mb-3">
          <Card
            bordered={false}
            className="upload-image-box radius-12 h-100"
            title={[<h5 className="mb-0">Logo Upload</h5>]}
          >
            <Dragger
              {...props}
              listType="picture-card"
              className="mb-3"
              status="done"
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Size by :1024 x 1024</p>
            </Dragger>
          </Card>
        </Col>
        <Col lg={12} className="mb-3">
          <Card
            bordered={false}
            className="upload-image-box radius-12 h-100"
            title={[<h5 className="mb-0">Meet The Team</h5>]}
          >
            <Dragger
              {...props}
              listType="picture-card"
              className="mb-3"
              status="done"
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Size by :768 x 768</p>
            </Dragger>
          </Card>
        </Col>
        <Col lg={24}>
          <Card
            bordered={false}
            className="upload-image-box radius-12 "
            title={[<h5 className="mb-0">Cover Photo Upload</h5>]}
          >
            <Dragger
              {...props}
              listType="picture-card"
              className="mb-3"
              status="done"
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Size by :1600 x 500</p>
            </Dragger>
          </Card>
        </Col>
      </Row>
    </>
  );
}
