import React, { Component } from "react";
import { Button, Input, Modal, Form, Row, Col, Upload, message } from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  LinkOutlined,
} from "@ant-design/icons";
export default class ModalPop extends Component {
  render() {
    return (
      <>
        <Modal title="Add New Material/Services ">
          <Form layout="vertical">
            <Row gutter={[24, 0]}>
              <Col span={24} lg={12}>
                <Form.Item
                  label="Material/Services Name"
                  className="ant-select-large"
                >
                  {/* <Select defaultValue="Hard Pipe" onChange={handleChange}>
                    <Option value="jack">Hard Pipe</Option>
                    <Option value="lucy">Lucy</Option>

                    <Option value="Yiminghe">yiminghe</Option>
                  </Select> */}
                  <Input placeholder="Hard Pipe" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Variations">
                  <Input placeholder="Standard" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Unit">
                  <Input placeholder="2" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Cost">
                  <Input placeholder="$0.25" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Per Hours">
                  <Input placeholder="$2" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Production Rate">
                  <Input placeholder="$1.25" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Upload  Image">
                  <Upload className="ant-upload-full">
                    <Button
                      className="ant-modal-input w-100"
                      icon={<LinkOutlined />}
                    >
                      Attach images
                    </Button>
                  </Upload>
                </Form.Item>
                {/* <Form className="text-end">
                  <Button
                    type="primary"
                    className="radius-30 ant-primary-btn font-15"
                    size="large"
                  >
                    <PlusCircleOutlined style={{ fontSize: "18px" }} /> Add
                    Variation
                  </Button>
                </Form> */}
              </Col>
              <Col span={24}>
                <Form.Item className="text-center mt-4 mb-0">
                  <Button className="ant-cancel-btn me-3">Cancel</Button>
                  <Button type="primary" className="ant-add-button">
                    Add to Catalog
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
}
