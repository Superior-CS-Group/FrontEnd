import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Select, Input, Table, Badge, Button, Space } from "antd";
import { Nav, Tab } from "react-bootstrap";

import {
  PlusCircleOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import fillter from "../../../images/fillter.png";
import FilterSorting from "../filter/filter.sorting.component";

export default function Catlog() {
  const { Option } = Select;
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const expandedRowRender = () => {
    const columns = [
      { title: "", dataIndex: "title", key: "title", className: "font-bold" },
      { title: "", dataIndex: "name", key: "name" },
      { title: "", dataIndex: "quantity", key: "quantity" },

      { title: "", dataIndex: "upgradeNum", key: "upgradeNum" },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        title: "wire",
        name: "$0.40",
        quantity: "1",
        upgradeNum: "Item",
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={false}
        className="ant-table-expand"
      />
    );
  };

  const columns = [
    { title: "Pipe", dataIndex: "name", key: "name", className: "font-bold" },
    {
      title: "Prize",
      dataIndex: "platform",
      key: "platform",
      className: "green-color",
    },
    { title: "Quantity", dataIndex: "version", key: "version" },

    { title: "Item", dataIndex: "creator", key: "creator" },

    {
      title: "Action",
      key: "operation",
      render: () => (
        <>
          <Button
            shape="circle"
            type="danger"
            className="me-2 d-inline-flex align-items-center justify-content-center"
          >
            <DeleteOutlined />
          </Button>
          <Button
            type="primary"
            shape="circle"
            className="d-inline-flex align-items-center justify-content-center"
          >
            <EditOutlined />
          </Button>
        </>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 6; ++i) {
    data.push({
      key: i,
      name: "Perforated Drain Pipe",
      platform: "$2.00-$2.80",

      version: "1",

      creator: "Element",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  return (
    <>
      <BreadcrumbBar
        name="Dashboard "
        subname="Estimates"
        subtitle="Catalog"
        breaclass="mb-3"
      />
      <div className="ant-catlog-main">
        <Card
          bordered={false}
          className="radius-9"
          bodyStyle={{ padding: "0px" }}
        >
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav className="catlog-tabs" as="ul">
              <Nav.Item as="li">
                <Nav.Link eventKey="first">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  Materials
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="second">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>Services
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="three">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>Packages
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="radius-9 p-3">
              <div className="card-shadow p-2">
                <div className="fillter d-lg-flex align-items-center">
                  <span
                    className="inline-block me-4 fillter-btn cursor-btn"
                    onClick={showModal}
                  >
                    <img src={fillter} className="me-3" alt="" /> Filter and
                    Sort
                  </span>

                  <span className="ant-blue-plus me-4">
                    <PlusCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Add Element
                  </span>
                  <span className="ant-blue-plus me-4">
                    <PlusCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Add Item
                  </span>
                  <span className="ant-text-danger me-4">
                    <CloseCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Delete catalog
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
              <Tab.Content className="mt-2">
                <Tab.Pane eventKey="first">
                  <Table
                    bordered={false}
                    className="components-table-demo-nested"
                    columns={columns}
                    expandable={{ expandedRowRender }}
                    dataSource={data}
                    pagination={false}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">Comming Soon Services</Tab.Pane>
                <Tab.Pane eventKey="three">Comming Soon Packages</Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Card>
      </div>

      <FilterSorting
        showModal={showModal}
        ModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
}
