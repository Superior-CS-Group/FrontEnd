import React from "react";
import "./tree.css";
import { Card, Row, Col, Form, Input, Button, Space, Select } from "antd";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { treeIcon } from "../../utils/svg.file";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

export default function Tree() {
  const { Option } = Select;
  const selectAfter = (
    <Select
      size="large"
      defaultValue=".com"
      className="select-after"
      style={{ color: "#fff" }}
    >
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
  return (
    <>
      <BreadcrumbBar name="Demolition and Prep" breaclass="mb-4" />
      <Card>
        <div className="tree mb-5">
          <ul className="d-flex">
            <li className="mx-auto">
              <a className="ant-cover-b ant-cover-primary">
                Demolition & Prep. <EditOutlined />
              </a>
              <div className="d-flex align-items-center justify-content-center">
                <span className="ant-cricle-add">{treeIcon}</span>
              </div>
              <ul>
                <li>
                  <a className="ant-cover-b ant-cover-primary">
                    Labour Charge <EditOutlined className="ms-3" />
                  </a>
                  <ul>
                    <li>
                      <a className="ant-cover-b ant-cover-primary">
                        <div className="ant-hours-box text-start">
                          <h5 className="m-0">
                            Calculation <EditOutlined className="ms-3" />
                          </h5>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="ant-cover-b ant-cover-primary">
                    Labour Charge <EditOutlined className="ms-3" />
                  </a>
                  <ul>
                    <li>
                      <a className="ant-cover-b ant-cover-primary">
                        <div className="ant-hours-box text-start">
                          <h5 className="m-0">
                            Calculation <EditOutlined className="ms-3" />
                          </h5>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <Form layout="vertical">
          <Row gutter={[24, 0]} className="mb-3">
            <Col lg={4}>
              <Select
                size="large"
                className="ant-formulla"
                defaultValue="User Input"
                style={{ width: "100%", borderRadius: "9px" }}
              >
                <Option value="User Input">User Input</Option>
                <Option value="User Input">User Input</Option>
                <Option value="User Input">User Input</Option>
                <Option value="User Input">User Input</Option>
              </Select>
            </Col>
            <Col lg={16}>
              <Input
                placeholder="length of per
pipe"
                className="radius-9"
                size="large"
              />
            </Col>
            <Col lg={4}>
              <Button type="primary" size="large" className="radius-9">
                Add Element
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col lg={20}>
              <Form.Item>
                <div className="radius-9 ant-blue-add-tree-box">
                  <ul>
                    <li>
                      <span>Perf pipe cost</span>{" "}
                      <span className="tag-close-icon">x</span>
                    </li>
                    <li>
                      <span>Multiply {"{*}"}</span>{" "}
                      <span className="tag-close-icon">x</span>
                    </li>
                  </ul>
                </div>
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Button type="primary" size="large" className="radius-9">
                Save Formula
              </Button>
            </Col>
          </Row>
          {/* <Row gutter={[24, 0]}>
            <Col lg={8} className="mx-auto align-items-center d-flex">
              <Space direction="vertical" className="serachbox me-3">
                <Input
                  size="large"
                  addonAfter={selectAfter}
                  placeholder="mysite"
                />
              </Space>
              <Button
                type="primary"
                shape="circle"
                className="p-0 d-inline-flex align-items-center justify-content-center"
              >
                <PlusOutlined />
              </Button>
            </Col>
          </Row> */}
        </Form>
      </Card>
    </>
  );
}
