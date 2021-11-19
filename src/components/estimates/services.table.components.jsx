import React, { Component } from "react";
import { Table, Checkbox, Button, Modal, Radio } from "antd";
import ReactDragListView from "react-drag-listview";
import { Datel, drag, edit } from "../../utils/svg.file";
import Material from "./material.components";
import Services from "./services.components";
export default class ServicesTable extends Component {
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
              Services Name <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "name",
        },
        {
          title: (
            <>
              Hours <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "software",
        },
        {
          title: (
            <>
              Days <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "status",
        },
        {
          title: (
            <>
              Production Rate <span className="float-end me-2">{drag}</span>
            </>
          ),
          dataIndex: "date",
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
              <Button className="ant-edit-button " onClick={this.showModal}>
                <span className="me-2">{edit}</span> Edit
              </Button>
            </>
          ),
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
    for (let i = 0; i < 20; i++) {
      data.push({
        key: <Checkbox />,

        name: "Run 3 downspouts underground roughly 10ft each",
        software: "Hours",
        status: "Day",
        date: "Production Rate",
      });
    }
    this.setState({ data });
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
  render() {
    return (
      <>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            className="ant-table-color"
            columns={this.state.columns}
            pagination={true}
            dataSource={this.state.data}
            bordered={false}
          />
        </ReactDragListView.DragColumn>
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
