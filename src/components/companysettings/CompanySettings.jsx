import React from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Upload, Card, Row, Col, Form, Input } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
export default function CompanySettings() {
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
        subtitle="Company Settings"
        link="/"
        sublink="#"
        breaclass="mb-3"
      />

      

      <Row gutter={[24, 0]}>
      <Col lg={12} className="mb-3">
      <Card bordered={false} className="radius-12 h-100">
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col lg={24}>
              <Form.Item label="Name">
                <Input
                  type="text"
                  size="large"
                  placeholder="Enter your company name"
                />
              </Form.Item>
            </Col>
            <Col lg={24}>
              <Form.Item label="Address">
                <Input.TextArea
                  className="textarea-resize"
                  size="large"
                  placeholder="Enter your company name"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      </Col>
        <Col lg={12} className="mb-3">
          <Card
            bordered={false}
            className="upload-image-box radius-12 h-100"
            title={[<h5 className="mb-0">Logo Upload</h5>]}
          >
            <ImgCrop>
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
            </ImgCrop>
          </Card>
        </Col>
        <Col lg={12}>
          <Card
            bordered={false}
            className="upload-image-box radius-12 "
            title={[<h5 className="mb-0">Cover Photo Upload</h5>]}
          >
            <ImgCrop>
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
            </ImgCrop>
          </Card>
        </Col>
        <Col lg={12} className="mb-3">
          <Card
            bordered={false}
            className="upload-image-box radius-12 h-100"
            title={[<h5 className="mb-0">Meet The Team</h5>]}
          >
            <ImgCrop>
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
            </ImgCrop>
          </Card>
        </Col>
       
      </Row>
    </>
  );
}
