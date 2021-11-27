import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Input, Table, Button } from "antd";
import { Nav, Tab } from "react-bootstrap";

import {
  PlusCircleOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  UpCircleFilled,
  DownCircleFilled,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

import CataLogModal from "./catalog.modal";
import Addelement from "./add.element";
import AddItem from "./add.item";

export default function Catlog() {
  const [title, setTitle] = useState("Sub Category");
  const [isModal, setIsModal] = useState("");
  const addModal = () => {
    setIsModal("subcategory");
  };
  const handleOk = () => {
    setIsModal(false);
  };

  const handleCancel = () => {
    setIsModal("");
  };

  const expandedRowRender = () => {
    const columns = [
      { title: "", dataIndex: "title", key: "title", className: "font-bold" },
      { title: "", dataIndex: "name", key: "name" },
      { title: "", dataIndex: "quantity", key: "quantity" },

      { title: "", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "",
        dataIndex: "action",
        key: "action",
        className: "text-end",
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        title: "wire",
        name: "$0.40",
        quantity: "1",
        upgradeNum: "Item",
        action: (
          <>
            <Button
              type="text"
              shape="circle"
              className="me-2 d-inline-flex align-items-center justify-content-center"
            >
              <DeleteTwoTone />
            </Button>
            <Button
              type="text"
              shape="circle"
              className="d-inline-flex align-items-center justify-content-center"
            >
              <EditTwoTone />
            </Button>
          </>
        ),
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
    {
      title: "Action",
      key: "operation",
      render: () => (
        <>
          <Button
            type="text"
            shape="circle"
            className="me-2 d-inline-flex align-items-center justify-content-center"
          >
            <DeleteTwoTone />
          </Button>
          <Button
            type="text"
            shape="circle"
            className="d-inline-flex align-items-center justify-content-center"
          >
            <EditTwoTone />
          </Button>
        </>
      ),
      className: "text-end",
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

  const renderItem = () => {
    switch (isModal.isModal) {
      case "subcategory":
        return <Addelement handleCancel={handleCancel} />;
      case "additem":
        return <AddItem handleCancel={handleCancel} />;

      default:
        return "";
    }
  };

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
            <div className="p-3 card-shadow ">
              <div className="p-2">
                <div className="fillter d-lg-flex align-items-center">
                  <span
                    className="ant-blue-plus me-4"
                    onClick={() => {
                      setIsModal({ isModal: "subcategory" });
                      setTitle("Sub Category");
                    }}
                  >
                    <PlusCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Sub Category
                  </span>
                  <span
                    className="ant-blue-plus me-4"
                    onClick={() => {
                      setIsModal({ isModal: "additem" });
                      setTitle("Add Item");
                    }}
                  >
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
                      placeholder="Search catalog by name"
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
                    expandable={{
                      expandedRowRender,
                      expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                          <UpCircleFilled
                            style={{ color: "#3483FA" }}
                            onClick={(e) => onExpand(record, e)}
                          />
                        ) : (
                          <DownCircleFilled
                            style={{ color: "#3483FA" }}
                            onClick={(e) => onExpand(record, e)}
                          />
                        ),
                    }}
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
      <CataLogModal
        title={title}
        addModal={addModal}
        isModal={isModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        content={renderItem()}
        width={575}
      />
    </>
  );
}
