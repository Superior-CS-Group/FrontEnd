import React, { Component } from "react";
import { Button, Input, Form, Row, Col, Upload, message } from "antd";
import {
  LinkOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { postData } from "../../utils/fetchApi";

const { Dragger } = Upload;

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
      ModalVisible: false,
      variation: [
        {
          name: "",
          price: "",
          unit: "",
          error: {
            name: "",
            price: "",
            unit: "",
          },
        },
      ],
    };
  }

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description This methode is used to add new empty variation
   */
  handleVariationAdd = (e) => {
    const newVariation = {
      name: "",
      price: "",
      unit: "",
      error: {
        name: "",
        price: "",
        unit: "",
      },
    };
    this.setState({ variation: [...this.state.variation, newVariation] });
  };
  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description This methode is used to remove variation
   * @param {number} idx - index of variation to remove
   */
  handleVariationRemove = (idx) => {
    const newVariation = [...this.state.variation];
    newVariation.splice(idx, 1);
    this.setState({ variation: newVariation });
  };

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description This method is used to handle all the changes in the variations section
   * @param {event} e - event object used to update field
   * @param {number} idx - index of the selected variation
   */
  handleVariationChange = (idx) => (e) => {
    const newVariation = this.state.variation.map((variation, sidx) => {
      this.validateVariationInputFields(variation);
      if (idx !== sidx) return variation;
      return { ...variation, [e.target.name]: e.target.value };
    });
    this.setState({ variation: newVariation });
  };

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description This method is used to validate input fields.
   * @param {object} variation - variation object to be validated
   */
  validateVariationInputFields = (variation) => {
    if (!variation.name) {
      variation.error.name = "Name is required";
    } else {
      variation.error.name = "";
    }
    if (!variation.unit) {
      variation.error.unit = "Unit is required";
    } else {
      variation.error.unit = "";
    }
    if (!variation.price) {
      variation.error.price = "Price is required";
    } else {
      variation.error.price = "";
    }
  };

  validateFields = () => {
    const errors = {};
    if (!this.state.name) {
      errors.name = "Material Name is not blank";
    }
    if (this.state.variation.length === 0) {
      errors.vname = "Variation Name is not blank";
      errors.price = "Variation Price is not blank";
      errors.unit = "Variation Unit is not blank";
    }
    // if (!this.state.vname) {
    //   errors.vname = "Variation Name is not blank";
    // }
    // if (!this.state.price) {
    //   errors.price = "Variation Price is not blank";
    // }
    // if (!this.state.unit) {
    //   errors.unit = "Variation Unit is not blank";
    // }
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errors: {} });
    const { errors, isValid } = this.validateFields();
    if (!isValid) {
      this.setState({ errors });
      return;
    }

    const { name, type, variation } = this.state;
    const body = { name, type, variation };

    try {
      await postData(`services/add`, body);
      this.setState({
        ...this.state,
        message: "New Material Added!",
        name: "",
        vname: "",
        price: "",
        unit: "",
        isRedirect: true,
        isLoading: false,
        ModalVisible: false,
      });
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
            {this.state.variation.map((variation, index) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-start"
                  style={{ paddingLeft: "12px", paddingRight: "12px" }}
                  key={index}
                >
                  <Row gutter={[24, 0]} className="matrial">
                    <Col span={24} lg={8}>
                      <Form.Item label="Variations">
                        <Input
                          placeholder="Variation"
                          className="ant-modal-input"
                          value={variation.name}
                          onChange={this.handleVariationChange(index)}
                          name="name"
                        />
                        <div role="alert" class="text-danger">
                          {variation.error.name}
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={8}>
                      <Form.Item label="Unit">
                        <Input
                          placeholder="Unit"
                          className="ant-modal-input"
                          value={variation.unit}
                          onChange={this.handleVariationChange(index)}
                          name="unit"
                        />
                        <div role="alert" class="text-danger">
                          {variation.error.unit}
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={8}>
                      <Form.Item label="Cost">
                        <Input
                          placeholder="Price"
                          className="ant-modal-input"
                          value={variation.price}
                          onChange={this.handleVariationChange(index)}
                          name="price"
                          type="number"
                        />{" "}
                        <div role="alert" class="text-danger">
                          {variation.error.price}
                        </div>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Upload Image">
                        <Dragger {...props}>
                          <p className="ant-upload-drag-icon">
                            <LinkOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly
                            prohibit from uploading company data or other band
                            files
                          </p>
                        </Dragger>
                      </Form.Item>
                    </Col>
                  </Row>

                  <span className="text-primary rounded-circle ms-2 mt-50">
                    {index + 1 === this.state.variation.length ? (
                      <PlusCircleOutlined
                        style={{ fontSize: "24px" }}
                        onClick={this.handleVariationAdd}
                      />
                    ) : (
                      <MinusCircleOutlined
                        style={{ fontSize: "24px" }}
                        onClick={this.handleVariationRemove}
                      />
                    )}
                  </span>
                </div>
              );
            })}

            <Col span={24}>
              <Form.Item className="text-center mt-4 mb-0">
                <div role="alert" class="text-success">
                  {this.state.message}
                </div>
                <Button className="ant-cancel-btn me-3">Cancel</Button>
                <Button
                  type="primary"
                  className="ant-add-button"
                  onClick={this.handleSubmit}
                >
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
