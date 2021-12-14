import React, { useEffect, useState } from "react";
import { Collapse, Input, Form, Row, Col, Button, message, Modal } from "antd";
import "react-phone-number-input/style.css";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { postData } from "../../../utils/fetchApi.js";
import { useParams, Navigate } from "react-router-dom";
import { getDistance, isExistsLeadEmail } from "../../../api/customer.js";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { getEmailSetting } from "../../../api/admin.js";
import { getOrganizationDetails } from "../../../api/organization.js";

export default function LeadInfo(props) {
  const params = useParams();
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [googleKey, setGoogleKey] = useState("");
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    coverPhoto: "",
    logo: "",
    teamPhoto: "",
  });
  const getAddressObject = (address_components) => {
    // console.log(address_components);
    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: [
        "administrative_area_level_1",
        "administrative_area_level_2",
        "administrative_area_level_3",
        "administrative_area_level_4",
        "administrative_area_level_5",
      ],
      city: [
        "locality",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "sublocality_level_4",
      ],
      country: ["country"],
    };

    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: "",
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);
      setAddressObj(addressObject);
    };
    func();

    // console.log("addressObjectCustomer", address);
    // console.log(companyDetails.address, "Organization address");
    if (companyDetails.address != "" && address != "") {
      const body = {
        origins: companyDetails.address,
        destinations: address.label,
      };
      // console.log(body);
      const func2 = async () => {
        const getFarness = await getDistance(body);
        // console.log(getFarness, "getFarnessgetFarnessgetFarness");
        if (getFarness.remote === "success") {
          // console.log(getFarness.data.Address, "getFarness.data.address");
          setState({
            ...state,
            distance: getFarness.data.Address,
          });
        }
      };
      func2();
    }
  }, [address]);

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
    emailExists: "",
    expandIconPosition: "right",
    value: "",
    setValue: "",
    isRedirect: false,
    message: "",
  });
  React.useEffect(() => {
    setState({ ...state, distance: "" });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingWarning, setIsLoadingWarning] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  const fetchEmailSettingData = async () => {
    const response = await getEmailSetting();
    if (response) {
      if (response.remote === "success") {
        setGoogleKey(response.data.googleKey);
      }
    }
    // console.log(googleKey, "googleKeygoogleKey");
  };

  const getUserOrganization = async () => {
    const details = await getOrganizationDetails();
    if (details.remote === "success") {
      setCompanyDetails(details.data);
    }
  };

  useEffect(() => {
    fetchEmailSettingData();
    getUserOrganization();

    const id = params.id;
    if (id) {
      const fetchData = async () => {
        const result = props.result;

        // setResponseData(result.data);
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
        setAddress(result.data.Data.address)
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
    // if (!state.address) {
    //   errors.address = "Address is required";
    //   message.error(errors.address, 5);
    // }
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

  const isEmailExists = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const response = await isExistsLeadEmail(state.email);
    if (response.remote === "success") {
      setIsWarning(true);
      return true;
    } else {
      setIsWarning(false);
      return false;
    }
  };

  const handleSubmit = async (event, saveAnyWay) => {
    setIsLoading(true);
    if (saveAnyWay) {
      setIsLoadingWarning(true);
    }
    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      // message.success(errors, 5);
      setIsLoading(false);
      if (saveAnyWay) {
        setIsLoadingWarning(false);
      }
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
    let isExists = false;
    if (!isWarning && !saveAnyWay && !state.id) {
      isExists = await isEmailExists();
    }
    if (!isExists) {
      const body = {
        name,
        email,
        contactNo,
        country,
        state: states,
        city,
        address: address.label,
        postalCode,
        distance,
        otherInformation,
        spouse,
      };
      try {
        await postData(`customer/add`, body);
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
        setIsWarning(false);
        setIsLoadingWarning(false);
        setIsLoading(false);
        message.success("New Customer Added!", 2);
      } catch (err) {
        setIsWarning(false);
        setIsLoadingWarning(false);
        setIsLoading(false);
        setState({
          ...state,
          message: err.response?.data?.errors,
          isLoading: false,
        });
      }
    }
  };

  const updatehandleSubmit = async (event) => {
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
      address: address.label,
      postalCode,
      distance,
      otherInformation,
      spouse,
    };
    // console.log("addres: ", body);

    try {
      await postData(`customer/update-info`, body);
      setState({
        ...state,
        errors: [],
        message: "New Data Updated!",
        isRedirect: true,
      });
    } catch (err) {
      setState({
        ...state,
        errors: err.response.data.errors,
        isLoading: false,
      });
    }
  };

  const updatehandleSpouseSubmit = async (event) => {
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

    try {
      await postData(`customer/update-info`, body);
      setState({
        ...state,
        errors: [],
        message: "New Data Updated!",
        isRedirect: true,
      });
    } catch (err) {
      setState({
        ...state,
        errors: err.response.data.errors,
        isLoading: false,
      });
    }
  };

  const { Panel } = Collapse;
  const { expandIconPosition } = state;
  const { TextArea } = Input;
  function callback(key) {
    // console.log(key);
  }

  console.log('add=======',state.address,state,address);

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
                        readOnly
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
                    <Form.Item label="Address" className="googleapi">
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyBC9O1b8JhFyUiE2kAU-ULbcio2siKePYU"
                     
                        selectProps={{
                        
                           
                          isClearable: true,
                          // value: ,
                          
                         placeholder: state.address?state.address:'Select..',
                          onChange: (val) => {
                            // console.log("val: ", val);
                            setAddress(val);
                          },
                        }}
                      />
                      {/* {state.address} */}
                      {/* <Input
                        className="radius-30"
                        size="large"
                        name="address"
                        value={state.address}
                        onChange={handleAllChange}
                      /> */}

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
                        {isLoading ? "Updateing..." : "Update Changes"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="add-btn ant-btn-primary"
                        onClick={handleSubmit}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
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
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={isWarning}
        footer={null}
        closeIcon={<InfoCircleOutlined />}
      >
        <p>Email Already exists! Are you really wan't to add it again?</p>
        <Row>
          <Col md={12} className="text-center">
            <Button
              type="text"
              onClick={() => {
                setIsWarning(false);
                setIsLoading(false);
              }}
              disabled={isLoadingWarning}
            >
              No
            </Button>
          </Col>
          <Col md={12}>
            <Button
              type="link"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoadingWarning}
            >
              {isLoadingWarning ? "Saving..." : "Save anyway"}
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
