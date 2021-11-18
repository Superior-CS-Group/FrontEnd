import React, { useEffect, useState } from "react";
import { Collapse, Input, Form, Row, Col, Button } from "antd";
import "react-phone-number-input/style.css";
import { UserOutlined, CheckOutlined } from "@ant-design/icons";
import { postData } from "../../../utils/fetchApi.js";

import { useParams } from "react-router-dom";

export default function LeadInfo() {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    email: "",
    contactNo: "",
    country: "",
    states: "",
    city: "",
    postalCode: "",
    address: "",
    otherNote: "",
    otherInformation: "",
    size: "large",
    tabShow: true,
    isValidEmail: false,
    isLoading: false,
    errors: {},
    expandIconPosition: "right",
    value: "",
    setValue: "",
  });

  useEffect(() => {
    console.log("params: ", params);
  }, []);

  const validateFields = () => {
    const errors = {};
    if (!state.name) {
      errors.name = "Customer Name is not blank";
    }
    if (!state.email) {
      errors.email = "Email Id is not blank";
    }
    if (!state.contactNo) {
      errors.contactNo = "Contact No is not blank";
    }
    if (!state.country) {
      errors.country = "Country is not blank";
    }
    if (!state.states) {
      errors.states = "State is not blank";
    }
    if (!state.city) {
      errors.city = "City is not blank";
    }
    if (!state.postalCode) {
      errors.postalCode = "Postal Code is not blank";
    }
    if (!state.address) {
      errors.address = "Address is not blank";
    }
    // if (!this.state.otherInformation) {
    //   errors.otherInformation = "Address is not blank";
    // }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(state.email)) {
      errors.email = "Email is not valid";
      // this.setState({ isValidEmail:false})
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  const handleAllChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    // console.log(localStorage.getItem("token"))

    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      return;
    }
    setState({ ...state, isLoading: true });
    const {
      name,
      email,
      contactNo,
      country,
      states,
      city,
      address,
      postalCode,
      otherInformation,
    } = state;
    const body = {
      name,
      email,
      contactNo,
      country,
      state: states,
      city,
      address,
      postalCode,
      otherInformation,
    };
    // console.log("body: ", body);

    try {
      const result = await postData(`customer/add`, body);
      // console.log("result: ", result);
      setState({
        ...state,
        message: "New Customer Added!",
        name: "",
        email: "",
        contactNo: "",
        country: "",
        states: "",
        city: "",
        postalCode: "",
        address: "",
        otherNote: "",
        otherInformation: "",
        isLoading: false,
      });
    } catch (err) {
      console.log("error", err, err.response);

      setState({
        ...state,
        errors: err.response.data.errors,
        isLoading: false,
      });
    }
  };
  const { value, setValue } = state;
  const { Panel } = Collapse;
  const { expandIconPosition } = state;
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
                  <Input size="large" name="name" onChange={handleAllChange} />
                  <div role="alert" class="text-danger">
                    {state.errors.name}
                  </div>
                </Form.Item>{" "}
                <Form.Item label="Email">
                  <Input
                    size="large"
                    suffix={<CheckOutlined />}
                    name="email"
                    onChange={handleAllChange}
                  />
                  <div role="alert" class="text-danger">
                    {state.errors.email}
                  </div>
                </Form.Item>
                <Form.Item label="Phone">
                  {/* <Input suffix={<CheckOutlined />} /> */}
                  <Input
                    // international
                    // defaultCountry="RU"
                    suffix={<CheckOutlined />}
                    size="large"
                    name="contactNo"
                    onChange={handleAllChange}
                  />
                  <div role="alert" class="text-danger">
                    {state.errors.contactNo}
                  </div>
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item label="Country">
                  <Input
                    size="large"
                    suffix={<CheckOutlined />}
                    name="country"
                    onChange={handleAllChange}
                  />
                  <div role="alert" class="text-danger">
                    {state.errors.country}
                  </div>
                </Form.Item>
                <Row gutter={[24, 0]}>
                  <Col md={12}>
                    <Form.Item label="City ">
                      <Input
                        size="large"
                        suffix={<CheckOutlined />}
                        name="city"
                        onChange={handleAllChange}
                      />
                      <div role="alert" class="text-danger">
                        {state.errors.city}
                      </div>
                    </Form.Item>
                  </Col>{" "}
                  <Col md={12}>
                    <Form.Item label="State">
                      <Input
                        size="large"
                        suffix={<CheckOutlined />}
                        name="state"
                        onChange={handleAllChange}
                      />
                      <div role="alert" class="text-danger">
                        {state.errors.states}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 0]}>
                  <Col md={12}>
                    <Form.Item label="Address">
                      <Input
                        size="large"
                        suffix={<CheckOutlined />}
                        name="address"
                        onChange={handleAllChange}
                      />
                      <div role="alert" class="text-danger">
                        {state.errors.address}
                      </div>
                    </Form.Item>
                  </Col>{" "}
                  <Col md={12}>
                    <Form.Item label="Zip code">
                      <Input
                        size="large"
                        suffix={<CheckOutlined />}
                        name="postalCode"
                        onChange={handleAllChange}
                      />
                      <div role="alert" class="text-danger">
                        {state.errors.postalCode}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col md={24}>
                <Form.Item label="Other Information">
                  <TextArea
                    size="large"
                    rows={4}
                    name="otherInformation"
                    onChange={handleAllChange}
                  />
                  <div role="alert" class="text-danger">
                    {state.errors.otherInformation}
                  </div>
                </Form.Item>
              </Col>
              <Col md={24}>
                <div className="text-right">
                  <div role="alert" class="text-success">
                    {state.message}
                  </div>
                  <Button
                    className="add-btn ant-btn-primary"
                    onClick={handleSubmit}
                  >
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
