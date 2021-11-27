import React, { Component } from "react";
import { Button, Card, Select, Input, Modal, Radio } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import fillter from "../../images/fillter.png";
import TableData from "./material.table.component";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import Material from "./material.components";
import Services from "./services.components";
import ServicesTable from "./services.table.components";
import FilterSorting from "./filter/filter.sorting.component";
import { Link } from "react-router-dom";
import MaterialTable from "./material.table.component";
import { Nav } from "react-bootstrap";
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalVisible: false,
      visible: false,
      isMaterial: true,
      isProduct: true,
    };
  }

  showModal = () => {
    this.setState({ ModalVisible: true });
  };

  handleOk = () => {
    this.setState({ ModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ ModalVisible: false });
  };
  showModalNew = () => {
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
            onClick={this.showModalNew}
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
          <div>
            <Nav className="catlog-tabs" as="ul">
              <Nav.Item as="li">
                <Nav.Link className="active">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  Default View
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

              {/* <span className="ant-blue-plus">
                <PlusCircleOutlined
                  style={{ fontSize: "18px" }}
                  className="me-2"
                />{" "}
                Add Column
              </span> */}
              <div className="ms-auto col-lg-3">
                <Input
                  placeholder="Search catalog by name"
                  text="search"
                  className="ant-search-button"
                  suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
                />
              </div>
            </div>
          </div>
          <div className="p-2 ant-table-seprate">
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              className="mb-4"
              onChange={(e) =>
                this.setState({ isProduct: e.target.value === 1 })
              }
            >
              <Radio value={1}>Material</Radio>
              <Radio value={2}>Services</Radio>
            </Radio.Group>
            {this.state.isProduct ? <MaterialTable /> : <ServicesTable />}
          </div>
        </Card>
        <Modal
          title="Add New Material/Services "
          showModal={this.state.showModalNew}
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
            <Material placeholder="Hard Pipe" />
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
