import React, { Component } from "react";
import { Button, Select, Input, Form, Row, Col, Upload, message } from "antd";
import { LinkOutlined, PlusCircleOutlined } from "@ant-design/icons";

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
export default class Material extends Component {
  render() {
    return (
      <>
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={24} lg={24}>
              <Form.Item label="Material Name" className="ant-select-large">
                <Input
                  placeholder={this.props.placeholder}
                  value={this.props.value1}
                  className="ant-modal-input"
                />
              </Form.Item>
            </Col>
            <div
              className="d-flex justify-content-between align-items-start"
              style={{ paddingLeft: "12px", paddingRight: "12px" }}
            >
              <Row gutter={[24, 0]} className="matrial">
                <Col span={24} lg={8}>
                  <Form.Item label="Variations">
                    <Input
                      placeholder={this.props.standard}
                      value={this.props.value2}
                      className="ant-modal-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={24} lg={8}>
                  <Form.Item label="unit">
                    <Input
                      placeholder={this.props.unitplaceholder}
                      value={this.props.value3}
                      className="ant-modal-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={24} lg={8}>
                  <Form.Item label="cost">
                    <Input
                      placeholder={this.props.costplaceholder}
                      value={this.props.value4}
                      className="ant-modal-input"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label={this.props.upload}>
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
              </Row>

              <span className="text-primary rounded-circle ms-2 mt-50">
                <PlusCircleOutlined style={{ fontSize: "24px" }} />
              </span>
            </div>
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
      </>
    );
  }
}
