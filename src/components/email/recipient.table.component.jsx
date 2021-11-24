import React, { Component } from "react";
import { drag } from "../../utils/svg.file";
import { Table, Checkbox, Button } from "antd";
import DeleteOutlined from "@ant-design/icons";
import { Datel, edit } from "../../utils/svg.file";

export default class RecipentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
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
        {
          title: (
            <>
              action <span className="float-end me-2"></span>
            </>
          ),
          dataIndex: "action",
          render: () => (
            <>
              <Button className="me-3 remove-btn">
                <span className="me-2 " style={{ color: "red" }}>
                  {Datel} 
                </span>
              </Button>
            </>
          ),
        },
      ],
    };
  }
  componentDidMount() {
    const data = [];
    for (let i = 0; i < 2; i++) {
      data.push({
        name: "Joseph",
        email: "user@gmail.com",
        action: "delete",
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
