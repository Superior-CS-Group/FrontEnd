import { Checkbox, Col, Input, Modal, Row, Button, Select } from "antd";
import React from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { GetAllUnits } from "../../../../api/unit";
function MaterialCard({
  material,
  handleChange,
  index,
  elementList,
  onFocusOut,
  handleRemoveMaterial,
  hiddenValueList,
}) {
  const [manualCharge, setManualCharge] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(null);
  const [isDeleteing, setIsDeleteing] = React.useState(false);
  const [materialTypeList, setMaterialTypeList] = React.useState([]);
  const [units, setUnits] = React.useState([]);
  React.useEffect(() => {
    console.log("material: ", material.manual);
    setManualCharge(material.manual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMaterialTypeList([
      { value: "material", label: "Material Cost" },
      { value: "labor", label: "Labor Cost" },
      { value: "subcontractor", label: "Subcontractor Cost" },
    ]);
    getUnitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUnitList() {
    const response = await GetAllUnits();
    if (response.remote === "success") {
      setUnits(response.data.userData);
    }
  }

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
              hiddenInputList={hiddenValueList.map((hiddenValue, index) => ({
                display: hiddenValue.name,
                id: hiddenValue._id,
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
        <Row className="align-items-center">
          <Col md={24}>
            <label>Unit</label>
          </Col>
          <Col md={24}>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => {
                handleChange({ target: { name: "unit", value } }, index);
              }}
              value={material.unit}
            >
              <Select.Option value=""> Unit less</Select.Option>
              {units.map((unit, index) => {
                return (
                  <Select.Option value={unit._id} key={index}>
                    {unit.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-start">
          <Col md={24}>
            <label>Cost:</label>{" "}
            {/* <span className="me-2 text-spaceb"> {"{Quantity} * "}</span> */}
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
                isMaterialInput
                hiddenInputList={hiddenValueList.map((hiddenValue, index) => ({
                  display: hiddenValue.name,
                  id: hiddenValue._id,
                }))}
              />
            </div>
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-start">
          <Col md={24}>
            <label>Type: </label>
          </Col>
          <Col md={24}>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => {
                handleChange({ target: { name: "type", value } }, index);
              }}
              value={material.type}
              onBlur={onFocusOut}
            >
              {materialTypeList.map((type) => (
                <Select.Option value={type.value} key={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-start">
          <Col md={24}>
            <label>Charge:</label>
            <Checkbox
              onChange={(e) => setManualCharge(e.target.checked)}
              checked={manualCharge}
            >
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
              isMaterialInput
              hiddenInputList={hiddenValueList.map((hiddenValue, index) => ({
                display: hiddenValue.name,
                id: hiddenValue._id,
              }))}
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
