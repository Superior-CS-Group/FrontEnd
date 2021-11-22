import React, { Component } from "react";
import { Table, Checkbox } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag } from "../../utils/svg.file";

export default class Datatable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: <Checkbox />,
          dataIndex: "key",
        },
        {
          title: (
            <>
              CompanyID <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "company",
        },
        {
          title: (
            <>
              Company Name <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "name",
        },
        {
          title: (
            <>
              Country <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "country",
        },
        {
          title: (
            <>
              Company State <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "state",
        },
        {
          title: (
            <>
              Company Address <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "address",
        },
        {
          title: (
            <>
              Company email
              <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "email",
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
  
  componentDidMount() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: <Checkbox />,
        company: "CompanyID",
        name: "Costumer Name",
        country: "Italy",
        state: "Roma",
        address: "130 Via lasera",
        email: "123@companyemail.com",
      });
    }
    this.setState({ data });
  }
  render() {
    return (
      <>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            className="ant-table-estmating"
            columns={this.state.columns}
            pagination={true}
            dataSource={this.state.data}
            bordered={false}
          />
        </ReactDragListView.DragColumn>
      </>
    );

    
  }
}

