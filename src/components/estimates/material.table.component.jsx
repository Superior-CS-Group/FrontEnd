import React, { useEffect, useState, Component } from "react";
import { Table, Button, Radio, Modal, Upload, message } from "antd";
// import { Link } from "react-router-dom";
import { Datel, drag, edit } from "../../utils/svg.file";

import Material from "./material.components";
import Services from "./services.components";
import ReactDragListView from "react-drag-listview";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../utils/fetchApi.js";
import { deleteCatalog } from "../../api/catalogue";

export default function MaterialTable() {
  const params = useParams();

  const [state, setState] = useState({
    selectedRowKeys: [], // Check here to configure the default column
    isMaterial: true,
    columns: [
      {
        title: (
          <>
            Material Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "descriptive",
        sorter: true,
      },
      {
        title: (
          <>
            Quantity <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "quantity",
        sorter: true,
      },
      {
        title: (
          <>
            Cost <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "cost",
        sorter: true,
      },
      // {
      //   title: "Variations",
      //   dataIndex: "Variations",
      //   render: () => (
      //     <>
      //       <Link to="/view">View</Link>
      //     </>
      //   ),
      // },
      {
        title: "Action",
        dataIndex: "action",
        render: () => (
          <>
            <Button danger className="ant-danger-button me-3">
              <span className="me-2">{Datel}</span>{" "}
              <span className="align-text">Delete</span>
            </Button>
            <Button className="ant-edit-button " onClick={showModal}>
              <span className="me-2">{edit}</span> Edit
            </Button>
          </>
        ),
      },
    ],
  });

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

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setState({ selectedRowKeys });
  };

  useEffect(() => {
    const data = [];

    const fetchData = async () => {
      const body = { type: "material" };
      const result = await getData(`services/variation-list`);

      console.log(result.data.Data);
      const data = [];
      for (let i = 0; i < result.data.Data.length; i++) {
        let catalogueData = result.data.Data[i];
        data.push({
          key: i,
          descriptive: catalogueData.title,
          quantity: catalogueData.unit,
          cost: catalogueData.price,
          // Variations: "View",

          action: "Delete",
        });
      }
      setState({ ...state, data });
    };
    fetchData();
  }, [params]);

  const that = state;
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const columns = [...state.columns];
      const item = columns.splice(fromIndex, 1)[0];
      columns.splice(toIndex, 0, item);
      setState({
        columns,
      });
    },
    nodeSelector: "th",
  };

  const { Dragger } = Upload;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      }
      // else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const { selectedRowKeys } = state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          className="ant-table-color"
          rowSelection={rowSelection}
          columns={state.columns}
          dataSource={state.data}
          pagination={true}
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
