import React, { useEffect, useState, Component } from "react";
import { Table, Checkbox, Button, Modal, Radio } from "antd";
import ReactDragListView from "react-drag-listview";
import { Datel, drag, edit } from "../../../utils/svg.file";

import { useParams } from "react-router-dom";
import { getData, postData } from "../../../utils/fetchApi";
import { deleteCatalog } from "../../../api/catalogue";
import { EditOutlined } from "@ant-design/icons";
import EditService from "./EditServices";

export default function CatalogServices() {
  const [isEditServices, setIsEditServices] = useState(false);
  const handleEditservices = () => {
    setIsEditServices(true);
  };
  const handleOk = () => {
    setIsEditServices(false);
  };

  const handleCancel = () => {
    setIsEditServices(false);
  };
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
        width: 250,
      },
      {
        title: "Action",
        dataIndex: "action",
        className: "text-nowrap",
        width: 200,
      },
    ],
  });
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: <Checkbox />,
      name: `Edward King ${i}`,
      hours: 32,
      days: 32,
      price: "5",
      action: (
        <Button
          type="text"
          shape="circle"
          className="d-inline-flex align-items-center justify-content-center"
        >
          <EditOutlined className="text-primary" onClick={handleEditservices} />
        </Button>
      ),
    });
  }

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

  return (
    <>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          columns={state.columns}
          pagination={false}
          dataSource={data}
          bordered={false}
          className="components-table-demo-nested ant-thead-block scroll-style"
          scroll={{ y: 360 }}
        />
      </ReactDragListView.DragColumn>
      <EditService
        title="Edit Service"
        handleEditservices={handleEditservices}
        isEditservices={isEditServices}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={575}
      />
    </>
  );
}
