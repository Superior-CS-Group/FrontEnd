import { Col, Row, Input, Select } from "antd";
import React from "react";

function HiddenValueCard({ hiddenValue, index, handleChange, elementList }) {
  const [isConditional, setIsConditional] = React.useState(false);
  return (
    <tr>
      <td>
        <Row className="align-items-center">
          <Col md={24}>
            <label>Name Value:</label>
          </Col>
          <Col md={24}>
            <Input
              className="ant-furmulla-input"
              name="name"
              value={hiddenValue.name}
            />
          </Col>
        </Row>
      </td>
      <td>
        <Row md={24}>
          <Col md={24}>
            <label>Type:</label>
          </Col>
          <Col md={24}>
            <Select
              style={{ width: "100%" }}
              value={isConditional}
              onChange={(value) => setIsConditional(value)}
            >
              <Select.Option value={true}>Conditional</Select.Option>
              <Select.Option value={false}>Value</Select.Option>
            </Select>
          </Col>
        </Row>
      </td>
      <td>
        <Row md={24}>
          {isConditional ? (
            <>
              <Col md={24}>
                <label>Enter Condition:</label>
              </Col>
              <Col md={24}>
                <div>
                  IF(
                  <Input
                    name="condition"
                    placeholder="Condition"
                    style={{ width: "15%" }}
                    value={hiddenValue.expression.condition}
                  />
                  ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    name="fullfill"
                    placeholder="Fullfill"
                    style={{ width: "15%" }}
                    value={hiddenValue.expression.fullfill}
                  />
                  ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    name="fail"
                    placeholder="Fail"
                    style={{ width: "15%" }}
                    value={hiddenValue.expression.fail}
                  />
                  )
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col md={24}>
                <label>Enter Value:</label>
              </Col>
              <Col md={24}>
                <Input
                  className="ant-furmulla-input px-2 outline w-200"
                  name="condition"
                  value={hiddenValue.value}
                />
              </Col>
            </>
          )}
        </Row>
      </td>
    </tr>
  );
}

export default HiddenValueCard;
