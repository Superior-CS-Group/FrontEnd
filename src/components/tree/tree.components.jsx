import React from "react";
import "./tree.css";
import { Card, Row, Col, Form, Input, Button } from "antd";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { treeIcon } from "../../utils/svg.file";
import { EditOutlined } from "@ant-design/icons";

export default function Tree() {
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
          <Row gutter={[24, 0]}>
            <Col lg={20}>
              <Form.Item>
                <Input placeholder="Fill dirt" size="large" className="radius-9" />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Button type="primary" size="large" className="radius-9">
                Add Formula
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
