import React from "react";
import { Row, Col, Progress, Form, Input, Button } from "antd";
import { star, upload } from "../../../utils/svg.file";
import {
  CheckOutlined,
  CloseOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import element from "../../../images/placeholder.jpg";
import { validateCreateItemInput } from "../../../validators/catalog/catalog.validator";
import Loader from "../../loader";
import { createCatalogItem, createVariation } from "../../../api/catalogue";

export default function AddItem({
  handleCancel,
  selectedSubCatalog,
  setSelectedSubCatalog,
  handelUpdate,
}) {
  const { TextArea } = Input;
  const [loading, setLoading] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState({
    name: "",
    price: "",
    description: "",
    unit: "",
    quantity: "",
    image: [],
    type: "catalog",
  });
  const [errors, setErrors] = React.useState({
    name: "",
    price: "",
    description: "",
    unit: "",
    quantity: "",
  });

  const handleClose = () => {
    setItemDetails({
      name: "",
      price: "",
      description: "",
      unit: "",
      quantity: "",
      image: [],
      type: "catalog",
    });
    setErrors({
      name: "",
      price: "",
      description: "",
      unit: "",
      quantity: "",
    });
    handleCancel();
  };

  const handleInputChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: Number(e.target.value) || e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrors({
      name: "",
      price: "",
      description: "",
      unit: "",
      quantity: "",
    });
    setLoading(true);
    try {
      const { isValid, errors } = validateCreateItemInput(itemDetails);
      console.log("isValid: ", isValid);
      if (!isValid) {
        throw errors;
      }
      console.log("itemDetails: ", itemDetails);
      let response = {};
      if (selectedSubCatalog) {
        response = await createVariation({
          ...itemDetails,
          catelogId: selectedSubCatalog,
        });
      } else {
        response = await createCatalogItem(itemDetails);
      }
      if (response.remote === "success") {
        setTimeout(() => {
          setLoading(false);
          handleClose();
          setSelectedSubCatalog("");
          handelUpdate();
        }, 1000);
      } else {
        setErrors(response.errors.errors);
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
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
                  value={itemDetails.name}
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
                  value={itemDetails.price}
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
                  value={itemDetails.unit}
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
                  value={itemDetails.quantity}
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
                  value={itemDetails.description}
                />
                <span className="text-danger small">{errors.description}</span>
              </Form.Item>
            </Col>
            <Col md={24} className="text-end">
              <Button
                type="link"
                className="radius-30 px-4 me-2"
                onClick={handleClose}
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
