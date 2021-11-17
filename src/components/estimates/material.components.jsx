import React, { Component } from "react";
import { Button, Select, Input, Form, Row, Col, Upload, message } from "antd";
import { LinkOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { postData } from "../../utils/fetchApi";

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
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hours: "",
      days: "",
      rate: "",
      vname: "",
      price: "",
      unit: "",
      type: "material",
      message: "",
      isRedirect: false,
      isValidEmail: false,
      isLoading: false,
      errors: {},
      visible: false,
      isMaterial: true,
      isProduct: true,
      variation: [],
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateFields = () => {
    const errors = {};
    if (!this.state.name) {
      errors.name = "Material Name is not blank";
    }
    if (!this.state.vname) {
      errors.vname = "Variation Name is not blank";
    }
    if (!this.state.price) {
      errors.price = "Variation Price is not blank";
    }
    if (!this.state.unit) {
      errors.unit = "Variation Unit is not blank";
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  handleAllChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleVariationAdd = (e) => { 
    e.preventDefault();
    this.setState({ errors: {} });
    const { errors, isValid } = this.validateFields();
    if (!isValid) {
      this.setState({ errors });
      return;
    }

    const newVariation = {
      name: this.state.vname,
      price: this.state.price,
      unit: this.state.unit,
    };
    this.setState({
      variation: [newVariation, ...this.state.variation],
      name: "",
      price: "",
      unit: "",
    });
    console.log(newVariation); 
    console.log(this.state.variation); 
  };
  
  handleSubmit = async (event) => {
    // console.log(localStorage.getItem("token"))

    event.preventDefault();
    this.setState({ errors: {} });
    const { errors, isValid } = this.validateFields();
    if (!isValid) {
      this.setState({ errors });
      return;
    }
    
    const { name, hours, days, rate, type, variation } = this.state;
    const body = { name, hours, days, rate, type, variation };
    console.log("body: ", body);

    try {
      // const result = await postData(`services/add`, body);
      // // console.log("result: ", result);
      // this.setState({
      //   message: "New Material Added!",
      //   isRedirect: true,
      //   isLoading: false,
      // });
    } catch (err) {
      console.log("error", err, err.response);

      this.setState({
        errors: err.response.data.errors,
        isLoading: false,
      });
    }
  };

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
                  name="name"
                  onChange={this.handleAllChange}
                />
                <div role="alert" class="text-danger">
                  {this.state.errors.name}
                </div>
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
                      name="vname"
                      onChange={this.handleAllChange}
                    />
                    <div role="alert" class="text-danger">
                      {this.state.errors.vname}
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24} lg={8}>
                  <Form.Item label="unit">
                    <Input
                      placeholder={this.props.unitplaceholder}
                      value={this.props.value3}
                      className="ant-modal-input"
                      name="unit"
                      onChange={this.handleAllChange}
                    />
                    <div role="alert" class="text-danger">
                      {this.state.errors.unit}
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24} lg={8}>
                  <Form.Item label="cost">
                    <Input
                      placeholder={this.props.costplaceholder}
                      value={this.props.value4}
                      className="ant-modal-input"
                      name="price"
                      onChange={this.handleAllChange}
                    />{" "}
                    <div role="alert" class="text-danger">
                      {this.state.errors.price}
                    </div>
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
                <PlusCircleOutlined style={{ fontSize: "24px" }} onClick={this.handleVariationAdd}/>
              </span>
            </div>
            <Col span={24}>
              <Form.Item className="text-center mt-4 mb-0">
                <Button className="ant-cancel-btn me-3">Cancel</Button>
                <Button type="primary" className="ant-add-button" onClick={this.handleSubmit}>
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
