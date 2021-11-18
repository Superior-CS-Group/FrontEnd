import React, { Component } from "react";
import {
  Button,
  Card,
  Select,
  Input,
  Modal,
  message,
  Radio,
  Row,
  Col,
  Form,
  Divider,
  Checkbox,
  DatePicker,
  Space,
} from "antd";

// import FilterSorting from "./filter/filter.sorting.component";
import {
  PlusCircleOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default class RecipientList extends Component {
  constructor(props) {
    super();
    this.state = {
      ModalVisible: false,
    };
  }

  //   showModal = () => {
  //     this.setState({ ModalVisible: true });
  //   };

  //   handleOk = () => {
  //     this.setState({ ModalVisible: false });
  //   };

  //   handleCancel = () => {
  //     this.setState({ ModalVisible: false });
  //   };
  render() {
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
    return (
      <>
        <Modal
          width={1000}
          className="modal-filter"
          visible={this.props.ModalVisible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={null}
        >
          jhgjhghjghj
        </Modal>
      </>
    );
  }
}
