import { Card, Col, Input, Row } from "antd";
import React from "react";
import { treeIcon } from "../../../utils/svg.file";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import ElementCard from "./elementCard/elementCard.compnent";
import MaterialCard from "./materialCard/materialCard.component";

const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000000);
};

/**
 * @author digimonk Technologies
 * @developer Saral Shrivastava
 * @version 2.0.0
 */
function FormulaV2() {
  const [elementList, setElementList] = React.useState([
    {
      customId: generateRandomId(),
      name: "Total Cost",
      type: "result_locked",
      unit: "",
      value: "",
      view: "client",
    },
    {
      customId: generateRandomId(),
      name: "Gross Profit",
      type: "result_locked",
      unit: "",
      value: "",
      view: "client",
    },
    {
      customId: generateRandomId(),
      name: "Markup",
      type: "result_editable",
      unit: "",
      value: "",
      view: "client",
    },
  ]);
  const [materials, setMaterials] = React.useState([]);
  const handleChange = (value, name, index) => {
    const newElementList = [...elementList];
    newElementList[index][name] = value;
    setElementList([...newElementList]);
  };
  const handleNewElement = () => {
    const newElement = {
      customId: generateRandomId(),
      name: "",
      type: "manual",
      unit: "",
      value: "",
      view: "client",
    };
    setElementList([newElement, ...elementList]);
  };

  const handleMaterialChange = (e, index) => {
    const newMaterials = [...materials];
    if (e.target.name === "cost") {
      console.log(e.target.value);
      if (e.target.value.startsWith("{Quantity} *")) {
        newMaterials[index][e.target.name] = `{Quantity} * ${e.target.value
          .split("{Quantity} *")[1]
          .trimLeft()}`;
      } else {
        newMaterials[index][e.target.name] = `{Quantity} * ${e.target.value}`;
      }
    } else {
      newMaterials[index][e.target.name] = e.target.value;
    }
    console.log(newMaterials, index);
    setMaterials([...newMaterials]);
  };

  const handleAddMaterial = () => {
    const newMaterial = {
      name: "",
      quantity: "",
      cost: "",
      charge: "",
    };
    setMaterials([...materials, newMaterial]);
  };
  return (
    <>
      <BreadcrumbBar name="Add Service" breaclass="mb-3" />
      <Card
        className="shadow estimate-card mb-4"
        style={{ borderRadius: "10px" }}
      >
        <div className="furmulla-tree d-flex align-items-center justify-content-center flex-column">
          <div className="furmulla-tree-box d-inline-flex ant-cover-b ant-cover-primary p-4">
            <Row gutter={[24, 0]} className="align-items-center mb-3">
              <Col span={8}>
                <label>Name Service:</label>
              </Col>
              <Col span={16}>
                <Input placeholder="Granding" className="ant-furmulla-input" />
              </Col>
            </Row>
            <Row gutter={[24, 0]} className="align-items-center">
              <Col span={8}>
                <label>Total Charge:</label>
              </Col>
              <Col span={16}>
                <Input
                  placeholder="{Total Charge}"
                  className="ant-furmulla-input"
                />
              </Col>
            </Row>
          </div>
          <span className="ant-cricle-add" onClick={handleNewElement}>
            {treeIcon}
          </span>
        </div>
        <Row gutter={[24, 0]} className="pt-4 tree-line-furmulla">
          {elementList.map((element, index) => {
            return (
              <ElementCard
                element={element}
                handleChange={handleChange}
                key={index}
                idx={index}
              />
            );
          })}
        </Row>

        <div className="">
          <table className="table ant-furmulla-table table-hover">
            <thead>
              <tr>
                <th colSpan="4">Line Items Needed</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <MaterialCard
                  key={index}
                  material={material}
                  handleChange={handleMaterialChange}
                  index={index}
                  elementList={elementList}
                />
              ))}
            </tbody>
          </table>
        </div>
        <span
          className="ant-add-material mb-3 d-inline-block"
          onClick={handleAddMaterial}
        >
          Add New Material: {treeIcon}
        </span>
      </Card>
    </>
  );
}

export default FormulaV2;
