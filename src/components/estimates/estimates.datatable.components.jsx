import React, { Component } from "react";
import { Table, Checkbox } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag } from "../../utils/svg.file";

export default class Datatable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          key: <Checkbox />,
          estimate: "Estimate #",
          name: <a href="customer-lead">Joseph</a>,
          software: "male",
          status: "12",
          date: "New York",
          day: "day",
        },
        {
          key: <Checkbox />,
          estimate: "Estimate #",
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
              Estimate <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "estimate",
        },
        {
          title: (
            <>
              Costumer Name <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "name",
        },
        {
          title: (
            <>
              Software Follow Up <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "software",
        },
        {
          title: (
            <>
              Status <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "status",
        },
        {
          title: (
            <>
              Estimate Date <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "date",
        },
        {
          title: (
            <>
              Days it took to send{" "}
              <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "day",
        },
      ],
    };

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = [...that.state.columns];
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns,
        });
      },
      nodeSelector: "th",
    };
  }
  render() {
    return (
      <>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            className="ant-table-estmating"
            columns={this.state.columns}
            pagination={false}
            dataSource={this.state.data}
            bordered={false}
          />
        </ReactDragListView.DragColumn>
      </>
    );
  }
}
