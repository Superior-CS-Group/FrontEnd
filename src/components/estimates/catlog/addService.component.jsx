import React from "react";
import { Row, Col, Form, Input, Button, Modal } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";

import { validateCreateItemInput } from "../../../validators/catalog/catalog.validator";
import { createCatalogItem, createVariation } from "../../../api/catalogue";

export default function AddService(
  props,
  handleCancel,
  selectedSubCatalog,
  setSelectedSubCatalog,
  handelUpdate
) {
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
      <Modal
        className="modal-radius"
        title={props.title}
        visible={props.isAddService}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <div className="ant-upload-box">
          <Form layout="vertical">
            <Row gutter={[24, 0]}>
              <Col span={24}>
                <Form.Item label="Service Name">
                  <Input
                    placeholder="Material"
                    size="large"
                    className="ant-furmulla-input radius-30"
                    name="name"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col md={8}>
                <Form.Item label="Hours">
                  <Input
                    prefix={<DollarCircleOutlined />}
                    placeholder="Hours"
                    size="large"
                    className="ant-furmulla-input radius-30"
                    name="Hours"
                    onChange={handleInputChange}
                    type="text"
                  />
                </Form.Item>
              </Col>
              <Col md={8}>
                <Form.Item label="Days" className="ant-smily-select">
                  <Input
                    className="ant-furmulla-input radius-30"
                    placeholder="Days"
                    size="large"
                    name="Days"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col md={8}>
                <Form.Item label="Production Rate">
                  <Input
                    className="ant-furmulla-input radius-30"
                    placeholder="Production Rate"
                    size="large"
                    name="Production"
                    onChange={handleInputChange}
                    type="text"
                  />
                </Form.Item>
              </Col>

              <Col md={24} className="text-end">
                <Button
                  type="link"
                  className="radius-30 px-4 me-2 btn-width"
                  onClick={props.handleCancel}
                  disabled={loading}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  size="large"
                  type="primary"
                  className="radius-30 px-4 btn-width"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>{" "}
    </>
  );
}
