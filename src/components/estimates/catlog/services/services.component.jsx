import { Input } from "antd";
import React, { useState } from "react";
import { drag } from "../../../../utils/svg.file";
import ReactDragListView from "react-drag-listview";
import { Table, Button } from "antd";
import { getServices } from "../../../../api/catalogue";

import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EditService from "../EditServices";
import DeleteModal from "../../../modal/deleteModal.component";

import SmallLoader from "../../../loader/smallLoader";

function Services() {
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);

  const [state, setState] = useState({
    smallLoader: true,
  });
  const [columns, setColumns] = React.useState([
    {
      title: (
        <>
          Services Name <span className="float-end me-2">{drag}</span>
        </>
      ),
      dataIndex: "name",
      width: 500,
    },
    {
      title: (
        <>
          Hours <span className="float-end me-2">{drag}</span>
        </>
      ),
      dataIndex: "hours",
      width: 150,
    },
    {
      title: (
        <>
          Days <span className="float-end me-2">{drag}</span>
        </>
      ),
      dataIndex: "day",
      width: 200,
    },
    {
      title: (
        <>
          Production Rate <span className="float-end me-2">{drag}</span>
        </>
      ),
      dataIndex: "price",
      width: 250,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-nowrap",
      width: 200,
    },
  ]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isAddService, setIsAddService] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedService, setSelectedService] = React.useState(null);

  const [isModal, setIsModal] = React.useState(false);

  const toggleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const handleEdit = (e, service) => {
    if (e) {
      e.preventDefault();
    }
    setIsModal(true);
    setSelectedService(service);
    setIsAddService(false);
  };
  const fetchData = async () => {
    const response = await getServices(pageNumber);
    console.log("response", response);
    if (response.remote === "success") {
      const processedData = response.data.data.map((item) => {
        return {
          ...item,
          action: (
            <Button
              type="text"
              shape="circle"
              className="d-inline-flex align-items-center justify-content-center"
            >
              <EditOutlined
                className="text-primary"
                onClick={(e) => handleEdit(e, item)}
              />
            </Button>
          ),
        };
      });
      setData(processedData);
    }
    setTimeout(
      () =>
        setState({
          smallLoader: false,
        }),
      1000
    );
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const handleChange = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsModal(false);
    setSelectedService(null);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newColumns = [...columns];
      const item = newColumns[fromIndex];
      newColumns[fromIndex] = newColumns[toIndex];
      newColumns[toIndex] = item;
      setColumns(newColumns);
    },
    nodeSelector: "th",
  };

  const handleAdd = () => {
    setIsAddService(true);
    setIsModal(true);
  };
  return (
    <div>
      <div className="p-2">
        <div className="fillter d-lg-flex align-items-center">
          <span className="ant-blue-plus me-4" onClick={handleAdd}>
            <PlusCircleOutlined style={{ fontSize: "18px" }} className="me-2" />{" "}
            Add Services
          </span>

          <div className="ms-auto col-lg-3">
            <Input
              placeholder="Search Service by name"
              text="search"
              className="ant-search-button"
              suffix={<SearchOutlined style={{ fontSize: "18px" }} />}

              // onChange={filterCatalogItems}
            />
          </div>
        </div>
      </div>
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
        <>
          <ReactDragListView.DragColumn {...dragProps}>
            <Table
              columns={columns}
              pagination={false}
              dataSource={data}
              bordered={false}
              className="components-table-demo-nested ant-thead-block scroll-style"
              scroll={{ y: 360 }}
            />
          </ReactDragListView.DragColumn>
        </>
      )}
      <EditService
        isAddService={isAddService}
        isShowModal={isModal}
        handleCancel={handleChange}
        selectedService={selectedService}
        toggleUpdate={toggleUpdate}
      />

      {/* <DeleteModal
        deleteServiecs={deleteServiecs}
        ShowDeleteModal={ShowDeleteModal}
        handleDeleteClose={handleDeleteClose}
        handleDeleteOk={handleDeleteOk}
        // deleteId={deleteCatelogId}
        content={<>Do you really want to delete?</>}
      /> */}
    </div>
  );
}

export default Services;
