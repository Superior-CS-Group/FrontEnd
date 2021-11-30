import { Input } from "antd";
import React from "react";
import { drag } from "../../../../utils/svg.file";
import ReactDragListView from "react-drag-listview";
import { Table, Button } from "antd";
import { createService, getServices } from "../../../../api/catalogue";

import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { validateCreateServiceInput } from "../../../../validators/catalog/catalog.validator";
import EditService from "../EditServices";

function Services() {
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
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedService, setSelectedService] = React.useState(null);
  const [serviceDetails, setServiceDetails] = React.useState({
    name: "",
    type: "service",
    hours: "",
    day: "",
    productionRate: "",
  });

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
                  togglePopup();
                }}
              />
            </Button>
          ),
        };
      });
      setData(processedData);
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const saveService = async () => {
    const body = { ...serviceDetails };
    setErrors({});
    setIsLoading(true);
    const { isValid, errors } = validateCreateServiceInput(body);
    console.log("body: ", body, errors);
    if (!isValid) {
      setErrors(errors);
      return;
    }
    let response = {};
    if (!selectedService) {
      response = await createService(body);
      console.log(response);
    } else {
      // todo update service
    }
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
    const newServiceDetails = { ...serviceDetails };
    newServiceDetails[e.target.name] = e.target.value;
    setServiceDetails(newServiceDetails);
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

  const togglePopup = () => {
    setIsModal(!isModal);
  };

  return (
    <div>
      <div className="p-2">
        <div className="fillter d-lg-flex align-items-center">
          <span className="ant-blue-plus me-4" onClick={togglePopup}>
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
        errors={errors}
      />
    </div>
  );
}

export default Services;
