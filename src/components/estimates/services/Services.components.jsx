/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import FillterTabs from "../fillterTabs.components";
import { Card, Table, Modal, Form, Input, Button, Row, Col } from "antd";
import { Link, Navigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { ellps, Datel } from "../../../utils/svg.file";
import {
  createFormula,
  deleteFormula,
  getAllFormula,
} from "../../../api/formula";
import { InfoCircleOutlined } from "@ant-design/icons";
import SmallLoader from "../../loader/smallLoader";
export default function Services() {
  const [ismadalvisable, setMadalvisable] = useState(false);
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [title, setTitle] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [isDeleteing, setIsDeleteing] = useState(false);
  const [state, setState] = useState({
    smallLoader: true,
  });
  React.useEffect(() => {
    fetchFormula();
  }, []);
  async function fetchFormula() {
    const result = await getAllFormula();
    if (result.remote === "success") {
      const data = result.data.data.map((item, idx) => {
        return {
          key: idx,
          ...item,
          title: (
            <Link
              to={`/v2/formula-tree?formulaId=${item._id}`}
              style={{ color: "inherit" }}
            >
              {item.title}
            </Link>
          ),
        };
      });
      setData(data);
      setFiltredData(data);
    }
    setTimeout(
      () =>
        setState({
          smallLoader: false,
        }),
      1000
    );
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
    const result = await createFormula(body);
    if (result.remote === "success") {
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
              onClick={() => setShowDeleteModal(tags._id)}
            >
              {Datel}
            </span>
          </>
        );
      },
    },
  ];

  const handleFilterService = (e) => {
    const { value } = e.target;
    const filtredData = data.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setFiltredData(filtredData);
  };

  const handleDelete = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsDeleteing(true);
    const newData = data.filter((item) => item._id !== showDeleteModal);
    const newFiltredData = filtredData.filter(
      (item) => item._id !== showDeleteModal
    );
    const result = await deleteFormula(showDeleteModal);
    console.log("resul: ", result);
    if (result.remote === "success") {
      setData(newData);
      setFiltredData(newFiltredData);
      setShowDeleteModal(null);
    }
    setTimeout(() => {
      setIsDeleteing(false);
    }, 1000);
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
          {state.smallLoader ? (
            <>
              <div className="text-center d-flex align-items-center justify-content-center ht-100">
                <span className="">
                  <SmallLoader />
                  <p className="mt-2">Loading Please Wait....</p>
                </span>
              </div>
            </>
          ) : (
            <Table
              columns={columns}
              dataSource={filtredData}
              className="components-table-demo-nested ant-thead-block scroll-style"
              // rowSelection={rowSelection}
              pagination={false}
              bordered={false}
              scroll={{ y: 500 }}
            />
          )}
        </div>
      </Card>
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={showDeleteModal !== null}
        closeIcon={<InfoCircleOutlined />}
        width={350}
        footer={null}
      >
        <p>Are you sure you want to delete this service?</p>
        <Row>
          <Col md={12} className="text-center">
            <Button
              type="text"
              onClick={() => {
                setShowDeleteModal(null);
              }}
              disabled={isDeleteing}
            >
              Cancel
            </Button>
          </Col>
          <Col md={12}>
            <Button type="link" onClick={handleDelete} disabled={isDeleteing}>
              {isDeleteing ? "Deleting..." : "Delete"}
            </Button>
          </Col>
        </Row>
      </Modal>
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
