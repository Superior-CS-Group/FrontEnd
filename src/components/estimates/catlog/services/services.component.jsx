import { Input, message } from "antd";
import React, { useState } from "react";
import { drag } from "../../../../utils/svg.file";
import ReactDragListView from "react-drag-listview";
import { Table, Button } from "antd";
import {
  createService,
  getServices,
  removeServices,
} from "../../../../api/catalogue";

import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { validateCreateServiceInput } from "../../../../validators/catalog/catalog.validator";
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
  const [deleteServiceId, setdeleteServiceId] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isAddService, setIsAddService] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedService, setSelectedService] = React.useState(null);
  const [serviceDetails, setServiceDetails] = React.useState({
    name: "",
    type: "service",
    hours: "",
    day: "",
    productionRate: "",
  });
  const handleDeleteOk = async () => {
    const body = {
      id: deleteServiceId,
    };
    const response = await removeServices(body);
    handleUpdate();
    message.success("Services Deleted", 5);
    setShowDeleteModal(false);
    setIsModal(false);
  };
  const DeleteCatalogService = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };
  const handleUpdate = () => {
    setIsUpdate(true);
    setTimeout(() => setIsUpdate(false), 100);
  };

  const [isModal, setIsModal] = React.useState(false);
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
                onClick={() => {
                  setSelectedService(item);
                  togglePopup("edit");
                }}
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

  const saveService = async () => {
    const body = { ...selectedService };
    setErrors({});
    setIsLoading(true);
    const { isValid, errors } = validateCreateServiceInput(body);
    console.log("body: ", body, errors, isValid);
    if (!isValid) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }
    let response = {};
    if (!selectedService) {
      response = await createService(body);
    } else {
      const body = { ...serviceDetails };
      console.log("selectedService", body);
      response = await createService(body);
    }
    console.log("response", response);

    if (response.remote === "success") {
      handleUpdate();
      setTimeout(() => {
        setIsLoading(false);
        togglePopup();
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    const newServiceDetails = { ...serviceDetails };
    console.log(e.target.value);
    newServiceDetails[e.target.name] = e.target.value;
    setServiceDetails(newServiceDetails);
    setSelectedService(newServiceDetails);
    console.log(newServiceDetails, "eeeeeeeee");
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

  const deleteServiecs = (id) => {
    console.log(id, "deleteId servd");
    setdeleteServiceId(id);
    setShowDeleteModal(true);
  };
  const togglePopup = (actio) => {
    setIsModal(!isModal);
    if (actio === "add") {
      setIsAddService(true);
      setErrors({});
    } else setIsAddService(false);
  };

  return (
    <div>
      <div className="p-2">
        <div className="fillter d-lg-flex align-items-center">
          <span
            className="ant-blue-plus me-4"
            onClick={() => togglePopup("add")}
          >
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
        title="Edit Service"
        handleInputChange={handleChange}
        isEditservices={isModal}
        handleOk={() => console.log("ok")}
        handleCancel={togglePopup}
        width={575}
        loading={isLoading}
        handleSave={saveService}
        selectedService={selectedService}
        deleteServiecs={deleteServiecs}
        errors={errors}
        isAddService={isAddService}
      />

      <DeleteModal
        deleteServiecs={deleteServiecs}
        ShowDeleteModal={ShowDeleteModal}
        handleDeleteClose={handleDeleteClose}
        handleDeleteOk={handleDeleteOk}
        // deleteId={deleteCatelogId}
        content={<>Do you really want to delete?</>}
      />
    </div>
  );
}

export default Services;
