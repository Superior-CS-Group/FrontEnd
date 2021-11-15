import React, { Component } from "react";
import { Button, Card, Select, Input, Modal, message, Radio } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import fillter from "../../images/fillter.png";
import TableData from "./table.component";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import Material from "./material.components";
import Services from "./services.components";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, isMaterial: true };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <BreadcrumbBar name="ESTIMATING" subname="CATELOG" />
          <Button
            onClick={this.showModal}
            type="primary"
            className="radius-30 ant-primary-btn font-15"
            size="large"
          >
            <PlusCircleOutlined style={{ fontSize: "24px" }} /> Add New Material
          </Button>
        </div>

        <Card
          bordered={false}
          className="card-depultview"
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
            <TableData />

            <div className="ant-action-box d-flex align-items-center mt-5 pb-3">
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
        <Modal
          title="Add New Material/Services "
          showModal={this.state.showModal}
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="ok"
          cancelText="Close"
          width={800}
          className="ant-modal-title-box"
          footer={false}
        >
          <Radio.Group
            name="radiogroup"
            defaultValue={1}
            className="mb-4"
            onChange={(e) =>
              this.setState({ isMaterial: e.target.value === 1 })
            }
          >
            <Radio value={1}>Material</Radio>
            <Radio value={2}>Services</Radio>
          </Radio.Group>
          {this.state.isMaterial ? (
            <Material
              placeholder="Hard Pipe"
              standard="Standard"
              unitplaceholder="2"
              costplaceholder="$0.25"
              upload="Upload Image"
            />
          ) : (
            <>
              <Services
                servicesNamePlaceholder="Run 3 downspouts underground roughly 10ft each"
                hours="4.5"
                days="0.11"
                productionRate="0.15"
              />
            </>
          )}
        </Modal>
      </>
    );
  }
}
