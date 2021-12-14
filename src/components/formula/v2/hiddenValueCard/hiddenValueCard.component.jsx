import { Col, Row, Input, Select } from "antd";
import React, { useEffect } from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";

function HiddenValueCard({
  hiddenValue,
  index,
  handleChange,
  elementList,
  hiddenValueList,
}) {
  const [isConditional, setIsConditional] = React.useState(false);
  useEffect(() => {
    if (hiddenValue.isConditional) {
      setIsConditional(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <tr>
      <td width="33.333%">
        <Row className="align-items-center">
          <Col md={24}>
            <label>Name Value:</label>
          </Col>
          <Col md={24}>
            <Input
              size="large"
              className="ant-furmulla-input"
              name="name"
              value={hiddenValue.name}
              onChange={(e) => handleChange(e, index)}
            />
          </Col>
        </Row>
      </td>
      <td width="33.333%">
        <Row md={24}>
          <Col md={24}>
            <label>Type:</label>
          </Col>
          <Col md={24}>
            <Select
              className="select-formula"
              size="large"
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
      <td width="33.333%">
        <Row md={24}>
          {isConditional ? (
            <>
              <Col md={24}>
                <label>Enter Condition:</label>
              </Col>
              <Col md={24}>
                <Row gutter={[24, 0]}>
                  <Col lg={8} className="d-flex align-items-center">
                    <span className="me-2">IF(</span>
                    <ReactMentionInput
                      className="ant-furmulla-input w-120"
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

                    <span className="ms-2">,</span>
                  </Col>
                  <Col lg={8} className="d-flex align-items-center">
                    {/* <ReactMentionInput
                      className="ant-furmulla-input w-120"
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
                    /> */}
                    <Input
                      name="fullfill"
                      className="ant-furmulla-input w-120"
                      placeholder="Fullfill"
                      value={hiddenValue.expression.fullfill}
                      onChange={(e) => handleChange(e, index, true)}
                      type="number"
                    />
                    <span className="ms-2">,</span>
                  </Col>
                  <Col lg={8} className="d-flex align-items-center">
                    {/* <ReactMentionInput
                      className="ant-furmulla-input w-120"
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
                    /> */}
                    <Input
                      name="fail"
                      className="ant-furmulla-input w-120"
                      placeholder="Fail"
                      value={hiddenValue.expression.fail}
                      onChange={(e) => handleChange(e, index, true)}
                      type="number"
                    />
                    <span className="ms-2">)</span>{" "}
                  </Col>
                </Row>
              </Col>
            </>
          ) : (
            <>
              <Col md={24}>
                <label>Enter Value:</label>
              </Col>
              <Col md={24}>
                <ReactMentionInput
                  className="ant-furmulla-input"
                  elementList={elementList.map((element) => ({
                    display: element.name,
                    id: element._id,
                  }))}
                  onChange={(e, newValue) => {
                    handleChange(
                      { target: { ...e.target, name: "value" } },
                      index,
                      false,
                      newValue
                    );
                  }}
                  placeholder="Value"
                  value={hiddenValue.value}
                  hiddenInputList={hiddenValueList.map(
                    (hiddenValue, index) => ({
                      display: hiddenValue.name,
                      id: hiddenValue._id,
                    })
                  )}
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
