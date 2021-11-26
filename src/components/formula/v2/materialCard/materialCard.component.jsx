import { Col, Input, Row } from "antd";
import React from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";

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
          <Col md={12}>
            <label>Name Material:</label>
          </Col>
          <Col md={12}>
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
          <Col md={12}>
            <label>Enter Quantity:</label>
          </Col>
          <Col md={16}>
            <ReactMentionInput
              className="ant-furmulla-input px-2 outline"
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
          <Col md={8}>
            <label>Cost:</label>
          </Col>
          <Col
            md={16}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {"{Quantity} * "}
            <ReactMentionInput
              className="ant-furmulla-input px-2 outline"
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
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-start">
          <Col md={8}>
            <label>Charge:</label>
          </Col>
          <Col md={16}>
            <ReactMentionInput
              className="ant-furmulla-input"
              elementList={elementList.map((element) => ({
                display: element.name,
                id: element._id,
              }))}
              onChange={(e, newValue) => {
                e = { target: { ...e.target, name: "cost" } };
                handleChange(e, index, newValue);
              }}
              placeholder="Enter Charge use '@' and '#' for the dynamic values"
              value={material.charge}
              onBlur={onFocusOut}
              disabled
            />
          </Col>
        </Row>
      </td>
    </tr>
  );
}

export default MaterialCard;
