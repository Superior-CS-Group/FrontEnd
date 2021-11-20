import React from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CustomTag from "../tag/tag.component";
import {
  generateRandomId,
  handleGenerateFormula,
} from "../../../utils/formula/formula";

const inputs = [
  { title: "User Input", value: "userInput" },
  { title: "Materails", value: "materials" },
  { title: "Arthmatic", value: "arthmatic" },
  { title: "Prebuilt Service", value: "preBuiltService" },
  { title: "MISC", value: "misc" },
];
const arthmaticOperations = [
  { name: "Addition {+}", value: "+" },
  { name: "Subtraction {-}", value: "-" },
  { name: "Multiplication {*}", value: "*" },
  { name: "Division {/}", value: "/" },
  { name: "Open Breacket {(}", value: "(" },
  { name: "Close Breacket {)}", value: ")" },
];

/**
 * @author digimonk Technologies
 * @developer Saral Shrivastava
 * @description this function will update element to the tree
 * @param {object} props
 * @returns jsx element
 */
function EditNode(props) {
  const [inputType, setInputType] = React.useState(inputs[0].value);
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const [formula, setFormula] = React.useState({
    formula: "",
    formulaToShow: "",
    formulaDepenedencies: [],
    formulaArray: [],
  });

  React.useEffect(() => {
    switch (inputType) {
      case "arthmatic":
        setSuggestions(arthmaticOperations);
        break;
      default:
        break;
    }
    // TODO: fetch suggestions from server according to inputType and store in suggestions
  }, [inputType, inputValue]);

  React.useEffect(() => {
    const string = handleGenerateFormula(formula.formulaArray);
    console.log("UPDATE: ", string);
    setFormula({
      ...formula,
      formulaToShow: string.formulaToShow,
      formula: string.formula,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula.formulaArray.length]);

  const handleInputValueChange = (e) => setInputValue(e.target.value);

  const handleInputTypeChange = (value) => setInputType(value);

  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description this function takes value as a string and returns a object with
   * @param {value} value - element value which needs to be process
   * @returns {object} - object with customId, name, type and quantity, unit are optional
   */
  const proccessFormulaElement = (value) => {
    // check value present in the suggestions
    let newValue = suggestions.find((suggestion) =>
      suggestion.name.toLowerCase().includes(value?.toLowerCase() || "")
    );
    if (!newValue) {
      newValue = {
        customId: generateRandomId(),
        name: value,
      };
    }
    newValue.type = inputType;
    switch (inputType) {
      case "materials":
        newValue.quantity = 1;
        newValue.unit = "";
        newValue.customId = "@@@" + newValue.customId.toString();
        break;
      case "userInput":
        newValue.unit = "";
        newValue.customId = "###" + newValue.customId.toString();
        break;
      case "preBuiltService":
        newValue.customId = "***" + newValue.customId.toString();
        break;
      case "arthmatic":
        // if (newValue.name.test(/[+-\/\*()])/g){

        // }
        // TODO: check if value is arthmatic operation or not with regex
        break;
      default:
        newValue.customId = "@@@" + newValue.customId.toString();
        break;
    }
    return newValue;
  };
  /**
   * @author digimonk Technologies
   * @developer Saral Shrivastava
   * @description this function will add element to formulaArray used to show formula in saperatly in DOM
   * @param {event} e
   * @param {number} idx Index at which we are adding new element or updating it
   */
  const handleAddElement = (e, idx) => {
    e.preventDefault();
    const value = proccessFormulaElement(inputValue);
    const newFormula = [...formula.formulaArray];
    if (newFormula.length > idx) {
      newFormula[idx] = value;
    } else {
      newFormula.push(value);
    }
    console.log("formula: ", newFormula);
    setFormula({
      ...formula,
      formulaArray: newFormula,
    });
  };
  return (
    <div className="bottom-modal p-4 pt-3">
      <Form layout="vertical">
        <Row gutter={[24, 0]} className="mb-3">
          <Col span={24}>
            <h5 className="text-center mb-4">
              Define Formula {props.node.name}
              <span className="float-end closeicon" onClick={props.handleClose}>
                <CloseOutlined />
              </span>
            </h5>
          </Col>
          <Col lg={4}>
            <Select
              size="large"
              className="ant-formulla"
              defaultValue="User Input"
              style={{ width: "100%", borderRadius: "9px" }}
              onChange={handleInputTypeChange}
              selected={inputType}
            >
              {inputs.map((input) => {
                return (
                  <Select.Option key={input.value} value={input.value}>
                    {input.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
          <Col lg={16}>
            <Input
              placeholder="length of per pipe"
              className="radius-9"
              size="large"
              onChange={handleInputValueChange}
              value={inputValue}
            />
            <div>
              {suggestions.map((suggestion) => {
                return (
                  <>
                    <span>{suggestion.name}</span>
                    <br />
                  </>
                );
              })}
            </div>
          </Col>
          <Col lg={4}>
            <Button
              type="primary"
              size="large"
              className="radius-9"
              block
              onClick={handleAddElement}
            >
              Add Element
            </Button>
          </Col>
        </Row>
        <Row>
          <h6>{formula.formulaToShow}</h6>
        </Row>
        <Row gutter={[24, 0]}>
          <Col lg={20}>
            <Form.Item>
              <div className="radius-9 ant-blue-add-tree-box">
                <ul>
                  {formula.formulaArray.map((element, idx) => {
                    return <CustomTag title={element.name} key={idx} />;
                  })}
                </ul>
              </div>
            </Form.Item>
          </Col>
          <Col lg={4}>
            <Button type="primary" size="large" className="radius-9" block>
              Save Formula
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditNode;
