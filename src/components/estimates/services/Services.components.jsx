import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import FillterTabs from "../fillterTabs.components";
import { Card, Table, Modal, Form, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { ellps } from "../../../utils/svg.file";

export default function Services() {
  const [ismadalvisable, setMadalvisable] = useState(false);
  const showModal = () => {
    setMadalvisable(true);
  };
  const handleCancel = () => {
    setMadalvisable(false);
  };
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const columns = [
    {
      title: (
        <>
          Service Name <span className="float-end">{ellps}</span>
        </>
      ),
      dataIndex: "name",
      render: (text) => <a>{text} </a>,
      width: 300,
    },
    {
      title: (
        <>
          Formula <span className="float-end">{ellps}</span>
        </>
      ),
      dataIndex: "formula",
      width: 300,
    },
    {
      title: (
        <Button onClick={showModal} type="primary">
          Add
        </Button>
      ),
      dataIndex: "view",
      className: "text-end",
      render: (text) => (
        <Link to="/v2/formula-tree" style={{ color: "inherit" }}>
          {text}
        </Link>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      name: `Demolition ${i}`,
      formula: "Formula one",
      view: <EyeOutlined />,
    });
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <>
      <BreadcrumbBar name="SERVICES" breaclass="mb-3" />
      <Card
        bordered={false}
        className="shadow estimate-card mb-4"
        style={{ borderRadius: "10px" }}
        bodyStyle={{ padding: "0px" }}
      >
        <FillterTabs />
        <div className="p-2 ant-table-seprate">
          <Table
            columns={columns}
            dataSource={data}
            className="ant-table-color ant-th-style"
            rowSelection={rowSelection}
            pagination={{ pageSize: 6 }}
            bordered={false}
          />
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
                <Button type="primary" disabled className="ant-confirm-button">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        title="Create new Service"
        visible={ismadalvisable}
        onCancel={handleCancel}
        footer={false}
        centered
        className="radius-20"
      >
        <Form layout="vertical">
          <Form.Item label="Service Name">
            <Input
              placeholder="Grading"
              size="large"
              className="ant-modal-input"
            />
          </Form.Item>
          <Form.Item className="text-end mb-0">
            <Link to="/v2/formula-tree">
              <Button
                type="primary"
                size="large"
                className="radius-30 ant-primary-btn font-15 px-5"
              >
                Next
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
