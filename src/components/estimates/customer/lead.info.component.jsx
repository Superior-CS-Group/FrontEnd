import React, { Component } from "react";
import { Collapse, Input, Form, Row, Col, Button } from "antd";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { UserOutlined, CheckOutlined } from "@ant-design/icons";
// import Button from "@restart/ui/esm/Button";
export default class LeadInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      expandIconPosition: "right",
      value: "",
      setValue: "",
    };
  }
  render() {
    const { value, setValue } = this.state;
    const { Panel } = Collapse;
    const { expandIconPosition } = this.state;
    const { TextArea } = Input;
    function callback(key) {
      console.log(key);
    }

    return (
      <>
        <Collapse
          className="ant-lead-card border-0"
          defaultActiveKey={["1"]}
          onChange={callback}
          expandIconPosition={expandIconPosition}
        >
          <Panel
            header="Personal Information"
            key="1"
            icon={<UserOutlined />}
            style={{ border: "0px" }}
          >
            <Form className="mt-5" layout="vertical">
              <Row gutter={[24, 0]}>
                <Col md={12}>
                  <Form.Item label="Full Name">
                    <Input size="large" placeholder="large size" />
                  </Form.Item>{" "}
                  <Form.Item label="Email">
                    <Input size="large" suffix={<CheckOutlined />} />
                  </Form.Item>
                  <Form.Item name="url" label="Phone">
                    {/* <Input suffix={<CheckOutlined />} /> */}
                    <PhoneInput
                      international
                      defaultCountry="RU"
                      value={value}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col md={12}>
                  <Form.Item label="Country">
                    <Input size="large" suffix={<CheckOutlined />} />
                  </Form.Item>
                  <Row gutter={[24, 0]}>
                    <Col md={12}>
                      <Form.Item label="City ">
                        <Input size="large" suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>{" "}
                    <Col md={12}>
                      <Form.Item label="State">
                        <Input size="large" suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[24, 0]}>
                    <Col md={12}>
                      <Form.Item label="Address">
                        <Input size="large" suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>{" "}
                    <Col md={12}>
                      <Form.Item label="Zip code">
                        <Input size="large" suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col md={24}>
                  <Form.Item label="Other Information">
                    <TextArea size="large" rows={4} />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <div className="text-right">
                    <Button className="add-btn ant-btn-primary">
                      Save Changes
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Panel>
          <Panel header="Spouse Information" key="2" style={{ border: "0px" }}>
            <Form className="mt-5" layout="vertical">
              <Row gutter={[24, 0]}>
                <Col md={12}>
                  <Form.Item label="Full Name">
                    <Input size="large" suffix={<CheckOutlined />} />
                  </Form.Item>{" "}
                  <Form.Item label="Email">
                    <Input size="large" suffix={<CheckOutlined />} />
                  </Form.Item>
                  <Form.Item label="Phone">
                    <Input size="large" suffix={<CheckOutlined />} />
                  </Form.Item>
                </Col>

                <Col md={12}>
                  <Form.Item label="Other Information">
                    <TextArea size="large" rows={4} />
                  </Form.Item>
                </Col>

                <Col md={24}>
                  <div className="text-right">
                    <Button className="add-btn ant-btn-primary">
                      Save Changes
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </>
    );
  }
}
