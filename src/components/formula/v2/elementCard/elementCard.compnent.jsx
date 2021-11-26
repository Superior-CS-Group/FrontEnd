import { Col, Input, Row, Select } from "antd";

import React from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";

const typeOfOptions = [
  { type: "manual", title: "Manual Entry" },
  { type: "prefilled", title: "Prefilled but Editable" },
  { type: "dropdown", title: "Dropdown" },
  { type: "result_editable", title: "Result (Editable)" },
  { type: "result_locked", title: "Result (Locked)" },
];

function ElementCard({ element, handleChange, idx, elementList, onFocusOut }) {
  const { Option } = Select;
  const [unit, setUnit] = React.useState([]);
  const [view, setView] = React.useState([]);
  const [typeOfElement, setTypeOfElement] = React.useState("");

  React.useEffect(() => {
    setUnit(["km", "m", "$", "ton", "kg", "sqft"]);
    setTypeOfElement(element.type || "manual");
    setView([
      { type: "client", title: "Client view" },
      { type: "internal", title: "Internal View" },
      { type: "full", title: "Full View" },
    ]);
  }, [element]);

  const renderSection = () => {
    switch (typeOfElement) {
      case "dropdown":
        return (
          <>
            <Col md={8} className="mb-3">
              <label>Choose Dropdown Items:</label>
            </Col>
            <Col md={16}>
              <Select style={{ width: "100%" }}>
                <Option>Option1</Option>
                <Option>Option2</Option>
                <Option>Option3</Option>
                <Option>Option4</Option>
              </Select>
            </Col>
          </>
        );
      case "prefilled":
        return (
          <>
            <Col md={8} className="mb-3">
              <label>Enter Prefilled Amount</label>
            </Col>
            <Col md={16}>
              <Input
                placeholder="0"
                className="ant-furmulla-input"
                onChange={(e) =>
                  handleChange(e.target.value, e.target.name, idx)
                }
                value={element.value}
                name="value"
                onBlur={onFocusOut}
                type="number"
              />
            </Col>
          </>
        );
      case "result_editable":
        return (
          <>
            <Col md={8}>
              <label>Formula(editable)</label>
            </Col>
            <Col md={16}>
              <ReactMentionInput
                className="ant-furmulla-input"
                elementList={elementList.map((element) => ({
                  display: element.name,
                  id: element._id,
                }))}
                onChange={(e) => {
                  e = { target: { ...e.target, name: "value" } };
                  handleChange(e.target.value, e.target.name, idx);
                }}
                placeholder="Enter Formula use '@' for the dynamic values"
                value={element.value}
                onBlur={onFocusOut}
                noMaterial
              />
            </Col>
          </>
        );
      case "result_locked":
        return (
          <>
            <Col md={8}>
              <label>Formula(locked)</label>
            </Col>
            <Col md={16}>
              <ReactMentionInput
                className="ant-furmulla-input"
                elementList={elementList.map((element) => ({
                  display: element.name,
                  id: element._id,
                }))}
                onChange={(e) => {
                  e = { target: { ...e.target, name: "value" } };
                  handleChange(e.target.value, e.target.name, idx);
                }}
                placeholder="Enter Formula use '@' for the dynamic values"
                value={element.value}
                onBlur={onFocusOut}
                noMaterial
              />
            </Col>
          </>
        );
      default:
        return "";
    }
  };
  return (
    <Col span={24} md={6} className="mb-4">
      <div className="furmulla-tree-box  ant-cover-b ant-cover-success px-2 py-4">
        <div className="ant-automic">{element.auto}</div>
        {/* <span className="ant-edit-furmulla">
          <EditOutlined />
        </span> */}
        <Row gutter={[8, 0]} className="align-items-center mb-3">
          <Col md={8}>
            <label>Name Element:</label>
          </Col>
          <Col md={16}>
            <Input
              placeholder="Name of Element"
              className="ant-furmulla-input"
              onChange={(e) => handleChange(e.target.value, e.target.name, idx)}
              value={element.name}
              name="name"
              onBlur={onFocusOut}
              disabled={element.disabled}
            />
          </Col>
        </Row>
        <Row gutter={[8, 0]} className="align-items-center mb-3">
          <Col md={8}>
            <label>Type Of Element:</label>
          </Col>
          <Col md={16}>
            <Select
              className="select-w"
              defaultValue={element.type}
              style={{ width: "100%" }}
              onChange={(value) => {
                handleChange(value, "type", idx);
                setTypeOfElement(value);
              }}
              onBlur={onFocusOut}
            >
              {typeOfOptions.map((item, idx) => {
                return (
                  <Option value={item.type} key={idx}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>

        <Row gutter={[8, 0]} className="align-items-center mb-3">
          {renderSection()}
        </Row>
        <Row gutter={[8, 0]} className="align-items-center mb-3">
          <Col md={8}>
            <label>Unit Type:</label>
          </Col>
          <Col md={16}>
            <Select
              defaultValue={element.unit}
              onChange={(value) => {
                handleChange(value, "unit", idx);
              }}
              className="select-w"
              style={{ width: "100%" }}
              onBlur={onFocusOut}
              listHeight={150}
            >
              <Option>Unit</Option>
              {unit.map((item, index) => {
                return (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row gutter={[8, 0]} className="align-items-center">
          <Col md={8}>
            <label>View</label>
          </Col>
          <Col md={16}>
            <Select
              mode="multiple"
              allowClear
              defaultValue={[...(element.view || [])]}
              onChange={(e) => handleChange(e, "view", idx)}
              className="select-w"
              style={{ width: "100%" }}
              onBlur={onFocusOut}
            >
              {view.map((item, index) => {
                return (
                  <Option value={item.type} key={index}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default ElementCard;
