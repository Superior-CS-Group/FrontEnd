import React, { Component } from "react";
import { Row, Col, Select, Tabs, Button } from "antd";

import {
  UserOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
// import Button from "@restart/ui/esm/Button";
import LeadInfo from "./lead.info.component";
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
    const { TabPane } = Tabs;
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
              <div className="card-shadow p-3">
                <div className="fillter d-lg-flex align-items-center">
                  <span className="inline-block me-5 fillter-btn d-lg-flex align-items-center">
                    <UserOutlined /> UserName
                  </span>
                  <span className="inline-block me-4">
                    <b className="green-text">Follow up1</b>
                  </span>

                  <div className="ms-auto col-lg-5 text-right">
                    <Select
                      className=" me-4"
                      showSearch
                      style={{ width: 120 }}
                      placeholder="Change Status"
                      optionFilterProp="children"
                      onChange={onChange}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="jack">Active</Option>
                      <Option value="lucy">Deactive</Option>
                    </Select>
                    <Button
                      className=" add-btn ant-btn-primary me-4"
                      type="primary"
                      shape="round"
                      size={size}
                    >
                      <PhoneOutlined /> Contact
                    </Button>
                    <Button
                      className=" add-btn ant-btn-primary"
                      type="primary"
                      shape="round"
                      size={size}
                    >
                      <ClockCircleOutlined /> Download
                    </Button>
                  </div>
                </div>
              </div>

              <div className="tab-div">
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
              {this.state.tabShow === true ? (
                <div className="card-show mt-3 pb-3">
                  <LeadInfo />
                  <div className="text-center">
                    {/* <Button type="primary" shape="circle">
                      <PlusCircleOutlined />
                    </Button>
                    Add Information{" "} */}
                  </div>
                </div>
              ) : (
                <div className="card-show mt-3">Coming Soon</div>
              )}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
