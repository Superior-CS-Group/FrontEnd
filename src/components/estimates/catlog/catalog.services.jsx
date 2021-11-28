/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import FillterTabs from "../fillterTabs.components";
import { Card, Table, Modal, Form, Input, Button, Select } from "antd";
import { Link, Navigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { ellps, Datel } from "../../../utils/svg.file";
import { createFormula, getAllFormula } from "../../../api/formula";

export default function CatalogServices() {
  const [ismadalvisable, setMadalvisable] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [redirect, setRedirect] = useState(false);
  React.useEffect(() => {
    fetchFormula();
  }, []);

  async function fetchFormula() {
    const result = await getAllFormula();
    if (result.remote === "success") {
      console.log(result.data.data);
      const data = result.data.data.map((item, idx) => {
        return {
          key: idx,
          ...item,
          view: <EyeOutlined />,
        };
      });
      setData(data);
    }
    console.log(result);
  }
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

  async function handleCreateFormula(e) {
    e.preventDefault();
    const body = {
      title,
    };
    console.log(body);
    const result = await createFormula(body);
    console.log(result);
    if (result.remote === "success") {
      console.log("result", result);
      setRedirect(`/catalog`);
      // setRedirect(`/v2/formula-tree?formulaId=${result.data.data._id}`);
    }
  }

  const columns = [
    {
      title: (
        <>
          Service Name <span className="float-end">{ellps}</span>
        </>
      ),
      dataIndex: "title",
      render: (text) => <a>{text} </a>,
      width: 530,
    },
    {
      title: (
        <>
          Formula <span className="float-end">{ellps}</span>
        </>
      ),
      dataIndex: "formula",
      width: 450,
    },
    {
      key: "_id",
      width: 300,
      title: (
        <Button onClick={showModal} type="primary">
          Add
        </Button>
      ),
      dataIndex: "view",
      className: "text-end",
      render: (view, tags) => {
        return (
          <>
            <Link
              to={`/v2/formula-tree?formulaId=${tags._id}`}
              style={{ color: "inherit" }}
            >
              {view}
            </Link>
            &nbsp;
            <span className="me-2 cursor-btn del-btn-svg">{Datel}</span>
          </>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <>
      <div className="p-2 ant-table-seprate">
        <Table
          columns={columns}
          dataSource={data}
          className="ant-table-color ant-th-style scroll-style munscher"
          rowSelection={rowSelection}
          pagination={false}
          bordered={false}
          scroll={{ y: 300 }}
        />
      </div>

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
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="text-end mb-0">
            <Button
              type="primary"
              size="large"
              className="radius-30 ant-primary-btn font-15 px-5"
              onClick={handleCreateFormula}
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
