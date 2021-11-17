import React, { Component } from "react";
import { Row, Col, Select, Tabs, Button, Card } from "antd";

import {
  UserOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
// import Button from "@restart/ui/esm/Button";
import LeadInfo from "./lead.info.component";
import AddEstimates from "../add.estimates.components";
export default class CustomerLeadInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      size: "large",
      tabShow: true,
    };
  }
  onChangeTab = (val) => {
    if (val === "Lead") {
      this.setState({
        tabShow: true,
      });
    } else if (val === "Estimate") {
      this.setState({
        tabShow: false,
      });
    } else {
      console.log(null);
    }
  };
  render() {
    const { Option } = Select;
    const { size } = this.state;
    function onChange(value) {
      console.log(`selected ${value}`);
    }
    function callback(key) {
      console.log(key);
    }
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
                    <Select
                      size="large"
                      className="me-4 ant-bg-primary "
                      onChange={onChange}
                      bordered={false}
                      style={{ width: "150px" }}
                      defaultValue="Active"
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
                      onClick={() => this.onChangeTab("Lead")}
                      className={this.state.tabShow ? "active" : ""}
                    >
                      Lead Info
                    </li>
                    <li
                      onClick={() => this.onChangeTab("Estimate")}
                      className={!this.state.tabShow ? "active" : ""}
                    >
                      Estimate
                    </li>
                  </ul>
                </div>
              </Card>

              {this.state.tabShow === true ? (
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
}
