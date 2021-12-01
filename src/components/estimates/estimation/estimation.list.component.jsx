import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag } from "../../../utils/svg.file";
import { Link, useParams, useLocation } from "react-router-dom";
import DeleteModal from "../../modal/deleteModal.component";
import { SearchOutlined } from "@ant-design/icons";
import { getUserEstimation } from "../../../api/formula";

export default function EstimationList({ toggleAddNew }) {
  const params = useParams();
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [ListShowPreview, setListShowPreview] = useState(false);
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
  ]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  async function fetchUserFormula() {
    const fetched = await getUserEstimation(params.id);
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
        };
      });
      setData(newData);
      setFilteredData(newData);
    } else {
      console.log("fetched: ", fetched);
    }
  }

  useEffect(() => {
    fetchUserFormula();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newColumns = [...columns];
      const item = newColumns.splice(fromIndex, 1)[0];
      newColumns.splice(toIndex, 0, item);
      setColumns(newColumns);
    },
    nodeSelector: "th",
  };

  const DeleteModalEstimate = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteOk = () => {
    setShowDeleteModal(false);
  };
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
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
              <Button
                className="radius-30"
                type="primary"
                onClick={toggleAddNew}
              >
                Make New Estimation
              </Button>
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
        <DeleteModal
          DeleteModalEstimate={DeleteModalEstimate}
          ShowDeleteModal={ShowDeleteModal}
          handleDeleteClose={handleDeleteClose}
          handleDeleteOk={handleDeleteOk}
          content={<>You are about to delete all the Service</>}
        />
      </div>
    </>
  );
}
