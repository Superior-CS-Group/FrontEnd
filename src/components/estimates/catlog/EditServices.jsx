import React from "react";
import { Row, Col, Form, Input, Button, Modal } from "antd";

import { DollarCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { validateCreateServiceInput } from "../../../validators/catalog/catalog.validator";
import {
  createService,
  updateService,
  deleteCatalog,
} from "../../../api/catalogue";

export default function EditService({
  isAddService,
  isShowModal,
  handleCancel,
  selectedService,
  toggleUpdate,
}) {
  const [itemDetails, setItemDetails] = React.useState({
    name: "",
    productionRate: 0,
    hours: 0,
    day: 0,
    type: "service",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(null);

  const [isDelete, setIsDelete] = React.useState(false);

  const handleInputChange = (e) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (selectedService) {
      setItemDetails({
        ...selectedService,
        productionRate: selectedService.price,
      });
    } else {
      setItemDetails({
        name: "",
        productionRate: 0,
        hours: 0,
        day: 0,
        type: "service",
      });
    }
    setErrors({});
  }, [selectedService]);

  const handleEdit = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    setLoading("edit");
    const { isValid, errors } = validateCreateServiceInput(itemDetails);
    if (!isValid) {
      setErrors(errors);
      setLoading(null);
      return;
    }
    let response = {};
    if (selectedService) {
      response = await updateService(selectedService._id, itemDetails);
    } else {
      response = await createService(itemDetails);
    }
    if (response.remote === "success") {
      handleCancel();
      toggleUpdate();
    } else {
      setErrors(response.errors.errors);
    }
    setLoading(null);
  };

  const handleDeleteCancle = () => {
    setIsDelete(false);
  };

  const handleServiceDelete = async () => {
    setLoading("delete");
    const response = await deleteCatalog(selectedService._id);
    if (response.remote === "success") {
      console.log("success", response);
      handleCancel();
      toggleUpdate();
      handleDeleteCancle();
    } else {
      console.log("error", response);
    }
    setLoading(null);
  };

  return (
    <>
      <Modal
        className="modal-radius"
        title={!isAddService ? "Edit Services" : "Add Services"}
        visible={isShowModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="ant-upload-box">
          <Form layout="vertical">
            <Row gutter={[24, 0]}>
              <Col span={24}>
                <Form.Item label="Service Name">
                  <Input
                    placeholder="Name"
                    size="large"
                    className="ant-furmulla-input radius-30"
                    name="name"
                    onChange={handleInputChange}
                    value={itemDetails.name}
                  />
                  <span className="text-danger">{errors.name}</span>
                </Form.Item>
              </Col>
              <Col md={8}>
                <Form.Item label="Hours">
                  <Input
                    prefix={<DollarCircleOutlined />}
                    placeholder="Hours"
                    size="large"
                    className="ant-furmulla-input radius-30"
                    name="hours"
                    onChange={handleInputChange}
                    type="number"
                    min={1}
                    value={itemDetails.hours}
                  />
                  <span className="text-danger">{errors.hours}</span>
                </Form.Item>
              </Col>
              <Col md={8}>
                <Form.Item label="Days" className="ant-smily-select">
                  <Input
                    className="ant-furmulla-input radius-30"
                    placeholder="Days"
                    size="large"
                    name="day"
                    onChange={handleInputChange}
                    min={1}
                    type="number"
                    value={itemDetails.day}
                  />
                  <span className="text-danger">{errors.day}</span>
                </Form.Item>
              </Col>
              <Col md={8}>
                <Form.Item label="Production Rate">
                  <Input
                    className="ant-furmulla-input radius-30"
                    placeholder="Production Rate"
                    size="large"
                    name="productionRate"
                    onChange={handleInputChange}
                    type="number"
                    min={1}
                    value={itemDetails.productionRate}
                  />
                  <span className="text-danger">{errors.productionRate}</span>
                </Form.Item>
              </Col>

              <Col md={24} className="text-end">
                {selectedService && (
                  <Button
                    type="link"
                    danger
                    className="radius-30 px-4 me-2 btn-width"
                    disabled={loading}
                    onClick={() => setIsDelete(true)}
                    size="large"
                  >
                    Delete Services
                  </Button>
                )}
                <Button
                  type="link"
                  className="radius-30 px-4 me-2 btn-width"
                  onClick={handleCancel}
                  disabled={loading}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  size="large"
                  type="primary"
                  className="radius-30 px-4 btn-width"
                  onClick={handleEdit}
                  disabled={loading}
                >
                  {selectedService && loading === "edit"
                    ? "Updating..."
                    : selectedService && !loading
                    ? "Update"
                    : loading === "edit"
                    ? "Saving..."
                    : "Save"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={isDelete}
        handleCancel={handleDeleteCancle}
        footer={null}
        width={350}
        closeIcon={<InfoCircleOutlined />}
      >
        <p>Are you really want to delete service?</p>
        <Row>
          <Col md={12} className="text-center">
            <Button type="text" onClick={handleDeleteCancle}>
              Cancel
            </Button>
          </Col>
          <Col md={12}>
            <Button type="link" onClick={handleServiceDelete}>
              {loading === "delete" ? "Deleting...." : "Delete"}
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
