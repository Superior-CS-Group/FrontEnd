import React, { Component } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Select, Input, DatePicker } from "antd";
import { Nav } from "react-bootstrap";

import fillter from "../../images/fillter.png";
import Datatable from "./estimates.datatable.components";
import FilterSorting from "./filter/filter.sorting.component";
import { getData } from "../../utils/fetchApi.js";

export default class MainEstimates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estimateResults: [],
      estimateData: [],
    };
  }

  componentDidMount = async () => {
    const result = await getData(`estimation/upcoming-estimation`);
    this.setState({
      estimateResults: result.data,
      estimateData: result.data.Data,
    });
    // console.log("estimateResults:", this.state.estimateData);
  };

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
    const { Option } = Select;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <>
        <div className="heading">
          <h1>Estimates</h1>
          <p>Upcoming Estimates</p>
        </div>
        {this.state.estimateData.length ? (
          <Carousel
            className="mb-3"
            show={3}
            slide={3}
            infinite={true}
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
            {this.state.estimateData.map((value) => {
              // console.log(value.customerLeadId[0].email,"valuecustomerLeadId")
              return (
                <Card
                  bordered={false}
                  className="shadow estimate-card m-3"
                  style={{ borderRadius: "10px" }}
                >
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="ant-estimate-text">
                      <span>Estimate</span>
                      <h2>#{value.leadInvoinceNo}</h2>
                    </div>
                    <Button className="ant-moving-button">Moving FWD</Button>
                  </div>
                  <div className="ant-estimate-text mb-3">
                    <span>Costumer Name</span>
                    <h2>{value.customerLeadId[0].name}</h2>
                  </div>
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="ant-estimate-text">
                      <span>Adress</span>
                      <h2>{value.customerLeadId[0].address}</h2>
                    </div>
                    <div className="ant-estimate-text">
                      <span>Distance</span>
                      <h2>
                        6.3<sub className="ms-2">km</sub>
                      </h2>
                    </div>
                  </div>
                </Card>
              );
            })}
          </Carousel>
        ) : (
          ""
        )}
        <Card
          bordered={false}
          className="shadow estimate-card mb-4"
          style={{ borderRadius: "25px" }}
          bodyStyle={{ padding: "0px" }}
        >
          <div>
            <Nav className="catlog-tabs" as="ul">
              <Nav.Item as="li">
                <Nav.Link className="active">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  Materials
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link>
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  <span>
                    <PlusCircleOutlined style={{ fontSize: "18px" }} />
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="p-3 card-shadow pe-4 ps-5">
            <div className="fillter d-lg-flex align-items-center">
              <span
                className="inline-block me-5 fillter-btn cursor-btn"
                onClick={this.showModal}
              >
                <img src={fillter} className="me-3" alt="" /> Filter and Sort
              </span>
              {/* <span className="inline-block me-4">
                <Select
                  defaultValue="Filter"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="jack">Boulder</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </span> */}
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
                    <Link to="/view-email">Export to Email</Link>
                  </Option>
                  <Option value="lucy">
                    <Link to="/view-email">Export to Text</Link>
                  </Option>

                  <Option value="Yiminghe">
                    <Link to="/view-email">Export to Excell</Link>
                  </Option>
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

        <div className="heading mt-4">
          <p>Estimate Sent</p>
        </div>
        <Card
          bordered={false}
          className="shadow estimate-card mt-2 mb-4"
          style={{ borderRadius: "25px" }}
          bodyStyle={{ padding: "0px" }}
        >
          <div>
            <Nav className="catlog-tabs" as="ul">
              <Nav.Item as="li">
                <Nav.Link className="active">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  Materials
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link>
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  <span>
                    <PlusCircleOutlined style={{ fontSize: "18px" }} />
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="p-3 card-shadow pe-4 ps-5">
            <div className="fillter d-lg-flex align-items-center">
              <span
                className="inline-block me-5 fillter-btn cursor-btn"
                onClick={this.showModal}
              >
                <img src={fillter} className="me-3" alt="" /> Filter and Sort
              </span>
              {/* <span className="inline-block me-4">
                <Select
                  defaultValue="Filter"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="jack">Boulder</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </span> */}
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
                    <Link to="/view-email">Export to Email</Link>
                  </Option>
                  <Option value="lucy">
                    <Link to="/view-email">Export to Text</Link>
                  </Option>

                  <Option value="Yiminghe">
                    <Link to="/view-email">Export to Excell</Link>
                  </Option>
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
