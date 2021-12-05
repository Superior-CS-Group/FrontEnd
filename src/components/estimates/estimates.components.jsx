import React, { Component } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Card, Select, Skeleton } from "antd";
import { Nav } from "react-bootstrap";

import Datatable from "./estimates.datatable.components";
import FilterSorting from "./filter/filter.sorting.component";
import { getData } from "../../utils/fetchApi.js";
import SmallLoader from "../loader/smallLoader";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";

export default class MainEstimates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estimateResults: [],
      estimateData: [],
      Tabs: [],
      newTabs: {},
      smallLoader: true,
    };
  }
  addTabs = () => {
    this.setState({ Tabs: [...this.state.Tabs, this.state.newTabs] });
  };

  RemoveTabs = (index) => {
    this.state.newTabs = [...this.state.Tabs];
    this.state.Tabs.splice(index, -1);
    this.setState({ Tabs: this.state.newTabs });
    console.log(this.state.Tabs, "check remove array");
  };
  componentDidMount = async () => {
    const result = await getData(`estimation/upcoming-estimation`);
    setTimeout(() =>
      this.setState({
        estimateResults: result.data,
        estimateData: result.data.Data,
        loading: true,

        smallLoader: false,
      }),500
    );
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
        <BreadcrumbBar name="Dashboard " subname="Estimates" breaclass="mb-3" />
        {this.state.smallLoader ? (
          <>
            <div className="text-center d-flex align-items-center justify-content-center ht-100">
              <span className="">
                <SmallLoader />
                <p className="mt-2">Loading Please Wait....</p>
              </span>
            </div>
          </>
        ) : (
          <>
            <>
              {this.state.estimateData.length ? (
                <Carousel
                  className="mb-3"
                  show={4}
                  slide={2}
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
                      <>
                        <Link
                          to={`/customer-lead/${value.customerLeadId[0]._id}`}
                        >
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
                              <Button className="ant-moving-button">
                                {value.customerLeadId[0].estimaitonStatus}
                              </Button>
                            </div>
                            <div className="ant-estimate-text mb-3">
                              <span>Customer Name</span>
                              <h3>{value.customerLeadId[0].name}</h3>
                            </div>
                            <div className="d-flex align-items-start justify-content-between">
                              <div className="ant-estimate-text text-ellpis">
                                <span>Address</span>
                                <h3>{value.customerLeadId[0].address}</h3>
                              </div>
                              <div className="ant-estimate-text">
                                <span>Job Farness</span>
                                <h3>
                                  {value.customerLeadId[0].distance}
                                  <small
                                    style={{
                                      marginLeft: "2px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Km
                                  </small>
                                </h3>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </>
                    );
                  })}
                </Carousel>
              ) : (
                ""
              )}
            </>

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
                      Upcoming Estimates
                    </Nav.Link>
                  </Nav.Item>
                  {this.state.Tabs.map((tabs, index) => {
                    return (
                      <Nav.Item as="li" key={index}>
                        <Nav.Link>
                          <b class="left-curve"></b>
                          <b class="right-curve"></b>
                          Tab {index}{" "}
                          <CloseOutlined
                            className="cursor-btn"
                            onClick={this.RemoveTabs}
                          />
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                  <Nav.Item as="li">
                    <Nav.Link onClick={this.addTabs}>
                      <b class="left-curve"></b>
                      <b class="right-curve"></b>
                      <span>
                        <PlusCircleOutlined style={{ fontSize: "18px" }} />
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <div className="ant-table-seprate main-data-table px-2">
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
                      <Option value="lucy" disabled>
                        Export to Text
                      </Option>

                      <Option value="Yiminghe" disabled>
                        Export to Excel
                      </Option>
                    </Select>
                    {/* <div className="text-end mt-3">
                  <Button
                    type="primary"
                    disabled
                    className="ant-confirm-button"
                  >
                    Confirm
                  </Button>
                </div> */}
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
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
