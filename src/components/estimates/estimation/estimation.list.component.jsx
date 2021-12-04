import React, { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Row, Col } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag, Datel } from "../../../utils/svg.file";
import { Link, useParams } from "react-router-dom";
import { SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { deleteUserEstimation, getUserEstimation } from "../../../api/formula";

export default function EstimationList({ toggleAddNew,fetched:fetche }) {
  const params = useParams();

  const [columns, setColumns] = useState([
    {
      title: (
        <>
          Estimation No <span className="float-end me-2">{drag}</span>
        </>
      ),
      dataIndex: "estimationNumber",
      width: 200,
    },
    {
      title: (
        <>
          Date <span className="float-end me-2">{drag}</span>
        </>
      ),
      dataIndex: "createdAt",
      width: 200,
    },

    {
      title: (
        <>
          Status <span className="float-end me-2">{drag}</span>
        </>
      ),
      dataIndex: "status",
      className: "text-green",
      width: 200,
    },
    {
      title: <>Action</>,
      dataIndex: "action",
      className: "",
      width: 200,
    },
  ]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [isDeleteing, setIsDeleteing] = useState(false);

  async function fetchUserFormula() {
    const fetched = fetche;
    if (fetched.remote === "success" && fetched.data.data.length) {
      const newData = fetched.data.data.map((item) => {
        return {
          ...item,
          key: item._id,
          estimationNumber: (
            <Link to={`?estimationId=${item._id}`}>
              {item.estimationNumber}
            </Link>
          ),
          createdAt: item.createdAt.split("T")[0],
          action: (
            <>
              <span
                className="float-end me-2"
                onClick={() => setDeleteModal(item._id)}
              >
                {Datel}
              </span>
            </>
          ),
        };
      });
      setData(newData);
      setFilteredData(newData);
    } else {
      console.log("fetched: ", fetched);
    }
  }

  const handleDelete = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsDeleteing(true);
    const newData = data.filter((item) => item._id !== deleteModal);
    const newFiltredData = filteredData.filter(
      (item) => item._id !== deleteModal
    );
    const result = await deleteUserEstimation(deleteModal);
    console.log("resul: ", result);
    if (result.remote === "success") {
      setData(newData);
      setFilteredData(newFiltredData);
      setDeleteModal(null);
    }
    setTimeout(() => {
      setIsDeleteing(false);
    }, 1000);
  };

  useEffect(() => {
    fetchUserFormula();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetche]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newColumns = [...columns];
      const item = newColumns.splice(fromIndex, 1)[0];
      newColumns.splice(toIndex, 0, item);
      setColumns(newColumns);
    },
    nodeSelector: "th",
  };

  return (
    <>
      <div className="card-shadow p-2">
        <div className="p-3 card-shadow pe-4">
          <div className="fillter d-lg-flex align-items-center">
            <span
              className="inline-block me-5 fillter-btn cursor-btn"
              // onClick={this.showModal}
            >
              {/* <Link to="#"> */}
              {/* <Button
                className="radius-30"
                type="primary"
                onClick={toggleAddNew}
              >
                Make New Estimation
              </Button> */}
              {/* </Link> */}
            </span>

            <div className="ms-auto col-lg-3">
              <Input
                placeholder="Search"
                text="search"
                className="ant-search-button"
                suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
              />
            </div>
          </div>
        </div>
        <ReactDragListView.DragColumn {...dragProps}>
          <Table
            columns={columns}
            pagination={false}
            dataSource={filteredData}
            bordered={false}
            className="ant-table-estmating scroll-style"
            scroll={{ x: 400, y: 500 }}
          />
        </ReactDragListView.DragColumn>
        <Modal
          className="modal-radius warning-modal"
          title="Warning!"
          visible={deleteModal !== null}
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
                  setDeleteModal(null);
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
      </div>
    </>
  );
}
