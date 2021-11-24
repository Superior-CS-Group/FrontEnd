import { Col, Input, Row, Select } from "antd";

import React from "react";
import { EditOutlined } from "@ant-design/icons";
function ElementCard({ element, handleChange, idx }) {
  const { Option } = Select;
  const [unit, setUnit] = React.useState([]);
  const [view, setView] = React.useState([]);
  const [typeOfElement, setTypeOfElement] = React.useState("");
  React.useEffect(() => {
    setUnit(["km", "m", "$", "ton", "kg", "sqft"]);
    setTypeOfElement("manual");
    setView([
      { type: "client", title: "Client view" },
      { type: "internal", title: "Internal View" },
      { type: "full", title: "Full View" },
    ]);
  }, []);

  const renderSection = () => {
    switch (typeOfElement) {
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
              <Input
                className="ant-furmulla-input"
                value={element.value}
                name="value"
                onChange={(e) =>
                  handleChange(e.target.value, e.target.name, idx)
                }
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
              <Input
                className="ant-furmulla-input"
                value={element.value}
                name="value"
                onChange={(e) =>
                  handleChange(e.target.value, e.target.name, idx)
                }
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
        <span className="ant-edit-furmulla">
          <EditOutlined />
        </span>
        <Row gutter={[8, 0]} className="align-items-center mb-3">
          <Col md={8}>
            <label>Name Element:</label>
          </Col>
          <Col md={16}>
            <Input
              placeholder="Hours"
              className="ant-furmulla-input"
              onChange={(e) => handleChange(e.target.value, e.target.name, idx)}
              value={element.name}
              name="name"
            />
          </Col>
        </Row>
        <Row gutter={[8, 0]} className="align-items-center mb-3">
          <Col md={8}>
            <label>Type Of Element:</label>
          </Col>
          <Col md={16}>
            <Select
              onChange={(value) => {
                handleChange(value, "type", idx);
                setTypeOfElement(value);
              }}
              className="select-w"
              style={{ width: "100%" }}
              defaultValue={element.type}
            >
              <Option value="manual">Manual Entry</Option>
              <Option value="prefilled">Prefilled but Editable</Option>

              <Option value="result_editable">Result (Editable)</Option>
              <Option value="result_locked">Result (Locked)</Option>
            </Select>
          </Col>
        </Row>

        <Row gutter={[8, 0]} className="align-items-center mb-3">
          <Col md={8}>
            <label>Unit Type:</label>
          </Col>
          <Col md={16}>
            <Select
              defaultValue="Number"
              onChange={(value) => {
                handleChange(value, "unit", idx);
              }}
              className="select-w"
              style={{ width: "100%" }}
              selected={element.value}
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
        <Row gutter={[8, 0]}>{renderSection()}</Row>
        <Row gutter={[8, 0]} className="align-items-center">
          <Col md={8}>
            <label>View</label>
          </Col>
          <Col md={16}>
            <Select
              defaultValue="Client View"
              onChange={(e) => handleChange(e, "view", idx)}
              className="select-w"
              style={{ width: "100%" }}
              selected={element.value}
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
