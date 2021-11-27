import React from "react";
import { Row, Col, Progress, Form, Input, Button } from "antd";
import { star, upload } from "../../../utils/svg.file";
import {
  CheckOutlined,
  CloseOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import element from "../../../images/boulder.jpg";
import { validateCreateItemInput } from "../../../validators/catalog/catalog.validator";

export default function AddItem({ handleCancel }) {
  const { TextArea } = Input;
  const [loading, setLoading] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState({
    name: "",
    price: "",
    description: "",
    unit: "",
    quantity: "",
    image: [],
  });
  const [errors, setErrors] = React.useState({
    name: "",
    price: "",
    description: "",
    unit: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: Number(e.target.value) || e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setErrors({
      name: "",
      price: "",
      description: "",
      unit: "",
      quantity: "",
    });
    try {
      const { isValid, errors } = validateCreateItemInput(itemDetails);
      if (!isValid) {
        throw errors;
      }
      console.log("itemDetails: ", itemDetails);
      // TODO save item to db
    } catch (error) {
      console.log("error: ", error);
      setErrors(error);
    }
  };

  return (
    <>
      <div className="ant-upload-box">
        <Row gutter={[24, 0]}>
          <Col md={6}>
            <div className="ant-image-upload">
              <span className="ant-star-icon">{star}</span>
              <span className="ant-star-tick ant-position d-none">
                <CheckOutlined />
              </span>
              <span className="ant-star-delete ant-position">
                <CloseOutlined />
              </span>
              <img src={element} alt="" />
            </div>
            <Progress
              percent={50}
              showInfo={false}
              strokeColor="#34C759"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </Col>
          <Col md={6}>
            <div className="ant-image-upload border-dash">
              <div className="d-flex align-items-center  justify-content-center h-100 upload-input">
                <input type="file" />
                {upload}
              </div>
            </div>
          </Col>
        </Row>
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Form.Item label="Name of Material">
                <Input
                  placeholder="Material"
                  size="large"
                  className="ant-furmulla-input radius-30"
                  name="name"
                  onChange={handleInputChange}
                />
                <span className="text-danger small">{errors.name}</span>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="Price">
                <Input
                  prefix={<DollarCircleOutlined />}
                  placeholder="Price"
                  size="large"
                  className="ant-furmulla-input radius-30"
                  name="price"
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                />
                <span className="text-danger small">{errors.price}</span>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="Unit" className="ant-smily-select">
                <Input
                  className="ant-furmulla-input radius-30"
                  placeholder="Unit"
                  size="large"
                  name="unit"
                  onChange={handleInputChange}
                />
                <span className="text-danger small">{errors.unit}</span>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="Quantity">
                <Input
                  className="ant-furmulla-input radius-30"
                  placeholder="Quantity"
                  size="large"
                  name="quantity"
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                />
                <span className="text-danger small">{errors.quantity}</span>
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item label="Description">
                <TextArea
                  className="ant-furmulla-input radius-30 p-3"
                  maxLength={300}
                  onChange={handleInputChange}
                  style={{ height: "120px", resize: "none" }}
                  placeholder="Enter Description about materials"
                  name="description"
                />
                <span className="text-danger small">{errors.description}</span>
              </Form.Item>
            </Col>
            <Col md={24} className="text-end">
              <Button
                type="link"
                className="radius-30 px-4 me-2"
                onClick={() => {
                  handleCancel();
                  setItemDetails({
                    name: "",
                    price: "",
                    description: "",
                    unit: "",
                    quantity: "",
                    image: [],
                  });
                }}
                disabled={loading}
              >
                Cancle
              </Button>
              <Button
                type="primary"
                className="radius-30 px-4"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
