import { Checkbox, Col, Input, Row, Select } from "antd";
import React from "react";
import { getSuggestions } from "../../../../api/formula";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";

function MaterialCard({
  material,
  handleChange,
  index,
  elementList,
  onFocusOut,
}) {
  const [catalog, setCatalog] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [isNumaric, setIsNumaric] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);

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
  console.log("material: ", material);
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
              onBlur={onFocusOut}
            />
          </Col>
        </Row>
      </td>
      <td>
        <Row>
          <Col md={8}>
            <label>Enter Quantity:</label>
            <Checkbox
              value={isNumaric}
              onChange={(e) => setIsNumaric(e.target.checked)}
            >
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
                onBlur={onFocusOut}
                min={1}
              />
            ) : (
              <Select
                showSearch
                className="select-w"
                style={{ width: "100%" }}
                placeholder="Select a element"
                optionFilterProp="children"
                onChange={(e) => {
                  handleChange(
                    { target: { value: e, name: "quantity" } },
                    index
                  );
                }}
                onBlur={onFocusOut}
                filterOption={(input, option) => {
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
                setValue(e.target.value);
              }}
              placeholder="Enter Client Contract use '@' and '#' for the dynamic values"
              value={material.cost}
              onBlur={onFocusOut}
            />
          </Col>
        </Row>
      </td>
      <td>
        <Row className="align-items-center">
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
                setValue(e.target.value);
              }}
              placeholder="Enter Client Contract use '@' and '#' for the dynamic values"
              value={material.charge}
              onBlur={onFocusOut}
              disabled
            />
            {/* <Input
              className="ant-furmulla-input"
              name="charge"
              onChange={(e) => {
                handleChange(e, index);
              }}
              onBlur={onFocusOut}
              value={material.charge}
              disabled
            /> */}
          </Col>
        </Row>
      </td>
    </tr>
  );
}

export default MaterialCard;
