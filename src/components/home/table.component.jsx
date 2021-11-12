import React, { Component } from "react";
import { Table, Button } from "antd";
import { Datel, edit } from "../../utils/svg.file";
const columns = [
  {
    title: "Descriptive",
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
  {
    title: "Variations",
    dataIndex: "Variations",
    render: () => (
      <>
        <span>View</span>
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <Button danger className="ant-danger-button me-3">
          <span className="me-2">{Datel}</span>{" "}
          <span className="align-text">Delete</span>
        </Button>
        <Button className="ant-edit-button " >
          <span className="me-2">{edit}</span> Edit
        </Button>
      </>
    ),
  },
];

const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    descriptive: `Boulder ${i}`,
    quantity: "1 Ton",
    cost: "$175.00 ",
    Variations: "View",

    action: "Delete",
  });
}

export default class TableData extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    visible: false,
  };
  showModal1 = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal1 = () => {
    this.setState({
      visible: false,
    });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
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
          pagination={false}
        />
      </>
    );
  }
}
