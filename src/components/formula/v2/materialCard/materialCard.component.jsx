import { Col, Input, Row } from "antd";
import React from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";
import DeleteModal from "../../../modal/deleteModal.component";
import { DeleteOutlined } from "@ant-design/icons";
function MaterialCard({
  material,
  handleChange,
  index,
  elementList,
  onFocusOut,
}) {
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
              placeholder="Enter Client Contract use '@' and '#' for the dynamic values"
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
                placeholder="Enter Client Contract use '@' and '#' for the dynamic values"
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
          </Col>
          <Col md={24}>
            <ReactMentionInput
              className="ant-furmulla-input w-200"
              elementList={elementList.map((element) => ({
                display: element.name,
                id: element._id,
              }))}
              onChange={(e, newValue) => {
                e = { target: { ...e.target, name: "charge" } };
                handleChange(e, index, newValue);
              }}
              placeholder="Enter Charge use '@' and '#' for the dynamic values"
              value={material.charge}
              onBlur={onFocusOut}
              disabled
            />
          </Col>
        </Row>
        <span className="delect">
          <DeleteOutlined className="text-danger" onClick={DeleteModal} />
        </span>
      </td>
    </tr>
  );
}

export default MaterialCard;
