import React, { useEffect, useState, Component } from "react";
import { Table, Checkbox, Button, Modal, Radio } from "antd";
import ReactDragListView from "react-drag-listview";
import { Datel, drag, edit } from "../../../utils/svg.file";

import { useParams } from "react-router-dom";
import { getData, postData } from "../../../utils/fetchApi";
import { deleteCatalog } from "../../../api/catalogue";

export default function CatalogServices() {
  const params = useParams();

  const [state, setState] = useState({
    columns: [
      {
        title: <Checkbox />,
        dataIndex: "key",
        width: 50,
      },

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
        dataIndex: "days",
        width: 200,
      },
      {
        title: (
          <>
            Production Rate <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "price",
        width:250,
      },
      {
        title: "Action",
        dataIndex: "action",
        className: "text-nowrap",
        width: 200,
      },
    ],
  });

  // const that = state;
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const columns = [...state.columns];
      const item = columns.splice(fromIndex, 1)[0];
      columns.splice(toIndex, 0, item);
      setState({
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
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          columns={state.columns}
          pagination={false}
          dataSource={state.data}
          bordered={false}
          className="ant-table-color scroll-style munscher"
          scroll={{ y: 600 }}
        />
      </ReactDragListView.DragColumn>
     
    </>
  );
}
