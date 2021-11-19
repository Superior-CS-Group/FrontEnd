import React, { Component } from "react";
import { drag } from "../../utils/svg.file";
import { Table, Checkbox } from "antd";

export default class RecipentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          key: <Checkbox />,

          name: <a href="/customer-lead">Joseph</a>,
          software: "male",
          status: "12",
          date: "New York",
          day: "day",
        },
        {
          key: <Checkbox />,
          name: "Costumer Name",
          software: "male",
          status: "12",
          date: "New York",
          day: "day",
        },
      ],
      columns: [
        {
          title: <Checkbox />,
          dataIndex: "key",
        },
        {
          title: (
            <>
              Name <span className="float-end me-2"></span>
            </>
          ),
          dataIndex: "name",
        },
        {
          title: (
            <>
              Email <span className="float-end me-2"></span>
            </>
          ),
          dataIndex: "email",
        },
      ],
    };
  }
  componentDidMount() {
    const data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        key: <Checkbox />,
        name: "Joseph",
        email: "user@gmail.com",
      });
    }
    this.setState({ data });
  }
  render() {
    return (
      <>
        {/* <ReactDragListView.DragColumn {...this.dragProps}> */}
        <Table
          className="ant-table-estmating mt-3"
          columns={this.state.columns}
          pagination={false}
          dataSource={this.state.data}
          bordered={false}
        />
        {/* </ReactDragListView.DragColumn> */}
      </>
    );
  }
}
