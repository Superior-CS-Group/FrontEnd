import React, { Component } from "react";
import { Collapse, Input, Form, Row, Col, TextArea, Button } from "antd";
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
      <div>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={callback}
          expandIconPosition={expandIconPosition}
        >
          <Panel header="Personal Information" key="1" icon={<UserOutlined />}>
            <Form className="mt-5" layout="vertical">
              <Row>
                <Col md={11}>
                  <Form.Item name="url" label="Full Name">
                    <Input suffix={<CheckOutlined />} />
                  </Form.Item>{" "}
                  <Form.Item name="url" label="Email">
                    <Input suffix={<CheckOutlined />} />
                  </Form.Item>
                  <Form.Item name="url" label="Phone">
                    {/* <Input suffix={<CheckOutlined />} /> */}
                    <PhoneInput
                      international
                      defaultCountry="RU"
                      value={value}
                      //   onChange={setValue}/
                      suffix={<CheckOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col md={2}></Col>
                <Col md={11}>
                  <Form.Item name="url" label="Country">
                    <Input suffix={<CheckOutlined />} />
                  </Form.Item>
                  <Row>
                    <Col md={12}>
                      <Form.Item name="url" label="City ">
                        <Input suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>{" "}
                    <Col md={12}>
                      <Form.Item name="url" label="State">
                        <Input suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Item name="url" label="Address">
                        <Input suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>{" "}
                    <Col md={12}>
                      <Form.Item name="url" label="Zip code">
                        <Input suffix={<CheckOutlined />} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col md={24}>
                  <Form.Item name="url" label="Other Information">
                    <TextArea rows={4} />
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
          <Panel header="Spouse Information" key="2">
            <Form className="mt-5" layout="vertical">
              <Row>
                <Col md={11}>
                  <Form.Item name="url" label="Full Name">
                    <Input suffix={<CheckOutlined />} />
                  </Form.Item>{" "}
                  <Form.Item name="url" label="Email">
                    <Input suffix={<CheckOutlined />} />
                  </Form.Item>
                  <Form.Item name="url" label="Phone">
                    <Input suffix={<CheckOutlined />} />
                  </Form.Item>
                </Col>
                <Col md={2}></Col>
                <Col md={11}>
                  <Form.Item name="url" label="Other Information">
                    <TextArea rows={4} />
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
      </div>
    );
  }
}
