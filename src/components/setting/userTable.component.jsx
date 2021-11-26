import React, { useEffect, useState, Component } from "react";
import { Table, Checkbox, Button, Modal, Radio } from "antd";
import ReactDragListView from "react-drag-listview";
import { Datel, drag, edit } from "../../utils/svg.file";
// import Material from "./material.components";
// import Services from "./services.components";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../utils/fetchApi.js";
import { deleteCatalog } from "../../api/catalogue";

export default function UserTable() {
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
            User Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "name",
      },
      {
        title: (
          <>
            Email <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "email",
      },
      {
        title: (
          <>
            Phone <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "phone",
      },
      {
        title: (
          <>
            Address <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "address",
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
          email: catalogueData.hours,
          phone: catalogueData.price,
          address: catalogueData.price,
          action: (
            <>
              {" "}
              <Button className="ant-edit-button me-3" onClick={showModal}>
                <span className="me-2">{edit}</span> Edit
              </Button>
              <Button danger className="ant-danger-button">
                <span className="me-2">{Datel}</span>{" "}
                <span
                  className="align-text"
                  onClick={deleteServiceHandleSubmit(catalogueData._id)}
                >
                  Delete
                </span>
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
          pagination={true}
          dataSource={state.data}
          bordered={false}
        />
      </ReactDragListView.DragColumn>
    </>
  );
}
