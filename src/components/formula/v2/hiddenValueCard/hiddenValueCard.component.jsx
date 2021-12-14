import { Col, Row, Input, Select } from "antd";
import React, { useEffect } from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";

function HiddenValueCard({ hiddenValue, index, handleChange, elementList }) {
  const [isConditional, setIsConditional] = React.useState(false);
  useEffect(() => {
    if (hiddenValue.isConditional) {
      setIsConditional(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              onChange={(e) => handleChange(e, index)}
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
              onChange={(value) => {
                setIsConditional(value);
                handleChange(
                  { target: { value: value, name: "isConditional" } },
                  index
                );
              }}
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
                  <ReactMentionInput
                    className="ant-furmulla-input"
                    elementList={elementList.map((element) => ({
                      display: element.name,
                      id: element._id,
                    }))}
                    onChange={(e, newValue) => {
                      handleChange(
                        { target: { ...e.target, name: "condition" } },
                        index,
                        true,
                        newValue
                      );
                    }}
                    placeholder="Condition"
                    value={hiddenValue.expression.condition}
                  />
                  {/* <Input
                    name="condition"
                    placeholder="Condition"
                    style={{ width: "15%" }}
                    value={hiddenValue.expression.condition}
                    onChange={(e) => handleChange(e, index)}
                  /> */}
                  ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <ReactMentionInput
                    className="ant-furmulla-input"
                    elementList={elementList.map((element) => ({
                      display: element.name,
                      id: element._id,
                    }))}
                    onChange={(e, newValue) => {
                      handleChange(
                        { target: { ...e.target, name: "fullfill" } },
                        index,
                        true,
                        newValue
                      );
                    }}
                    placeholder="Condition"
                    value={hiddenValue.expression.fullfill}
                  />
                  {/* <Input
                    name="fullfill"
                    placeholder="Fullfill"
                    style={{ width: "15%" }}
                    value={hiddenValue.expression.fullfill}
                    onChange={(e) => handleChange(e, index)}
                  /> */}
                  ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <ReactMentionInput
                    className="ant-furmulla-input"
                    elementList={elementList.map((element) => ({
                      display: element.name,
                      id: element._id,
                    }))}
                    onChange={(e, newValue) => {
                      handleChange(
                        { target: { ...e.target, name: "fail" } },
                        index,
                        true,
                        newValue
                      );
                    }}
                    placeholder="Condition"
                    value={hiddenValue.expression.fail}
                  />
                  {/* <Input
                    name="fail"
                    placeholder="Fail"
                    style={{ width: "15%" }}
                    value={hiddenValue.expression.fail}
                    onChange={(e) => handleChange(e, index)}
                  /> */}
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
