import React, { Component } from "react";
import { Table, Button, Radio, Modal, Upload, message } from "antd";
import { Link } from "react-router-dom";
import { Datel, edit } from "../../utils/svg.file";

import Material from "./material.components";
import Services from "./services.components";

export default class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      isMaterial: true,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    const columns = [
      {
        title: "Material Name",
        dataIndex: "descriptive",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
      },
      {
        title: "Cost",
        dataIndex: "cost",
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
            <Button className="ant-edit-button " onClick={this.showModal}>
              <span className="me-2">{edit}</span> Edit
            </Button>
          </>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 40; i++) {
      data.push({
        key: i,
        descriptive: `Material Name ${i}`,
        quantity: "1 Ton",
        cost: "$175.00 ",
        // Variations: "View",

        action: "Delete",
      });
    }

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

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <>
        <Table
          className="ant-table-color"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={true}
        />
        <Modal
          title="Edit Material/Services"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
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
            onChange={(e) =>
              this.setState({ isMaterial: e.target.value === 1 })
            }
          >
            <Radio value={1}>Material</Radio>
            <Radio value={2}>Services</Radio>
          </Radio.Group>
          {this.state.isMaterial ? (
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
}
