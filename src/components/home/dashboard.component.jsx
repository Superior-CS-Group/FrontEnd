import React, { Component } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Select,
  Input,
  Modal,
  Form,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import fillter from "../../images/fillter.png";
import TableData from "./table.component";
import ModalPop from "../modal/modal.pages";
const { Option } = Select;
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
export default class Dashboard extends Component {
  state = { visible: false };
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

  render() {
    return (
      <>
        <Breadcrumb className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <Breadcrumb.Item>ESTIMATING</Breadcrumb.Item>

            <Breadcrumb.Item>CATELOG</Breadcrumb.Item>
          </div>

          <Button
            onClick={this.showModal}
            type="primary"
            className="radius-30 ant-primary-btn font-15"
            size="large"
          >
            <PlusCircleOutlined style={{ fontSize: "24px" }} /> Add New Material
          </Button>
        </Breadcrumb>

        <Card
          bordered={false}
          className="card-depultview"
          bodyStyle={{ padding: "0px" }}
        >
          <div className="view-tabs">
            <ul>
              <li className="active">Default View</li>
              <li>
                <span>
                  <PlusCircleOutlined style={{ fontSize: "18px" }} />
                </span>
              </li>
            </ul>
          </div>
          <div className="p-3 card-shadow pe-4 ps-5">
            <div className="fillter d-lg-flex align-items-center">
              <span className="inline-block me-5 fillter-btn">
                <img src={fillter} className="me-3" alt="" /> Filter and Sort
              </span>
              <span className="inline-block me-4">
                <Select
                  defaultValue="Filter"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="jack">Boulder</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </span>
              <span className="ant-blue-plus">
                <PlusCircleOutlined
                  style={{ fontSize: "18px" }}
                  className="me-2"
                />{" "}
                Add Column
              </span>
              <div className="ms-auto col-lg-3">
                <Input
                  placeholder="Search customers by name"
                  text="search"
                  className="ant-search-button"
                  suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
                />
              </div>
            </div>
          </div>
          <div className="p-2 ant-table-seprate">
            <TableData />
            <div className="ant-action-box d-flex align-items-center mt-5 pb-3">
              <div className="ms-auto pe-3 ant-select-box ">
                <span className="me-3">Action:</span>
                <Select
                  defaultValue="What do yo want to do?"
                  onChange={handleChange}
                  style={{ width: "300px" }}
                >
                  <Option value="jack">What do yo want to do?</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <div className="text-end mt-3">
                  <Button
                    type="primary"
                    disabled
                    className="ant-confirm-button"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Modal
          title="Add New Material/Services "
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="ok"
          cancelText="Close"
          width={800}
          className="ant-modal-title-box"
          footer={false}
        >
          <Form layout="vertical">
            <Row gutter={[24, 0]}>
              <Col span={24} lg={12}>
                <Form.Item
                  label="Material/Services Name"
                  className="ant-select-large"
                >
                  <Input placeholder="Hard Pipe" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Variations">
                  <Input placeholder="Standard" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Unit">
                  <Input placeholder="2" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Cost">
                  <Input placeholder="$0.25" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Per Hours">
                  <Input placeholder="$2" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Production Rate">
                  <Input placeholder="$1.25" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Upload  Image">
                  {/* <Upload className="ant-upload-full">
                    <Button
                      className="ant-modal-input w-100"
                      icon={<LinkOutlined />}
                    >
                      Attach images
                    </Button>
                  </Upload> */}

                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <LinkOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files
                    </p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item className="text-center mt-4 mb-0">
                  <Button className="ant-cancel-btn me-3">Cancel</Button>
                  <Button type="primary" className="ant-add-button">
                    Add to Catalog
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>

        {/* <Modal
          title="Edit Material/Services"
          visible={this.state.visible}
          onOk={this.hideModal1}
          onCancel={this.hideModal1}
          okText="ok"
          cancelText="Close"
          width={800}
          className="ant-modal-title-box"
          footer={false}
        >
          <Form layout="vertical">
            <Row gutter={[24, 0]}>
              <Col span={24} lg={12}>
                <Form.Item
                  label="Material/Services Name"
                  className="ant-select-large"
                >
                  <Input
                    placeholder="Hard Pipe"
                    value="Hard Pipe"
                    className="ant-modal-input"
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Variations">
                  <Input
                    placeholder="Standard"
                    value="Variations"
                    className="ant-modal-input"
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Unit">
                  <Input
                    placeholder="2"
                    value="Unit"
                    className="ant-modal-input"
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Cost">
                  <Input placeholder="$0.25" className="ant-modal-input" />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Per Hours">
                  <Input
                    placeholder="$2"
                    value="Per Hours"
                    className="ant-modal-input"
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <Form.Item label="Production Rate">
                  <Input
                    placeholder="$1.25"
                    value="Production Rate"
                    className="ant-modal-input"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Upload  Image">
                  <Upload className="ant-upload-full">
                    <Button
                      className="ant-modal-input w-100"
                      icon={<LinkOutlined />}
                    >
                      Attach images
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item className="text-center mt-4 mb-0">
                  <Button className="ant-cancel-btn me-3">Cancel</Button>
                  <Button type="primary" className="ant-add-button">
                    Edit to Catalog
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal> */}

        {/* <ModalPop
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="ok"
          cancelText="Close"
          width={800}
          className="ant-modal-title-box"
          footer={false}
        /> */}
      </>
    );
  }
}
