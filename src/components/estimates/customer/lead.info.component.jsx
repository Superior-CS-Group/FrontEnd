import React, { useEffect, useState } from "react";
import { Collapse, Input, Form, Row, Col, Button, message } from "antd";
import "react-phone-number-input/style.css";
import { UserOutlined, CheckOutlined } from "@ant-design/icons";
import { postData } from "../../../utils/fetchApi.js";
import PhoneInput from "react-phone-number-input";
import { useParams, Navigate } from "react-router-dom";

export default function LeadInfo(props) {
  const params = useParams();

  // let [responseData, setResponseData] = useState({ name: "", email: "" });
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    contactNo: "",
    country: "US",
    states: "",
    city: "",
    postalCode: "",
    address: "",
    otherNote: "",
    distance: "",
    otherInformation: "",
    spouseName: "",
    spouseEmail: "",
    spousePhone: "",
    spouseOtherInfo: "",
    size: "large",
    tabShow: true,
    isValidEmail: false,
    isLoading: false,
    errors: {},
    emailExists:"",
    expandIconPosition: "right",
    value: "",
    setValue: "",
    isRedirect: false,
    message: "",
  });
  useEffect(() => {
    console.log("props ", props);
    const id = params.id;

    if (id) {
      const body = { id };
      const fetchData = async () => {
        const result = props.result;

        // setResponseData(result.data);
        // console.log(responseData.Data.address);
        setState({
          ...state,
          id: id,
          name: result.data.Data.name,
          email: result.data.Data.email,
          contactNo: result.data.Data.contactNo,
          country: result.data.Data.country,
          states: result.data.Data.state,
          city: result.data.Data.city,
          postalCode: result.data.Data.postalCode,
          address: result.data.Data.address,
          distance: result.data.Data.distance,
          otherNote: result.data.Data.otherNote,
          otherInformation: result.data.Data.otherInformation,
          spouseName: result.data.Data.spouse[0]
            ? result.data.Data.spouse[0].name
            : "",
          spouseEmail: result.data.Data.spouse[0]
            ? result.data.Data.spouse[0].email
            : "",
          spousePhone: result.data.Data.spouse[0]
            ? result.data.Data.spouse[0].phone
            : "",
          spouseOtherInfo: result.data.Data.spouse[0]
            ? result.data.Data.spouse[0].otherInfo
            : "",
        });
      };

      fetchData();
    } else {
      setState({
        ...state,
        id: "",
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
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const validateFields = () => {
    const errors = {};
    if (!state.name) {
      errors.name = "Customer Name is required";
      message.error(errors.name, 5);
    }
    if (!state.email) {
      errors.email = "Email Id is required";
      message.error(errors.email, 5);
    } else if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(state.email)) {
      errors.email = "Invalid Email";
      message.error(errors.email, 5);
    }
    if (!state.contactNo) {
      errors.contactNo = "Contact No is required";
      message.error(errors.contactNo, 5);
    }
    // if (!state.country) {
    //   errors.country = "Country is required";
    //   message.error(errors.country, 5);
    // }
    if (!state.states) {
      errors.states = "State is required";
      message.error(errors.states, 5);
    }
    if (!state.city) {
      errors.city = "City is required";
      message.error(errors.city, 5);
    }
    if (!state.postalCode) {
      errors.postalCode = "Postal Code is required";
      message.error(errors.postalCode, 5);
    }
    if (!state.address) {
      errors.address = "Address is required";
      message.error(errors.address, 5);
    }
    // if (!this.state.otherInformation) {
    //   errors.otherInformation = "Address is not blank";
    // }

    // if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(state.spouseEmail)) {
    //   errors.spouseEmail = "Email is not valid";
    //   message.error(errors.spouseEmail, 5);
    // }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  const handleAllChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errors: {},
    });
  };

  const handleSubmit = async (event) => {
    // console.log(localStorage.getItem("token"));

    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      // message.success(errors, 5);
      return;
    }
    const spouse = {
      name: state.spouseName,
      email: state.spouseEmail,
      phone: state.spousePhone,
      otherInfo: state.spouseOtherInfo,
    };
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
      distance,
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
      distance,
      otherInformation,
      spouse,
    };
    // console.log("body: ", body);

    try {
      await postData(`customer/add`, body);
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
        isRedirect: true,
      });
      message.success("New Customer Added!", 2);
    } catch (err) {
      console.log("error", err, err.response);

      setState({
        ...state,
        emailExists: err.response?.data?.errors,
        isLoading: false,
      });
      message.error(err.response?.data?.errors, 2);
    }
  };

  const updatehandleSubmit = async (event) => {
    // console.log(localStorage.getItem("token"));
    event.preventDefault();
    let id = state.id;

    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      return;
    }

    const spouse = {
      name: state.spouseName,
      email: state.spouseEmail,
      phone: state.spousePhone,
      otherInfo: state.spouseOtherInfo,
    };
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
      distance,
      otherInformation,
    } = state;
    const body = {
      id,
      name,
      email,
      contactNo,
      country,
      state: states,
      city,
      address,
      postalCode,
      distance,
      otherInformation,
      spouse,
    };
    console.log("body: ", body);

    try {
      const result = await postData(`customer/update-info`, body);
      console.log("result: ", result);
      setState({
        ...state,
        errors: [],
        message: "New Data Updated!",
        isRedirect: true,
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

  const updatehandleSpouseSubmit = async (event) => {
    // console.log(localStorage.getItem("token"));
    event.preventDefault();
    let id = state.id;

    setState({ ...state, errors: {} });

    const spouse = {
      name: state.spouseName,
      email: state.spouseEmail,
      phone: state.spousePhone,
      otherInfo: state.spouseOtherInfo,
    };
    setState({ ...state, isLoading: true });

    const body = {
      id,
      spouse,
    };
    console.log("body: ", body);

    try {
      const result = await postData(`customer/update-info`, body);
      console.log("result: ", result);
      setState({
        ...state,
        errors: [],
        message: "New Data Updated!",
        isRedirect: true,
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

  const updateActiveStatushandleSubmit = async (event) => {
    // console.log(localStorage.getItem("token"));
    let id = state.id;

    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      return;
    }
    setState({ ...state, isLoading: true });

    const { activeStatus } = state;
    const body = {
      id,
      activeStatus,
    };
    // console.log("body: ", body);

    try {
      const result = await postData(`customer/update-info`, body);
      // console.log("result: ", result);
      setState({
        ...state,
        errors: [],
        message: "Data Updated!",
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

  if (state.isRedirect) {
    return <Navigate to="/estimating" />;
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
                <Row gutter={[24, 0]}>
                  <Col md={12}>
                    <Form.Item label="Full Name">
                      <Input
                        className="radius-30"
                        size="large"
                        name="name"
                        value={state.name}
                        onChange={handleAllChange}
                      />
                      {/* <div role="alert" class="text-danger">
                    {state.errors.name}
                  </div> */}
                    </Form.Item>{" "}
                  </Col>
                  <Col md={12}>
                    <Form.Item label="Email">
                      <Input
                        className="radius-30"
                        size="large"
                        name="email"
                        value={state.email}
                        onChange={handleAllChange}
                      />
                      {/* <div role="alert" class="text-danger">
                    {state.errors.email}
                  </div> */}
                      <div role="alert" class="text-danger">
                        {state.emailExists}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item label="Phone">
                      {/* <Input suffix={<CheckOutlined />} /> */}
                      <Input
                        // international
                        // defaultCountry="RU"
                        className="radius-30"
                        size="large"
                        name="contactNo"
                        value={state.contactNo}
                        onChange={handleAllChange}
                      />
                      {/* <div role="alert" class="text-danger">
                        {state.errors.contactNo}
                      </div> */}
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item label="Job Farness">
                      <Input
                        className="radius-30"
                        size="large"
                        name="distance"
                        placeholder="Minute"
                        value={state.distance}
                        onChange={handleAllChange}
                      />
                    </Form.Item>
                  </Col>{" "}
                </Row>
              </Col>

              <Col md={12}>
                {/* <Form.Item label="Country">
                  <Input
                    className="radius-30"
                    size="large"
                    name="country"
                    value={state.country}
                    onChange={handleAllChange}
                  />
                  
                </Form.Item> */}
                <Row gutter={[24, 0]}>
                  <Col md={12}>
                    <Form.Item label="City ">
                      <Input
                        className="radius-30"
                        size="large"
                        name="city"
                        value={state.city}
                        onChange={handleAllChange}
                      />
                      {/* <div role="alert" class="text-danger">
                        {state.errors.city}
                      </div> */}
                    </Form.Item>
                  </Col>{" "}
                  <Col md={12}>
                    <Form.Item label="State">
                      <Input
                        className="radius-30"
                        size="large"
                        name="states"
                        value={state.states}
                        onChange={handleAllChange}
                      />
                      {/* <div role="alert" class="text-danger">
                        {state.errors.states}
                      </div> */}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 0]}>
                  <Col md={12}>
                    <Form.Item label="Address">
                      <Input
                        className="radius-30"
                        size="large"
                        name="address"
                        value={state.address}
                        onChange={handleAllChange}
                      />
                      {/* <div role="alert" class="text-danger">
                        {state.errors.address}
                      </div> */}
                    </Form.Item>
                  </Col>{" "}
                  <Col md={12}>
                    <Form.Item label="Zip code">
                      <Input
                        className="radius-30"
                        size="large"
                        name="postalCode"
                        value={state.postalCode}
                        onChange={handleAllChange}
                      />
                      {/* <div role="alert" class="text-danger">
                        {state.errors.postalCode}
                      </div> */}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col md={24}>
                <Form.Item label="Other Information">
                  <TextArea
                    className="radius-30"
                    size="large"
                    rows={4}
                    name="otherInformation"
                    value={state.otherInformation}
                    onChange={handleAllChange}
                  />
                  {/* <div role="alert" class="text-danger">
                    {state.errors.otherInformation}
                  </div> */}
                </Form.Item>
              </Col>
              <Col md={24}>
                <div className="text-right">
                  <div role="alert" class="text-success">
                    {state.message}
                  </div>
                  {state.id ? (
                    <>
                      <Button
                        className="add-btn ant-btn-primary"
                        onClick={updatehandleSubmit}
                      >
                        Update Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="add-btn ant-btn-primary"
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </Button>
                    </>
                  )}
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
                  <Input
                    className="radius-30"
                    size="large"
                    name="spouseName"
                    value={state.spouseName}
                    onChange={handleAllChange}
                  />
                </Form.Item>{" "}
                <Form.Item label="Email">
                  <Input
                    className="radius-30"
                    size="large"
                    name="spouseEmail"
                    value={state.spouseEmail}
                    onChange={handleAllChange}
                  />
                  {/* <div role="alert" class="text-danger">
                    {state.errors.spouseEmail}
                  </div> */}
                </Form.Item>
                <Form.Item label="Phone">
                  <Input
                    className="radius-30"
                    size="large"
                    name="spousePhone"
                    value={state.spousePhone}
                    onChange={handleAllChange}
                  />
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item label="Other Information">
                  <TextArea
                    className="radius-30"
                    size="large"
                    name="spouseOtherInfo"
                    value={state.spouseOtherInfo}
                    onChange={handleAllChange}
                    rows={4}
                  />
                </Form.Item>
              </Col>

              <Col md={24}>
                <div className="text-right">
                  {state.id ? (
                    <>
                      <Button
                        className="add-btn ant-btn-primary"
                        onClick={updatehandleSpouseSubmit}
                      >
                        Update Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="add-btn ant-btn-primary"
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </>
  );
}
