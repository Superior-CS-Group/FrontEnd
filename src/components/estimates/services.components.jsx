import React, { Component } from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { LinkOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { postData } from "../../utils/fetchApi";

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hours: "",
      days: "",
      rate: "",
      type: "service",
      message: "",
      isRedirect: false,
      isValidEmail: false,
      isLoading: false,
      errors: {},
      visible: false,
      isMaterial: true,
      isProduct: true,
      ModalVisible: false,
      variation: [
        {
          name: "",
          price: "",
          unit: "",
        },
      ],
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateFields = () => {
    const errors = {};
    if (!this.state.name) {
      errors.name = "Service Name is not blank";
    }
    if (!this.state.hours) {
      errors.hours = "Service Hour is not blank";
    }
    if (!this.state.days) {
      errors.days = "Service Day is not blank";
    }
    if (!this.state.rate) {
      errors.rate = "Service Rate is not blank";
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  handleAllChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (event) => {
    // console.log(localStorage.getItem("token"))

    event.preventDefault();
    this.setState({ errors: {} });
    const { errors, isValid } = this.validateFields();
    if (!isValid) {
      this.setState({ errors });
      return;
    }
    this.setState({ isLoading: true });

    const { name, hours, days, rate, type } = this.state;
    const body = { name, hours, days, rate, type };
    // console.log("body: ", body);

    try {
      const result = await postData(`services/add`, body);
      // console.log("result: ", result);
      this.setState({
        ...this.state,
        name: "",
        hours: "",
        days: "",
        rate: "",
        message: "New Service Added!",
        isRedirect: true,
        isLoading: false,
        ModalVisible: false,
      });
    } catch (err) {
      console.log("error", err, err.response);

      this.setState({
        errors: err.response.data.errors,
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <>
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={24} lg={24}>
              <Form.Item label="Services Name" className="ant-select-large">
                <Input
                  placeholder={this.props.servicesNamePlaceholder}
                  value={this.props.valueService}
                  className="ant-modal-input"
                  name="name"
                  onChange={this.handleAllChange}
                />
                <div role="alert" class="text-danger">
                  {this.state.errors.name}
                </div>
              </Form.Item>
            </Col>

            <Col span={24} lg={8}>
              <Form.Item label="Hours">
                <Input
                  placeholder={this.props.hours}
                  value={this.props.hoursValue}
                  className="ant-modal-input"
                  name="hours"
                  onChange={this.handleAllChange}
                />
                <div role="alert" class="text-danger">
                  {this.state.errors.hours}
                </div>
              </Form.Item>
            </Col>
            <Col span={24} lg={8}>
              <Form.Item label="Days">
                <Input
                  placeholder={this.props.days}
                  value={this.props.daysValue}
                  className="ant-modal-input"
                  name="days"
                  onChange={this.handleAllChange}
                />
                <div role="alert" class="text-danger">
                  {this.state.errors.days}
                </div>
              </Form.Item>
            </Col>
            <Col span={24} lg={8}>
              <Form.Item label="Production Rate">
                <Input
                  placeholder={this.props.productionRate}
                  value={this.props.rate}
                  className="ant-modal-input"
                  name="rate"
                  onChange={this.handleAllChange}
                />
                <div role="alert" class="text-danger">
                  {this.state.errors.rate}
                </div>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item className="text-center mt-4 mb-0">
                <div role="alert" class="text-success">
                  {this.state.message}
                </div>
                <Button className="ant-cancel-btn me-3">Cancel</Button>
                <Button
                  type="primary"
                  className="ant-add-button"
                  onClick={this.handleSubmit}
                >
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
