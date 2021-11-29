import { Card, Col, Input, Row } from "antd";
import React from "react";
import { treeIcon } from "../../../utils/svg.file";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import ElementCard from "./elementCard/elementCard.compnent";
import MaterialCard from "./materialCard/materialCard.component";
import ReactMentionInput from "../../../utils/mentionInput/mentionInput";
import { useLocation, Navigate } from "react-router-dom";
import { getFormulaById, updateFormula } from "../../../api/formula";

/**
 * @author digimonk Technologies
 * @developer Saral Shrivastava
 * @version 2.0.0
 */
function FormulaV2() {
  const [formulaDetails, setFormulaDetails] = React.useState({});
  const [title, setTitle] = React.useState("");
  const [elementList, setElementList] = React.useState([]);

  const [markupId, setMarkupId] = React.useState(null);
  const [materials, setMaterials] = React.useState([]);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [clientContract, setClientContract] = React.useState("");
  const [redirect, setRedirect] = React.useState(null);

  const params = useLocation();
  React.useEffect(() => {
    const searchQuery = params.search.trim();
    const query = new URLSearchParams(searchQuery);
    const formulaId = query.get("formulaId");
    if (!formulaId) {
      setRedirect("/services");
    } else {
      console.log("formulaId: ", formulaId);
      getFormulaDetails(formulaId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  async function getFormulaDetails(formulaId) {
    const formulaDetails = await getFormulaById(formulaId);
    console.log("formulaDetails: ", formulaDetails);
    if (formulaDetails.remote === "success") {
      setFormulaDetails(formulaDetails.data.data);
      setTitle(formulaDetails.data.data.title);
      setClientContract(formulaDetails.data.data.clientContract);
      setMarkupId(
        formulaDetails.data.data.elements.find(
          (element) => element.name === "Markup"
        )._id
      );
    }
  }
  /**
   * @description This useEffect will be called whenever `isUpdate` change to save data in db
   */
  React.useEffect(() => {
    if (isUpdated) {
      const body = {
        elements: elementList,
        materials: materials,
        clientContract: clientContract,
        title: title,
      };
      setTimeout(() => updateFormulaDetails(body), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  async function updateFormulaDetails(data) {
    const updatedFormulaDetails = await updateFormula(formulaDetails._id, data);
    console.log(updatedFormulaDetails, "updated details");
    if (updatedFormulaDetails.remote === "success") {
      setFormulaDetails(updatedFormulaDetails.data.data);
    }
  }

  React.useEffect(() => {
    if (Object.keys(formulaDetails).length) {
      setElementList([...formulaDetails.elements]);
      setMaterials([...formulaDetails.materials]);
    }
  }, [formulaDetails]);

  const handleChange = (value, name, index, newMaterial) => {
    const newElementList = [...elementList];
    newElementList[index][name] = value;
    if (newMaterial) {
      const processed = processMaterial(newMaterial);
      newElementList[index].formula = [
        ...new Set([...(newElementList[index].formula || []), ...processed]),
      ];
    }
    setElementList([...newElementList]);
  };
  const handleNewElement = () => {
    console.log("estimationList: ", elementList);
    const newElement = {
      name: "",
      type: "manual",
      unit: "",
      value: "",
      view: "client",
    };
    console.log("newElement: ", [newElement, ...elementList]);
    setElementList([newElement, ...elementList]);
    setIsUpdated("Update");
  };

  const processMaterial = (text) => {
    // eslint-disable-next-line no-useless-escape
    const tags = text.match(/@\{\{[^\}]+\}\}/gi) || [];
    const allMaterialsIds = tags.map((myTag) => {
      const tagData = myTag.slice(3, -2);
      const tagDataArray = tagData.split("||");
      if (tagDataArray[0] === "catalog") {
        return tagDataArray[1];
      }
      return null;
    });
    return allMaterialsIds.filter((elem) => elem);
  };

  const handleMaterialChange = (e, index, material) => {
    const newMaterials = [...materials];

    newMaterials[index][e.target.name] = e.target.value;
    if (!e.target.manual) {
      newMaterials[index].charge = `{Cost} * @{{element||${markupId}||Markup}}`;
    } else {
      newMaterials[index].manual = true;
    }
    if (material) {
      let processed = processMaterial(material);
      console.log("rpoc: ", processed);
      newMaterials[index].formula = [
        ...new Set([...(newMaterials[index].formula || []), ...processed]),
      ];
    }
    // }
    setMaterials([...newMaterials]);
  };

  const onFocusOut = () => {
    setIsUpdated(!isUpdated);
  };

  const handleAddMaterial = () => {
    const newMaterial = {
      name: "",
      quantity: "",
      cost: "",
      charge: "",
      formula: [],
    };
    setMaterials([...materials, newMaterial]);
  };

  const handleRemoveElement = (index) => {
    const newElementList = [...elementList];
    newElementList.splice(index, 1);
    setElementList([...newElementList]);
    setIsUpdated("Update");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

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
                <Input
                  placeholder="Title"
                  className="ant-furmulla-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={onFocusOut}
                />
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
          {elementList.length &&
            elementList.map((element, index) => {
              return (
                <ElementCard
                  element={element}
                  handleChange={handleChange}
                  key={index}
                  idx={index}
                  elementList={elementList}
                  onFocusOut={onFocusOut}
                  handleRemoveElement={handleRemoveElement}
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
                  onFocusOut={onFocusOut}
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

        <div className="">
          <table className="table ant-furmulla-table">
            <thead>
              <tr>
                <th>Enter Wording - Client Contract</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-0">
                  <div className="border p-3 radius-4 line-height-40 min-height">
                    <ReactMentionInput
                      className="ant-furmulla-input px-2 outline height-150"
                      elementList={elementList.map((element) => ({
                        display: element.name,
                        id: element._id,
                      }))}
                      onChange={(e) => {
                        setClientContract(e.target.value);
                      }}
                      placeholder="Enter Client Contract use '{E' for the dynamic values"
                      value={clientContract}
                      onBlur={onFocusOut}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

export default FormulaV2;
