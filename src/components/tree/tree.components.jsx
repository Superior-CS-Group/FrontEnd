import React, { useState } from "react";
import "./tree.css";
import { Card, Row, Col, Form, Input, Button, Select, Drawer } from "antd";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { treeIcon } from "../../utils/svg.file";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

export default function Tree() {
  const { Option } = Select;

  const [tree, setTree] = useState(false);
  const addTree = () => {
    setTree(true);
  };
  const onClose = () => {
    setTree(false);
  };

  return (
    <>
      <BreadcrumbBar name="Demolition and Prep" breaclass="mb-4" />
      <Card className="r-height">
        <div className="tree mb-5">
          <ul className="d-flex">
            <li className="mx-auto">
              <a className="ant-cover-b ant-cover-primary">
                Demolition & Prep. <EditOutlined />
              </a>
              <div className="d-flex align-items-center justify-content-center">
                <span className="ant-cricle-add" onClick={addTree}>
                  {treeIcon}
                </span>
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
        {tree ? (
          <div className="bottom-modal p-4 pt-3">
            <Form layout="vertical">
              <Row gutter={[24, 0]} className="mb-3">
                <Col span={24}>
                  <h5 className="text-center mb-4">
                    Define Formula{" "}
                    <span className="float-end closeicon" onClick={onClose}>
                      <CloseOutlined />
                    </span>
                  </h5>
                </Col>
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
                    placeholder="length of per pipe"
                    className="radius-9"
                    size="large"
                  />
                </Col>
                <Col lg={4}>
                  <Button
                    type="primary"
                    size="large"
                    className="radius-9"
                    block
                  >
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
                  <Button
                    type="primary"
                    size="large"
                    className="radius-9"
                    block
                  >
                    Save Formula
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
