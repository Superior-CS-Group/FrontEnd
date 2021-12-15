import React, { Component } from "react";
import {
  Steps,
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  Switch,
  Select,
} from "antd";
import profile from "../../images/profile.png";
const { Step } = Steps;
const { Option } = Select;
export default class Setup extends Component {
  state = {
    current: 0,
  };
  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  next = () => {
    this.setState({
      current: this.state.current + 1,
    });
  };

  prev = () => {
    this.setState({
      current: this.state.current - 1,
    });
  };

  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }
    const { current } = this.state;
    return (
      <div className="login-bg py-3">
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <Card className="radius-9" bordered={false}>
            <div className="mb-3">
              <Steps
                labelPlacement="vertical "
                current={current}
                onChange={this.onChange}
                className="step-cricle"
              >
                <Step title="Company info" key={0} />
                <Step title="Personal info" key={1} />
                <Step title="Add all users" key={2} />
                {/* <Step title="Profile" key={3} /> */}
              </Steps>
            </div>
            <div>
              {current === 0 && (
                <>
                  <Form layout="vertical">
                    <Form.Item label="Company Name" className="mb-3">
                      <Input
                        placeholder="Enter your Company Name"
                        className="radius-9"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item label="Company Address" className="mb-3">
                      <Input.TextArea
                        placeholder="Enter yourCompany Address "
                        className="radius-9 h-150"
                      />
                    </Form.Item>
                    <Form.Item className="mb-3" label="Logo">
                      <Input type="file" className="radius-9 " size="large" />
                    </Form.Item>

                    <Row gutter={[24, 0]}>
                      <Col span={12}>
                        <Button
                          onClick={this.next}
                          type="primary"
                          className="px-25"
                        >
                          Next
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </>
              )}
              {current === 1 && (
                <>
                  <Form layout="vertical">
                    <Form.Item label="Name" className="mb-3">
                      <Input
                        placeholder="Enter your name"
                        className="radius-9"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item label="Role" className="mb-3">
                      <Input
                        placeholder="Enter your role"
                        className="radius-9"
                        size="large"
                      />
                    </Form.Item>

                    <Row gutter={[24, 0]}>
                      <Col lg={6}>
                        <Form.Item label="Edit notifications" className="mb-3">
                          <Switch defaultChecked onChange={onChange} />
                        </Form.Item>
                      </Col>
                      <Col lg={6}>
                        <Form.Item label="Edit your permissions">
                          <Switch onChange={onChange} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Profile" className="mb-3">
                      <Input type="file" className="radius-9" size="large" />
                    </Form.Item>
                    <Form.Item>
                      <div className="profile-set">
                        <img src={profile} alt="user" />
                      </div>
                    </Form.Item>

                    <div className="pt-3">
                      <Row gutter={[24, 0]}>
                        <Col span={12}>
                          <Button onClick={this.prev} className="px-25">
                            Prev
                          </Button>
                        </Col>

                        <Col span={12} className="text-right">
                          <Button
                            onClick={this.next}
                            type="primary"
                            className="px-25"
                          >
                            Next
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </>
              )}
              {current === 2 && (
                <>
                  <Form layout="vertical">
                    <Form.Item label="Name" className="mb-3">
                      <Input
                        placeholder="name"
                        size="large"
                        className="radius-9"
                      />
                    </Form.Item>
                    <Form.Item label="Email " className="mb-3">
                      <Input
                        type="email"
                        placeholder="Email"
                        className="radius-9"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item label="Phone " className="mb-3">
                      <Input
                        placeholder="Phone No."
                        className="radius-9"
                        size="large"
                        type="number"
                      />
                    </Form.Item>
                    <Form.Item label="Password" className="mb-3">
                      <Input
                        type="password"
                        placeholder="Password"
                        className="radius-9"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Profile pic (If wanted) "
                      className="mb-3"
                    >
                      <Input type="file" className="radius-9" size="large" />
                    </Form.Item>
                    <Form.Item label="Select">
                      <Select
                        className="role-user"
                        size="large"
                        defaultValue="lucy"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                      >
                        <Option value="jack">Field employee</Option>
                        <Option value="lucy">Foreman</Option>
                        <Option value="disabled">Project manager</Option>
                        <Option value="Yiminghe">Salesperson</Option>
                        <Option value="admin">Full Admin</Option>
                      </Select>
                    </Form.Item>

                    <Row gutter={[24, 0]}>
                      <Col span={12}>
                        <Button onClick={this.prev} className="px-25">
                          Prev
                        </Button>
                      </Col>

                      <Col span={12} className="text-right">
                        <Button type="primary" className="px-25">
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </>
              )}

              {/* 

              {current === 3 && <>ff</>} */}
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
