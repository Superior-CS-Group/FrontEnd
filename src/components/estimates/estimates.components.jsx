import React, { Component } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import SlideItems from "./SlideItems.components";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Select,
  Input,
  Modal,
  message,
  Radio,
  Row,
  Col,
  Form,
  Divider,
  Checkbox,
  DatePicker,
  Space,
} from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import fillter from "../../images/fillter.png";
import Datatable from "./estimates.datatable.components";
import FilterSorting from "./filter/filter.sorting.component";

export default class MainEstimates extends Component {
  state = {
    ModalVisible: false,
  };
  showModal = () => {
    this.setState({ ModalVisible: true });
  };

  handleOk = () => {
    this.setState({ ModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ ModalVisible: false });
  };
  render() {
    const { RangePicker } = DatePicker;
    const { Option } = Select;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
    return (
      <>
        <div className="heading">
          <h1>Estimates</h1>
          <p>Recently adds</p>
        </div>
        <Carousel
          className="mb-3"
          show={3.5}
          slide={3}
          swiping={true}
          leftArrow={[
            <div className="button-arrow">
              <LeftOutlined />
            </div>,
          ]}
          rightArrow={[
            <div className="button-arrow ms-2">
              <RightOutlined />
            </div>,
          ]}
        >
          <SlideItems />
          <SlideItems />
          <SlideItems />
          <SlideItems />
          <SlideItems />
          <SlideItems />
        </Carousel>
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
              <span
                className="inline-block me-5 fillter-btn cursor-btn"
                onClick={this.showModal}
              >
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
                  <Option value="jack">
                    <Link to="/view-email"> Export to Email </Link>
                  </Option>
                  <Option value="lucy">Export to Text</Option>
                  <Option value="Yiminghe">Export to Video</Option>
                  <Option value="Yiminghe">Export to Excel</Option>
                  <Option value="Yiminghe">Delete</Option>
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

        <FilterSorting
          showModal={this.showModal}
          ModalVisible={this.state.ModalVisible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        />
      </>
    );
  }
}
