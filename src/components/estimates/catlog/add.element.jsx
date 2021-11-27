import React from "react";
import { Row, Col, Progress, Form, Input, Button } from "antd";
import { star, upload } from "../../../utils/svg.file";
import {
  CheckOutlined,
  CloseOutlined,
  DollarCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import element from "../../../images/boulder.jpg";
export default function Addelement() {
  const { TextArea } = Input;
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <>
      <div className="ant-upload-box">
        <Row gutter={[24, 0]}>
          <Col md={6}>
            <div className="ant-image-upload">
              <span className="ant-star-icon">{star}</span>
              <span className="ant-star-tick ant-position d-none">
                <CheckOutlined />
              </span>
              <span className="ant-star-delete ant-position">
                <CloseOutlined />
              </span>
              <img src={element} alt="" />
            </div>
            <Progress
              percent={50}
              showInfo={false}
              strokeColor="#34C759"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </Col>
          <Col md={6}>
            <div className="ant-image-upload">
              <span className="ant-star-tick ant-position d-none">
                <CheckOutlined />
              </span>
              <span className="ant-star-delete ant-position">
                <CloseOutlined />
              </span>
              <img src={element} alt="" />
            </div>
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#34C759"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </Col>
          <Col md={6}>
            <div className="ant-image-upload">
              <span className="ant-star-tick ant-position d-none">
                <CheckOutlined />
              </span>
              <span className="ant-star-delete ant-position">
                <CloseOutlined />
              </span>
              <img src={element} alt="" />
            </div>
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#34C759"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </Col>
          <Col md={6}>
            <div className="ant-image-upload border-dash">
              <div className="d-flex align-items-center  justify-content-center h-100 upload-input">
                <input type="file" multiple />
                {upload}
              </div>
            </div>
          </Col>
        </Row>
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Form.Item label="Name of Material">
                <Input
                  placeholder="e.g hard pipe"
                  size="large"
                  className="ant-furmulla-input radius-30"
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="Price">
                <Input
                  prefix={<DollarCircleOutlined />}
                  placeholder="$400.00"
                  size="large"
                  className="ant-furmulla-input radius-30"
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="Unit" className="ant-smily-select">
                {/* <SmileOutlined />
                <Select
                  defaultValue="e.g. inches"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  size="large"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </Select> */}
                <Input
                  className="ant-furmulla-input radius-30"
                  prefix={<SmileOutlined />}
                  placeholder="e.g. inches"
                  size="large"
                />{" "}
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="Quantity">
                <Input
                  className="ant-furmulla-input radius-30"
                  prefix={<SmileOutlined />}
                  placeholder="e.g. inches"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item label="Description">
                <TextArea
                  className="ant-furmulla-input radius-30 p-3"
                  maxLength={300}
                  onChange={onChange}
                  style={{ height: "120px", resize: "none" }}
                  placeholder="R410A has a 60% higher operating pressure than R22 thus requiring a thicker wall copper tube and significantly stronger (R410A) copper fittings."
                />
              </Form.Item>
            </Col>
            <Col md={24} className="text-end">
              <Button type="primary" className="radius-9">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
