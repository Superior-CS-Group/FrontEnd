import React, { Component } from "react";
import { Button, Card, Select, Input} from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import fillter from "../../images/fillter.png";
import Datatable from "./estimates.datatable.components";

export default class MainEstimates extends Component {
  render() {
    const { Option } = Select;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    return (
      <>
        <div className="heading">
          <h1>Subscribers</h1>
          <p>New Users</p>
        </div>
        <Card
          bordered={false}
          className="shadow estimate-card mb-4"
          style={{ borderRadius: "10px" }}
          bodyStyle={{ padding: "0px" }}
        >
          <div className="view-tabs">
            <ul>
              <li className="active">Default View</li>
              <li>
                <span>
                  <PlusCircleOutlined style={{ fontSize: "18px" }} />
                </span>
              </li>
            </ul>
          </div>
          <div className="p-3 card-shadow pe-4 ps-5">
            <div className="fillter d-lg-flex align-items-center">
              <span className="inline-block me-5 fillter-btn">
                <img src={fillter} className="me-3" alt="" /> Filter and Sort
              </span>
              <span className="inline-block me-4">
                <Select
                  defaultValue="Filter"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="jack">Boulder</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </span>
              <span className="ant-blue-plus">
                <PlusCircleOutlined
                  style={{ fontSize: "18px" }}
                  className="me-2"
                />{" "}
                Add Column
              </span>
              <div className="ms-auto col-lg-3">
                <Input
                  placeholder="Search customers by name"
                  text="search"
                  className="ant-search-button"
                  suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
                />
              </div>
            </div>
          </div>
          <div className="p-2 ant-table-seprate">
            <Datatable />
            <div className="ant-action-box d-flex align-items-center mt-2 pb-3">
              <div className="ms-auto pe-3 ant-select-box ">
                <span className="me-3">Action:</span>
                <Select
                  defaultValue="What do yo want to do?"
                  onChange={handleChange}
                  style={{ width: "300px" }}
                >
                  <Option value="jack">What do yo want to do?</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <div className="text-end mt-3">
                  <Button
                    type="primary"
                    disabled
                    className="ant-confirm-button"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </>
    );
  }
}
