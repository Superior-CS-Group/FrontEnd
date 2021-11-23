import { Checkbox, Col, Input, Row, Select } from "antd";
import React from "react";
import { getSuggestions } from "../../../../api/formula";

function MaterialCard({ material, handleChange, index, elementList }) {
  const [catalog, setCatalog] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [isNumaric, setIsNumaric] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      const newValue =
        value.split("{Quantity} * ")[1] || value.split("{Quantity} * ")[0];
      const response = await getSuggestions("material", newValue);
      if (response.remote === "success") {
        setCatalog(response.data);
      }
    }
    if (value.length) {
      fetchData();
    }
  }, [value]);
  return (
    <tr>
      <td>
        <Row className="align-items-center">
          <Col md={8}>
            <label>Name Material:</label>
          </Col>
          <Col md={16}>
            <Input
              className="ant-furmulla-input"
              name="name"
              onChange={(e) => handleChange(e, index)}
              value={material.name}
            />
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-center">
          <Col md={8}>
            <label>Enter Quantity:</label>
            <Checkbox value={isNumaric} onChange={(e) => setIsNumaric(e)}>
              use numaric
            </Checkbox>
          </Col>
          <Col md={16}>
            {isNumaric ? (
              <Input
                placeholder="Number"
                className="ant-furmulla-input"
                type="number"
                onChange={(e) => handleChange(e, index)}
                name="quantity"
                min={1}
              />
            ) : (
              <Select
                showSearch
                style={{ width: 200 }}
                className="ant-furmulla-input"
                placeholder="Select a element"
                optionFilterProp="children"
                onChange={(e) => {
                  handleChange(
                    { target: { value: e, name: "quantity" } },
                    index
                  );
                }}
                filterOption={(input, option) => {
                  console.log("input: ", { input, option });
                  return (
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  );
                }}
              >
                {elementList.map((elem, idx) => {
                  return (
                    <Select.Option value={elem.name}>{elem.name}</Select.Option>
                  );
                })}
              </Select>
            )}
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-center">
          <Col md={8}>
            <label>Cost:</label>
          </Col>
          <Col md={16}>
            <Input
              className="ant-furmulla-input"
              name="cost"
              onChange={(e) => {
                handleChange(e, index);
                setValue(e.target.value);
              }}
              value={material.cost}
            />
          </Col>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {catalog.map((cat, idx) => {
              return (
                <span
                  key={idx}
                  onClick={() => {
                    handleChange(
                      { target: { value: cat.name, name: "cost" } },
                      index
                    );
                    setCatalog([]);
                    setValue("");
                  }}
                >
                  {cat.name}
                </span>
              );
            })}
          </div>
        </Row>
      </td>
      <td>
        <Row className="align-items-center">
          <Col md={8}>
            <label>Charge:</label>
          </Col>
          <Col md={16}>
            <Input
              className="ant-furmulla-input"
              name="charge"
              onChange={(e) => handleChange(e, index)}
              value={material.charge}
            />
          </Col>
        </Row>
      </td>
    </tr>
  );
}

export default MaterialCard;
