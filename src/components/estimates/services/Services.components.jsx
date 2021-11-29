/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import FillterTabs from "../fillterTabs.components";
import { Card, Table, Modal, Form, Input, Button } from "antd";
import { Link, Navigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { ellps, Datel } from "../../../utils/svg.file";
import { createFormula, getAllFormula } from "../../../api/formula";
import DeleteModal from "../../modal/deleteModal.component";

export default function Services() {
  const [ismadalvisable, setMadalvisable] = useState(false);
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [title, setTitle] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  React.useEffect(() => {
    fetchFormula();
  }, []);
  const handleDeleteData = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteOk = () => {
    setShowDeleteModal(false);
  };
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };
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
      setFiltredData(data);
    }
    console.log(result);
  }
  const showModal = () => {
    setMadalvisable(true);
  };
  const handleCancel = () => {
    setMadalvisable(false);
  };

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
      setRedirect(`/v2/formula-tree?formulaId=${result.data.data._id}`);
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
      width: 450,
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
            <span
              className="me-2 cursor-btn del-btn-svg"
              onClick={handleDeleteData}
            >
              {Datel}
            </span>
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

  const handleFilterService = (e) => {
    const { value } = e.target;
    const filtredData = data.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setFiltredData(filtredData);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <>
      <BreadcrumbBar name="SERVICES" breaclass="mb-3" />
      <Card
        bordered={false}
        className="shadow estimate-card mb-4"
        style={{ borderRadius: "10px" }}
        bodyStyle={{ padding: "0px" }}
      >
        <FillterTabs
          name="Default View"
          placeholder="Search services by name"
          onChange={handleFilterService}
        />
        <div className="p-2 ant-table-seprate">
          <Table
            columns={columns}
            dataSource={filtredData}
            className="ant-table-color ant-th-style scroll-style munscher"
            rowSelection={rowSelection}
            pagination={false}
            bordered={false}
            scroll={{ y: 300 }}
          />
          {/* <div className="ant-action-box d-flex align-items-center mt-2 pb-3">
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
          </div> */}
        </div>
      </Card>
      {/* <DeleteModal
        handleDeleteData={handleDeleteData}
        ShowDeleteModal={showDeleteModal}
        handleCancel={handleDeleteClose}
        handleDeleteOk={handleDeleteOk}
      /> */}
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
