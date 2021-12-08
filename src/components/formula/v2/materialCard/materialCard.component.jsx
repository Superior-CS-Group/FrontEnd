import { Checkbox, Col, Input, Modal, Row, Button } from "antd";
import React from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
function MaterialCard({
  material,
  handleChange,
  index,
  elementList,
  onFocusOut,
  handleRemoveMaterial,
}) {
  const [manualCharge, setManualCharge] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(null);
  const [isDeleteing, setIsDeleteing] = React.useState(false);
  React.useEffect(() => {
    setManualCharge(material.manual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <tr>
      <td>
        <Row className="align-items-center">
          <Col md={24}>
            <label>Name Material:</label>
          </Col>
          <Col md={24}>
            <Input
              className="ant-furmulla-input"
              name="name"
              onChange={(e) => handleChange(e, index)}
              value={material.name}
              onBlur={onFocusOut}
            />
          </Col>
        </Row>
      </td>
      <td>
        <Row>
          <Col md={24}>
            <label>Enter Quantity:</label>
          </Col>
          <Col md={24}>
            <ReactMentionInput
              className="ant-furmulla-input px-2 outline w-200"
              elementList={elementList.map((element) => ({
                display: element.name,
                id: element._id,
              }))}
              onChange={(e, newValue) => {
                e = { target: { ...e.target, name: "quantity" } };
                handleChange(e, index, newValue);
              }}
              placeholder="Enter Charge use '@' and '#' for the dynamic values"
              value={material.quantity}
              onBlur={onFocusOut}
            />
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-start">
          <Col md={24}>
            <label>Cost:</label>{" "}
            <span className="me-2 text-spaceb"> {"{Quantity} * "}</span>
          </Col>
          <Col md={24}>
            <div className="d-flex">
              <ReactMentionInput
                className="ant-furmulla-input px-2 outline w-200"
                elementList={elementList.map((element) => ({
                  display: element.name,
                  id: element._id,
                }))}
                onChange={(e, newValue) => {
                  e = { target: { ...e.target, name: "cost" } };
                  handleChange(e, index, newValue);
                }}
                placeholder="Enter Charge use '@' and '#' for the dynamic values"
                value={material.cost}
                onBlur={onFocusOut}
              />
            </div>
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-start">
          <Col md={24}>
            <label>Charge:</label>
            <Checkbox onChange={(e) => setManualCharge(e.target.checked)}>
              Manual
            </Checkbox>
          </Col>
          <Col md={24}>
            <ReactMentionInput
              className="ant-furmulla-input w-200"
              elementList={elementList.map((element) => ({
                display: element.name,
                id: element._id,
              }))}
              onChange={(e, newValue) => {
                e = {
                  target: { ...e.target, name: "charge", manual: manualCharge },
                };
                handleChange(e, index, newValue);
              }}
              placeholder="Enter Charge use '@' and '#' for the dynamic values"
              value={material.charge}
              onBlur={onFocusOut}
              disabled={!manualCharge}
            />
          </Col>
        </Row>
        <span
          className="delect"
          style={{ cursor: "pointer" }}
          onClick={() => setShowDeleteModal(true)}
        >
          <DeleteOutlined className="text-danger" />
        </span>
      </td>
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={showDeleteModal !== null}
        closeIcon={<InfoCircleOutlined />}
        width={350}
        footer={null}
      >
        <p>Are you sure you want to delete this service?</p>
        <Row>
          <Col md={12} className="text-center">
            <Button
              type="text"
              onClick={() => {
                setShowDeleteModal(false);
              }}
              disabled={isDeleteing}
            >
              Cancel
            </Button>
          </Col>
          <Col md={12}>
            <Button
              type="link"
              onClick={() => handleRemoveMaterial(index, setIsDeleteing)}
              disabled={isDeleteing}
            >
              {isDeleteing ? "Deleting..." : "Delete"}
            </Button>
          </Col>
        </Row>
      </Modal>
    </tr>
  );
}

export default MaterialCard;
