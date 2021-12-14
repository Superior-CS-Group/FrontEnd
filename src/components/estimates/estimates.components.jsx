import React, { Component } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { Nav } from "react-bootstrap";
import { Modal, Form, Input } from "antd";
import Datatable from "./estimates.datatable.components";
import FilterSorting from "./filter/filter.sorting.component";
import { getData, postData } from "../../utils/fetchApi.js";
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
      isModalVisible: false,
      tabName: "",
      currentTab: -1,
      statusList: [],
      currentTabData: {},
    };
  }
  addTabsModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };
  addTabs = async () => {
    // const id = params.id;

    //   const body = { id };

    //     const result = await postData(`customer/get-info`, body);
    const tab = await postData(`tab-filter/add`, { name: this.state.tabName });
    console.log("tab===", tab);
    this.setState({
      isModalVisible: false,
      Tabs: [...this.state.Tabs, tab.data.Data],
      tabName: "",
    });
  };
  updateTab = (data) => {
    let finalD = data.data.Data;
    console.log("hey   hhhh", data);
    let tab = this.state.Tabs;
    // eslint-disable-next-line array-callback-return
    tab.map((t) => {
      if (t._id === finalD._id) {
        t.filterObject = finalD.filterObject;
        t.columnOrder = finalD.columnOrder;
      }
    });
    this.setState({ Tabs: tab });
  };

  RemoveTabs = async (index) => {
    let tab = this.state.Tabs;
    console.log(tab[index]);
    const delte = await postData(`tab-filter/delete`, { id: tab[index]._id });

    tab.splice(index, 1);
    this.setState({ Tabs: tab });
    console.log(tab, index, delte, "check remove array");
  };

  fetchApisData = async () => {
    const result = await getData(`estimation/upcoming-estimation`);
    //   const result2 = await postData(`estimation/filter-sort`,{ estimaitonStatus: [
    //    "New Lead - Multiple Contact Attempts",
    //    "Lead Added",
    //  ]});
    const getTabs = await getData(`tab-filter/list`);
    this.setState({
      estimateResults: result.data,
      estimateData: result.data.Data,
      loading: true,
      Tabs: getTabs.data.Data,
      // /statusList:statusLis.data.Data,

      smallLoader: false,
    });
    console.log("fetchApi=>", getTabs, result);
    return {
      result,
      getTabs,
    };
  };
  changeTab = (index) => {
    console.log("index", this.state.Tabs[index]);
    this.setState({
      currentTab: index,
      currentTabData: this.state.Tabs[index],
    });
  };
  componentDidMount = async () => {
    await this.fetchApisData();

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
    this.setState({ ModalVisible: false, isModalVisible: false });
  };
  render() {
    console.log(this.state);

    return (
      <>
        <BreadcrumbBar
          name="Dashboard "
          subname="Estimate Dashboard"
          breaclass="mb-3"
          link="/"
          sublink="estimating"
        />
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
                  show={5}
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
                            bodyStyle={{ padding: "15px" }}
                            className="shadow estimate-card mx-2 h-100"
                            style={{ borderRadius: "10px" }}
                          >
                            <div className="d-flex justify-content-end mb-3">
                              <Button className="ant-moving-button">
                                {value.customerLeadId[0].estimaitonStatus}
                              </Button>
                            </div>
                            {/* <div className="ant-estimate-text">
                              <span>Estimate</span>
                              <h2>#{value.leadInvoinceNo}</h2>
                            </div> */}
                            <div className="ant-estimate-text mb-3 line-height">
                              <span>Customer Name</span>
                              <h3>{value.customerLeadId[0].name}</h3>
                            </div>
                            <div className="d-flex align-items-start justify-content-between">
                              <div className="ant-estimate-text line-height pe-lg-2">
                                <span>Address</span>
                                <h4>{value.customerLeadId[0].address}</h4>
                              </div>
                              <div className="ant-estimate-text">
                                <span className="text-nowrap">Job Farness</span>
                                <h4>
                                  {value.customerLeadId[0].distance}
                                  {/* <small
                                    style={{
                                      marginLeft: "2px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Min
                                  </small> */}
                                </h4>
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
                  <Nav.Item as="li" key={-1}>
                    <Nav.Link
                      className={this.state.currentTab === -1 ? "active" : ""}
                    >
                      <b class="left-curve"></b>
                      <b class="right-curve"></b>
                      <p
                        onClick={() => {
                          this.setState({ currentTab: -1, currentTabData: {} });
                        }}
                      >
                        {" "}
                        Default View
                      </p>
                    </Nav.Link>
                  </Nav.Item>
                  {this.state.Tabs.map((tab, index) => {
                    return (
                      <Nav.Item as="li" key={index}>
                        <Nav.Link
                          className={
                            this.state.currentTab === index ? "active" : ""
                          }
                        >
                          <b class="left-curve"></b>
                          <b class="right-curve"></b>
                          <p onClick={() => this.changeTab(index)}>
                            {" "}
                            {tab.name}
                          </p>
                          <CloseOutlined
                            className="cursor-btn"
                            onClick={() => this.RemoveTabs(index)}
                          />
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                  <Nav.Item as="li">
                    <Nav.Link onClick={this.addTabsModal}>
                      <b class="left-curve"></b>
                      <b class="right-curve"></b>
                      <span>
                        <PlusCircleOutlined style={{ fontSize: "18px" }} />
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <div className="ant-table-seprate main-data-table">
                <Datatable
                  currentTabData={this.state.currentTabData}
                  updateTab={this.updateTab}
                />

                {/* <div className="ant-action-box d-flex align-items-center mt-2 pb-3">
                  <div className="ms-auto pe-3 ant-select-box ">
                    <Button className="radius-12 me-3" type="primary">
                      Save
                    </Button>
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
                {/* </div> */}
                {/* </div> */}
              </div>
            </Card>
          </>
        )}
        <FilterSorting
          showModal={this.showModal}
          ModalVisible={this.state.ModalVisible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          // leadStatus={this.state.statusList}
        />
        <Modal
          title="Create New Tab"
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={false}
          centered
          className="radius-20"
        >
          <Form layout="vertical">
            <Form.Item label="Tab Name">
              <Input
                placeholder="Filter by 90 Days"
                size="large"
                className="ant-modal-input"
                value={this.state.tabName}
                onChange={(e) => this.setState({ tabName: e.target.value })}
              />
            </Form.Item>
            <Form.Item className="text-end mb-0">
              <Button
                type="primary"
                size="large"
                className="radius-30 ant-primary-btn font-15 px-5"
                onClick={this.addTabs}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
