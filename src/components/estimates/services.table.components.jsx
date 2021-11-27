import React, { useEffect, useState, Component } from "react";
import { Table, Checkbox, Button, Modal, Radio } from "antd";
import ReactDragListView from "react-drag-listview";
import { Datel, drag, edit } from "../../utils/svg.file";
import Material from "./material.components";
import Services from "./services.components";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../utils/fetchApi.js";
import { deleteCatalog } from "../../api/catalogue";

export default function ServicesTable() {
  const params = useParams();

  const [state, setState] = useState({
    columns: [
      {
        title: <Checkbox />,
        dataIndex: "key",
      },

      {
        title: (
          <>
            Services Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "name",
      },
      {
        title: (
          <>
            Hours <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "hours",
      },
      {
        title: (
          <>
            Days <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "days",
      },
      {
        title: (
          <>
            Production Rate <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "price",
      },
      {
        title: "Action",
        dataIndex: "action",
      },
    ],
  });

  const that = state;
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const columns = [...that.state.columns];
      const item = columns.splice(fromIndex, 1)[0];
      columns.splice(toIndex, 0, item);
      that.setState({
        ...state,
        columns,
      });
    },
    nodeSelector: "th",
  };

  const deleteServiceHandleSubmit = async (id) => {
    console.log(id);

    const body = {
      _id: id,
    };
    console.log("body: ", body);
    // const updateCustomer = await deleteCatalog(body);
    // if (updateCustomer.remote === "success") {
    //   setState({
    //     ...state,
    //     message: "Data Deleted!",
    //   });
    // } else {
    //   setState({
    //     ...state,
    //     errors: updateCustomer.remote.data.errors,
    //     isLoading: false,
    //   });
    // }
  };

  useEffect(() => {
    const data = [];

    const fetchData = async () => {
      const body = { type: "service" };
      const result = await postData(`services/list-by-type`, body);

      // console.log(result.data.Data);

      for (let i = 0; i < result.data.Data.length; i++) {
        let catalogueData = result.data.Data[i];
        data.push({
          key: <Checkbox />,

          name: catalogueData.title,
          hours: catalogueData.hours,
          days: catalogueData.price,
          price: catalogueData.price,
          action: (
            <>
              <Button danger className="ant-danger-button me-3">
                <span className="me-2">{Datel}</span>{" "}
                <span
                  className="align-text"
                  onClick={deleteServiceHandleSubmit(catalogueData._id)}
                >
                  Delete
                </span>
              </Button>
              <Button className="ant-edit-button " onClick={showModal}>
                <span className="me-2">{edit}</span> Edit
              </Button>
            </>
          ),
        });
      }
      // console.log("data: ", data);
      setState({ ...state, data });
    };
    fetchData();
  }, [params]);

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const hideModal = () => {
    setState({
      visible: false,
    });
  };

  return (
    <>
      <ReactDragListView.DragColumn {...state.dragProps}>
        <Table
          className="ant-table-color"
          columns={state.columns}
          pagination={false}
          dataSource={state.data}
          bordered={false}
        />
      </ReactDragListView.DragColumn>
      <Modal
        title="Edit Material/Services"
        visible={state.visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="ok"
        cancelText="Close"
        width={800}
        className="ant-modal-title-box"
        footer={false}
      >
        <Radio.Group
          name="radiogroup"
          defaultValue={1}
          className="mb-4"
          onChange={(e) => setState({ isMaterial: e.target.value === 1 })}
        >
          <Radio value={1}>Material</Radio>
          <Radio value={2}>Services</Radio>
        </Radio.Group>
        {state.isMaterial ? (
          <Material
            value1="Hard Pipe"
            value2="Standard"
            value3="2"
            value4="$0.25"
            upload="Upload Image"
          />
        ) : (
          <>
            <Services
              valueService="Run 3 downspouts underground roughly 10ft each"
              hoursValue="4.5"
              daysValue="0.11"
              rate="0.15"
            />
          </>
        )}
      </Modal>
    </>
  );
}
