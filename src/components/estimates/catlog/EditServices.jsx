import React from "react";
import { Row, Col, Form, Input, Button, Modal } from "antd";

import { DollarCircleOutlined } from "@ant-design/icons";

export default function EditService({
  handleCancel,
  handleInputChange,
  handleSave,
  loading,
  selectedService,
  title,
  handleOk,
  isEditservices,
  errors,
  deleteServiecs,
  isAddService,
}) {
  if (selectedService) {
    // var isEditservices = {
    //   name: selectedService.name,
    // };
  }
  console.log(("wwwwww", selectedService));

  if (selectedService) {
    var { name, hours, day, price } = selectedService;
  }
  return (
    <>
      <Modal
        className="modal-radius"
        title={!isAddService ? "Edit Services" : "Add Services"}
        visible={isEditservices}
        onOk={handleOk}
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
                    value={!isAddService ? name : isEditservices.name}
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
                    value={!isAddService ? hours : isEditservices.hours}
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
                    value={!isAddService ? day : isEditservices.day}
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
                    value={!isAddService ? price : isEditservices.price}
                  />
                  <span className="text-danger">{errors.productionRate}</span>
                </Form.Item>
              </Col>

              <Col md={24} className="text-end">
                {!isAddService && (
                  <Button
                    type="link"
                    danger
                    className="radius-30 px-4 me-2 btn-width"
                    onClick={handleCancel}
                    disabled={loading}
                    onClick={(e) => deleteServiecs(selectedService._id)}
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
                {!isAddService ? (
                  <Button
                    size="large"
                    type="primary"
                    className="radius-30 px-4 btn-width"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                ) : (
                  <Button
                    size="large"
                    type="primary"
                    className="radius-30 px-4 btn-width"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
