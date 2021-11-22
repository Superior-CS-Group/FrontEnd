import React, { useEffect, useState, Component } from "react";
import { Row, Col, Select, Tabs, Button, Card } from "antd";
import { useParams } from "react-router-dom";
import { postData } from "../../../utils/fetchApi.js";
import {
  UserOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
// import Button from "@restart/ui/esm/Button";
import LeadInfo from "./lead.info.component";
import AddEstimates from "../add.estimates.components";

export default function CustomerLeadInfo() {
  const params = useParams();

  const [state, setState] = useState({
    size: "large",
    tabShow: true,
    activeStatus: "Active",
    customerid: "",
  });

  const onChangeTab = (val) => {
    if (val === "Lead") {
      setState({
        tabShow: true,
      });
    } else if (val === "Estimate") {
      setState({
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
  useEffect(() => {
    const id = params.id;

    if (id) {
      const body = { id };
      const fetchData = async () => {
        const result = await postData(`customer/get-info`, body);
        let userstatus;
        if (result.data.Data.activeStatus === true) {
          userstatus = "Active";
        } else {
          userstatus = "Deactive";
        }
        setState({
          ...state,
          id: id,
          activeStatus: userstatus,
        });
      };

      fetchData();
    }
  }, [params]);

  const updateActiveStatushandleSubmit = async (e) => {
    // console.log(localStorage.getItem("token"));
    let id = params.id;

    // setState({ ...state, activeStatus: e, isLoading: true });
    console.log("body: activeStatus ", state.activeStatus);
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
    console.log("body: ", body);

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
                  <UserOutlined className="me-2" /> UserName
                </span>
                <span className="inline-block me-4">
                  <b className="green-text">Follow up1</b>
                </span>

                <div className="ms-auto col-lg-5 text-right">
                  <div role="alert" class="text-success">
                    {state.message}
                  </div>
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
                  </Select>
                  <Button
                    style={{ width: "150px" }}
                    className="add-btn me-4 d-inline-flex align-items-center justify-content-center"
                    type="primary"
                    shape="round"
                    size={size}
                  >
                    <PhoneOutlined /> Contact
                  </Button>
                  <Button
                    style={{ width: "150px" }}
                    className="add-btn d-inline-flex align-items-center justify-content-center"
                    type="primary"
                    shape="round"
                    size={size}
                  >
                    <ClockCircleOutlined /> Download
                  </Button>
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
