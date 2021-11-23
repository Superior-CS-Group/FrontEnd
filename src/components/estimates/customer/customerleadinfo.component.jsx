import React, { useEffect, useState, Component } from "react";
import { Row, Col, Select, Tabs, Button, Card, Switch } from "antd";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../../utils/fetchApi.js";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
// import Button from "@restart/ui/esm/Button";
import LeadInfo from "./lead.info.component";
import AddEstimates from "../add.estimates.components";
import { updateCustomerDetails } from "../../../api/customer.js";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
export default function CustomerLeadInfo() {
  const params = useParams();

  const [state, setState] = useState({
    size: "large",
    tabShow: true,
    activeStatus: "Active",
    customerid: "",
    customerName: "",
    autoReminderEmail: true,
    statusList: [],
    estimaitonStatus: "",
  });

  const onChangeTab = (val) => {
    if (val === "Lead") {
      setState({
        ...state,
        tabShow: true,
      });
    } else if (val === "Estimate") {
      setState({
        ...state,
        tabShow: false,
      });
    } else {
      console.log(null);
    }
  };

  const { Option } = Select;
  const { size } = state;
  function onChange(value) {
    // console.log(`selected ${value}`);
  }

  const autoReminderEmailHandleSubmit = async (e) => {
    // console.log(`selected ${e}`);
    let id = params.id;
    const body = {
      id: id,
      autoReminderEmail: e,
    };
    // console.log("body: ", body);
    const updateCustomer = await updateCustomerDetails(body);
    // console.log(updateCustomer, "update details");
    if (updateCustomer.remote === "success") {
      setState({
        ...state,
        errors: [],
        autoReminderEmail: e,
        message: "Data Updated!",
      });
    } else {
      setState({
        ...state,
        errors: updateCustomer.remote.data.errors,
        isLoading: false,
      });
    }
  };

  const updateStatusHandleSubmit = async (e) => {
    // console.log(`selected ${e}`);
    let id = params.id;
    const body = {
      id: id,
      estimaitonStatus: e,
    };
    console.log("body: ", body);
    const updateCustomer = await updateCustomerDetails(body);
    // console.log(updateCustomer, "update details");
    if (updateCustomer.remote === "success") {
      setState({
        ...state,
        errors: [],
        estimaitonStatus: e,
        message: "Data Updated!",
      });
    } else {
      setState({
        ...state,
        errors: updateCustomer.remote.data.errors,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    const id = params.id;

    if (id) {
      const body = { id };
      const fetchData = async () => {
        const result = await postData(`customer/get-info`, body);
        // console.log("result.data.Data",result.data.Data)
        let userstatus;
        let autoReminderEmail;

        if (result.data.Data.activeStatus === true) {
          userstatus = "Active";
        } else {
          userstatus = "Deactive";
        }
        if (result.data.Data.autoReminderEmail === true) {
          autoReminderEmail = "checked";
        } else {
          autoReminderEmail = "unchecked";
        }
        setState({
          ...state,
          id: id,
          customerName: result.data.Data.name,
          activeStatus: userstatus,
          estimaitonStatus: result.data.Data.estimaitonStatus,
          autoReminderEmail: autoReminderEmail,
        });
      };

      const fetchStatusData = async () => {
        const result = await getData(`status/list`, body);
        // console.log("statusresult", result);
        setState({
          ...state,
          statusList: result.data.Data,
        });
      };

      fetchData();
      fetchStatusData();
    }
  }, [params]);

  const updateActiveStatushandleSubmit = async (e) => {
    // console.log(localStorage.getItem("token"));
    let id = params.id;

    // setState({ ...state, activeStatus: e, isLoading: true });
    // console.log("body: activeStatus ", state.activeStatus);
    let activeStatus1;
    if (e === "Active") {
      activeStatus1 = true;
    } else {
      activeStatus1 = false;
    }
    const body = {
      id: id,
      activeStatus: activeStatus1,
    };
    // console.log("body: ", body);

    try {
      await postData(`customer/update-info`, body);
      setState({
        ...state,
        errors: [],
        activeStatus: e,
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

  return (
    <>
      <div className="bg-estimates">
        <div className="heading">
          <h1>Customer Leads</h1>
        </div>
        <Row>
          <Col md={24}>
            <Card
              bordered={false}
              bodyStyle={{ padding: "0px" }}
              className="radius-12"
            >
              <div className="fillter d-lg-flex align-items-center p-3">
                <span className="inline-block me-5 fillter-btn d-lg-flex align-items-center">
                  <UserOutlined className="me-2" /> {state.customerName}
                </span>
                <span className="inline-block me-4">
                  <b className="green-text">{state.estimaitonStatus}</b>
                </span>

                <div className="ms-auto col-lg-6 text-end d-inline-flex align-items-center justify-content-end">
                  <div role="alert" class="text-success">
                    {state.message}
                  </div>
                  <div className="float-start d-inline-flex align-items-center">
                    <span className="me-2">Auto Reminder Email </span>
                    <Switch
                      value={state.autoReminderEmail}
                      onChange={autoReminderEmailHandleSubmit}
                      className="me-2"
                    />
                  </div>

                  <Select
                    size="large"
                    className="me-4 ant-bg-primary "
                    bordered={false}
                    style={{ width: "150px" }}
                    value={state.estimaitonStatus}
                    name="estimaitonStatus"
                    onChange={updateStatusHandleSubmit}
                  >
                    {state.statusList.map((Datalist) => {
                      return (
                        <option value={Datalist.name}>{Datalist.name}</option>
                      );
                    })}
                  </Select>
                  {/* 
                  <Select
                    size="large"
                    className="me-4 ant-bg-primary "
                    bordered={false}
                    style={{ width: "150px" }}
                    value={state.activeStatus}
                    name="activeStatus"
                    onChange={updateActiveStatushandleSubmit}
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Deactive">Deactive</Option>
                  </Select> */}
                  <Button
                    style={{ width: "150px" }}
                    className="add-btn me-4 d-inline-flex align-items-center justify-content-center"
                    type="primary"
                    shape="round"
                    size={size}
                  >
                    <PhoneOutlined /> Contact
                  </Button>
                  {/* <Button
                    style={{ width: "150px" }}
                    className="add-btn d-inline-flex align-items-center justify-content-center"
                    type="primary"
                    shape="round"
                    size={size}
                  >
                    <ClockCircleOutlined /> Download
                  </Button> */}
                </div>
              </div>
              <div className="tab-div border-top">
                <ul className="">
                  <li
                    onClick={() => onChangeTab("Lead")}
                    className={state.tabShow ? "active" : ""}
                  >
                    Lead Info
                  </li>
                  <li
                    onClick={() => onChangeTab("Estimate")}
                    className={!state.tabShow ? "active" : ""}
                  >
                    Estimate
                  </li>
                </ul>
              </div>
            </Card>

            {state.tabShow === true ? (
              <div className="card-show mt-3 pb-3">
                <LeadInfo />
              </div>
            ) : (
              <div className="card-show mt-3">
                <AddEstimates />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
