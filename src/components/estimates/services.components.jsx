import React, { Component } from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { LinkOutlined, PlusCircleOutlined } from "@ant-design/icons";

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class Services extends Component {
  render() {
    return (
      <>
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={24} lg={24}>
              <Form.Item label="Services Name" className="ant-select-large">
                <Input
                  placeholder={this.props.servicesNamePlaceholder} value={this.props.valueService}
                  className="ant-modal-input"
                />
              </Form.Item>
            </Col>

            <Col span={24} lg={8}>
              <Form.Item label="Hours">
                <Input placeholder={this.props.hours} value={this.props.hoursValue} className="ant-modal-input" />
              </Form.Item>
            </Col>
            <Col span={24} lg={8}>
              <Form.Item label="Days">
                <Input placeholder={this.props.days} value={this.props.daysValue} className="ant-modal-input" />
              </Form.Item>
            </Col>
            <Col span={24} lg={8}>
              <Form.Item label="Production Rate">
                <Input placeholder={this.props.productionRate} value={this.props.rate} className="ant-modal-input" />
              </Form.Item>
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
      </>
    );
  }
}
