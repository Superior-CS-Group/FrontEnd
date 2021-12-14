/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Collapse,
  Input,
  Table,
  List,
  Select,
  DatePicker,
  Form,
  Modal,
  message,
} from "antd";
import { CloseCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { eye } from "../../utils/svg.file";
import { Link } from "react-router-dom";
import {
  createUserEstimation,
  searchFormulaByName,
  updateUserEstimation,
  getUserEstimationDetailsById,
} from "../../api/formula";
import EstimationOverview from "./estimation/estimationOverview.component";
import { getVariationsByCatalogId } from "../../api/catalogue";
import EstimateSettings from "./estimateSettings/estimateSettings.component";
import PaymentTerms from "./paymentTerms/paymentTerms.component";
import { currencyFormate } from "../../utils/currencyFormate";
import regex from "../../utils/regex";
import {
  processConditionalExpression,
  processElements,
  processFormulaMaterials,
  processHiddenValuesWithMaterials,
  processNonConditionalHiddenValues,
} from "../../utils/formula/formula";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default function AddEstimates(props) {
  const [formulas, setFormulas] = React.useState([]);
  const [selectedFormulas, setSelectedFormulas] = React.useState([]);
  const [estimationId, setEstimationId] = React.useState(null);
  const [view, setView] = React.useState("client");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [selectIndex, setSelectIndex] = React.useState(null);
  const [totalPorjectCharge, setTotalProjectCharge] = React.useState(0);
  const [totalPorjectChargeAfterDiscount, setTotalProjectChargeAfterDiscount] =
    React.useState(0);
  const [estimationSettings, setEstimationSettings] = React.useState({});
  const [paymentTerms, setPaymentTerms] = React.useState([]);
  const [isValidPaymentTerms, setIsValidPaymentTerms] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const columns = [
    {
      title: "Materials needed:",
      dataIndex: "name",
    },
    {
      title: "QTY",
      dataIndex: "quantity",
    },
    {
      title: "Units",
      dataIndex: "unitToShow",
    },
    {
      title: "Cost (total)",
      dataIndex: "cost",
    },
    {
      title: "Charge",
      dataIndex: "charge",
    },
  ];

  const [isSaved, setIsSaved] = React.useState(false);
  const success = (content) => {
    const key = "updatable";
    message.loading({ content: content, key });
    // Dismiss manually and asynchronously
    if (isSaved) {
      setIsSaved(false);
      message.success({ content: "Saved", key, duration: 2 });
    }
  };

  React.useEffect(() => {
    let percentage = 100;
    paymentTerms.forEach((item) => {
      percentage -= Number(item.value);
    });
    setIsValidPaymentTerms(percentage === 0);
  }, [paymentTerms]);

  const onFocusOut = () => {
    setIsUpdate(!isUpdate);
  };

  const markup = [
    {
      title: "Can you fit ditch witch/skid",
      cost: (
        <Select
          bordered={false}
          className="ant-width font-bold radius-4 bg-select-transfer"
          defaultValue="Yes"
          onChange={handleChange}
        >
          <Option value="yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      ),
    },
    {
      title: "Can you fit ditch witch/skid",
      cost: (
        <Select
          bordered={false}
          className="ant-width font-bold radius-4 bg-select-transfer"
          defaultValue="Yes"
          onChange={handleChange}
        >
          <Option value="yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      ),
    },
    {
      title: "Can you fit ditch witch/skid",
      cost: (
        <Select
          bordered={false}
          className="ant-width font-bold radius-4 bg-select-transfer"
          defaultValue="Yes"
          onChange={handleChange}
        >
          <Option value="yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      ),
    },
    {
      title: "How Far is the Job?",
      cost: (
        <Input
          placeholder="Basic usage"
          className="ant-width font-bold radius-4 gray-text"
          defaultValue="0 hs"
        />
      ),
    },
    {
      title: "Hoy picky is the Client?",
      cost: (
        <Input
          placeholder="Basic usage"
          className="ant-width font-bold radius-4 gray-text"
          defaultValue="1-10"
        />
      ),
    },
  ];

  React.useEffect(() => {
    fetchPrevFormula();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchPrevFormula() {
    const fetched = await getUserEstimationDetailsById(props.estimationId);
    if (fetched.remote === "success" && fetched.data.data) {
      setSelectedFormulas(fetched.data.data.services);
      setEstimationId(fetched.data.data._id);
      setEstimationSettings(fetched.data.data.estimateSettings);
      setPaymentTerms(fetched.data.data.paymentTerms);
    }
  }
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  async function handleFormulaSearch(value) {
    const newFormula = await searchFormulaByName(value);
    setFormulas(newFormula.data.data);
  }
  async function handleSelectFormula(formula) {
    formula = {
      ...formula,
      elements: formula.elements?.map((element) => ({ ...element })) || [],
      materials: formula.materials?.map((material) => ({ ...material })) || [],
    };

    const formulaElements = formula.elements;
    const newElements = [];
    for (let i = 0; i < formulaElements.length; i++) {
      if (formulaElements[i].type === "dropdown") {
        const options = await processDropdown(formulaElements[i].dropdown);
        newElements.push({
          ...formulaElements[i],
          options,
        });
      } else {
        newElements.push(formulaElements[i]);
      }
    }

    formula.elements = newElements;
    setSelectedFormulas([formula, ...selectedFormulas]);
    setFormulas([]);
  }
  function handleEditField(e, index, subField, subIndex) {
    const newSelectedFormulas = [...selectedFormulas];
    newSelectedFormulas[index][subField][subIndex][e.target.name] =
      e.target.value;
    setSelectedFormulas(newSelectedFormulas);
  }

  function handleEditDropdownField(e, index, subIndex) {
    const newSelectedFormula = [...selectedFormulas];

    const selectedOption = newSelectedFormula[index].elements[
      subIndex
    ].options.find((el) => el._id === e);
    newSelectedFormula[index].elements[subIndex].selected = selectedOption;
    newSelectedFormula[index].elements[subIndex].value = selectedOption.price;
    setSelectedFormulas(newSelectedFormula);
  }

  function handleOptionElement(value, index, subIndex, id) {
    const newSelectedFormula = [...selectedFormulas];
    const optionalElement = newSelectedFormula[index].elements.find(
      (elem) => elem._id === id
    );
    optionalElement.multiplicationFactor = value;
    // newSelectedFormula[index].elements[subIndex] = optionalElement;
    setSelectedFormulas(newSelectedFormula);
  }

  function escapeRegExp(string) {
    return string.replace(regex.escapeRegex, "\\$&"); // $& means the whole matched string
  }
  function processFormula(
    formula,
    materials,
    elements,
    hiddenValues,
    multiplicationFactor,
    currentElement
  ) {
    if (hiddenValues) {
      let processedHiddenValues = hiddenValues.map((hiddenValue) => {
        if (hiddenValue.isConditional && !hiddenValue.expression.tempValue) {
          hiddenValue.expression.tempValue = processElements(
            hiddenValue.expression.condition,
            elements
          );
        }
        return processConditionalExpression(hiddenValue);
      });
      processedHiddenValues = processedHiddenValues.map((hiddenValue) => {
        return processNonConditionalHiddenValues(
          hiddenValue,
          processedHiddenValues
        );
      });
      console.log("processedHiddenValues", processedHiddenValues);
      formula = processHiddenValuesWithMaterials(
        formula,
        processedHiddenValues
      );
    }
    console.log("hiddenFormula; ", formula);
    if (materials) {
      formula = processFormulaMaterials(formula, materials);
    }

    if (elements) {
      formula = processElements(formula, elements);
    }

    // if (formula.match(regex.materialInput)) {
    //   //   // formula;
    //   formula = processFormulaMaterials(formula, materials);
    //   formula = processElements(formula, elements);
    // }

    console.log("formula: ", formula);

    try {
      multiplicationFactor =
        multiplicationFactor === undefined || multiplicationFactor === null
          ? 1
          : multiplicationFactor;
      // if (formula.match(regex.materialInput)) {
      // formula = processFormula(formula, materials, elements, hiddenValues);
      // console.log("formulaMatch: ", formula);
      // }

      const result =
        Number(eval(formula).toFixed(2)) * Number(multiplicationFactor);
      if (currentElement) {
        currentElement.finalCalculatedValue = result;
      }
      return result;
    } catch (error) {
      return 0;
    }
  }

  function processMaterials(formula) {
    const elements = [...formula.elements];
    let totalMaterialsCost = 0;
    let totalMaterialsCharge = 0;
    const materials = [...formula.materials].map((material) => {
      let quantity = processFormula(
        material.quantity || "",
        [
          ...(formula.catalog || []),
          ...material.formula,
          ...(formula.catalogs || []),
        ],
        elements,
        formula.hiddenValues || []
      );
      const materialCost = material.cost?.replace(/\{Quantity\}/g, quantity);
      // console.log("formula.catalog: ", formula.catalogs, formula);
      let cost = processFormula(
        materialCost || "",
        [
          ...(formula.catalog || []),
          ...material.formula,
          ...(formula.catalogs || []),
        ],
        elements,
        formula.hiddenValues || []
      );
      let materialCharge = material.charge?.replace(/\{Quantity\}/g, quantity);
      materialCharge = materialCharge?.replace(/\{Cost\}/, cost);
      let charge = processFormula(
        materialCharge,
        [
          ...(formula.catalog || []),
          ...material.formula,
          ...(formula.catalogs || []),
        ],
        elements,
        formula.hiddenValues || []
      );
      material.quantityValue = quantity;
      material.costValue = cost;
      material.chargeValue = charge;
      material.unitToShow = material.unit?.name;
      processClientContract(
        formula,
        [...(formula.catalog || []), ...material.formula],
        elements
      );
      totalMaterialsCost += cost;
      totalMaterialsCharge += charge;
      cost = currencyFormate.format(cost);
      charge = currencyFormate.format(charge);
      return { ...material, cost, charge, quantity };
    });
    formula.totalMaterialsCost = totalMaterialsCost;
    formula.totalProjectCharge = totalMaterialsCharge;
    let profitPercent = (
      (1 - Number(totalMaterialsCost / totalMaterialsCharge)) *
      100
    ).toFixed(2);
    profitPercent = isNaN(profitPercent) ? 0 : profitPercent;
    formula.grossProfit = `${profitPercent}%`;
    return materials;
  }

  async function processDropdown(id) {
    const elements = await getVariationsByCatalogId(id);
    if (elements.remote === "success") {
      return elements.data.data;
    } else {
      return [];
    }
  }

  async function handleSaveEstimations() {
    const body = {
      services: selectedFormulas,
      userId: props.custInfo.id,
      estimateSettings: estimationSettings,
      paymentTerms,
    };
    success("Saving...");
    if (estimationId) {
      await updateUserEstimation(estimationId, body);
      setIsSaved(true);
    } else {
      const response = await createUserEstimation(body);
      if (response.remote === "success") {
        setEstimationId(response.data.userEstimation._id);
        setPaymentTerms(response.data.userEstimation.paymentTerms);
      }
    }
  }

  const genExtra = () => (
    <CloseCircleFilled onClick={() => setIsDeleting(true)} />
  );

  const handleRemoveService = () => {
    const newSelectedFormulas = [...selectedFormulas];
    newSelectedFormulas.splice(selectIndex, 1);
    setSelectedFormulas(newSelectedFormulas);
    setSelectIndex(null);
    setIsDeleting(false);
  };

  const processClientContract = (formula, materials, elements) => {
    let newContract = formula.clientContract;
    if (materials) {
      const usedMaterials = materials.map((item) => {
        return {
          title: `@{{catalog||${item._id}||${item.name}}}`,
          price: item.price,
        };
      });
      usedMaterials.forEach((material) => {
        const regex = new RegExp(escapeRegExp(material.title), "g");
        newContract = newContract.replace(regex, material.price);
      });
    }

    if (elements) {
      const usedElements = elements.map((element) => {
        return {
          title: `@{{element||${element._id}||${element.name}}}`,
          price:
            element.finalCalculatedValue !== undefined
              ? (
                  element.finalCalculatedValue *
                  (element.multiplicationFactor === undefined ||
                  element.multiplicationFactor === null
                    ? 1
                    : Number(element.multiplicationFactor))
                ).toString()
              : (
                  Number(element.value) *
                  (element.multiplicationFactor === undefined ||
                  element.multiplicationFactor === null
                    ? 1
                    : Number(element.multiplicationFactor))
                ).toString(),
        };
      });

      usedElements.forEach((element) => {
        const regex = new RegExp(escapeRegExp(element.title), "g");
        try {
          newContract = newContract.replace(regex, element.price);
        } catch (error) {}
      });
    }
    formula.processedClientContract = newContract;
    return newContract;
  };

  React.useEffect(() => {
    if (isUpdate) {
      handleSaveEstimations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const processNameOfElement = (element, elementIndex, formulaIndex) => {
    const name = element.name;
    const splitedName = name.split(" ");
    const newName = splitedName.map((item, index) => {
      if (item.match(regex.customInput)) {
        return (
          <input
            key={index}
            onChange={(e) =>
              handleCustomInputChange(e, element, elementIndex, formulaIndex)
            }
            style={{ width: "25%" }}
            type="number"
            min={0}
            name={item.replace("!", "")}
            value={
              element.customInput.find(
                (inp) => inp.name === item.replace("!", "")
              ).value
            }
            onBlur={onFocusOut}
          />
        );
      } else {
        return ` ${item} `;
      }
    });
    return newName;
  };

  function handleCustomInputChange(e, element, elementIndex, formulaIndex) {
    const customInput = element.customInput.find(
      (item) => item.name === e.target.name
    );
    customInput.value = e.target.value;
    const newSelectedFormula = [...selectedFormulas];
    newSelectedFormula[formulaIndex].elements[elementIndex] = element;
    setSelectedFormulas(newSelectedFormula);
  }

  return (
    <>
      <div className="">
        <Card
          style={{ display: "none" }}
          className="radius-12"
          bordered={false}
          title="Customer Information"
          extra={[
            <>
              <div className="ant-calnder">
                Estimate Issue Date:{" "}
                <DatePicker
                  className="ant-furmulla-input radius-30"
                  onChange={onChange}
                />
              </div>
            </>,
          ]}
        >
          <Form layout="vertical">
            <Row gutter={[24, 0]}>
              <Col lg={8}>
                <Form.Item label="Name" className="ant-floting-input">
                  <Input
                    placeholder=""
                    size="large"
                    className="ant-furmulla-input radius-30"
                    value={props.custInfo.name}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  label="City, State, Zip"
                  className="ant-floting-input"
                >
                  <Input
                    placeholder=""
                    size="large"
                    className="ant-furmulla-input radius-30"
                    value={props.custInfo.address1}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Email" className="ant-floting-input">
                  <Input
                    placeholder=""
                    type="email"
                    size="large"
                    className="ant-furmulla-input radius-30"
                    value={props.custInfo.email}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Adress" className="ant-floting-input">
                  <Input
                    placeholder=""
                    size="large"
                    className="ant-furmulla-input radius-30"
                    value={props.custInfo.address}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="" className="ant-floting-input">
                  <Input
                    placeholder=""
                    size="large"
                    className="ant-furmulla-input radius-30"
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  label=" Link to video"
                  className="ant-floting-input "
                >
                  <Input
                    placeholder=""
                    size="large"
                    className="ant-furmulla-input radius-30"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        {/* <BreadcrumbBar name="Estimates" subname="Add Estimate" /> */}
        <Row className="mt-4 mb-4">
          <Col span="4">
            <div>
              <Input
                className="radius-30 me-2"
                onChange={(e) => handleFormulaSearch(e.target.value)}
                placeholder="Serch Service"
              />
              <div className="sagision radius-12 position-absolute w-100">
                <ul>
                  {formulas.map((formula, idx) => (
                    <li onClick={() => handleSelectFormula(formula, idx)}>
                      {formula.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          <Col span={8} className="text-end pe-5">
            <Link
              to={{
                pathname: `/contract-preview/${props.custInfo.id}?estimationId=${estimationId}`,
                state: {
                  custInfo: props.custInfo.id,
                },
              }}
            >
              <Button
                type="primary"
                className="radius-30 ant-primary-btn font-15 ps-4"
                size="large"
                disabled={!isValidPaymentTerms || !estimationId}
                title={
                  !isValidPaymentTerms &&
                  "Invalid Payment Terms or estiamte is not saved"
                }
              >
                Contract Preview
              </Button>
            </Link>
          </Col>
          <Col span="6" className="d-lg-flex align-items-center ms-auto">
            <div className="ant-tabs-box w-100 me-2">
              <ul>
                <li>
                  <a
                    className={view === "client" ? "active" : ""}
                    onClick={() => setView("client")}
                  >
                    Client
                  </a>
                </li>
                <li>
                  <a
                    className={view === "internal" ? "active" : ""}
                    onClick={() => setView("internal")}
                  >
                    Admin
                  </a>
                </li>
                <li>
                  <a
                    className={view === "full" ? "active" : ""}
                    onClick={() => setView("full")}
                  >
                    Full
                  </a>
                </li>
              </ul>
            </div>
            <span className="ant-eye">{eye}</span>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col lg={16} span={24}>
            <Card
              bordered={false}
              className="estimation-card mb-lg-0 mb-3"
              bodyStyle={{ padding: "0px" }}
            >
              <Collapse
                defaultActiveKey={["1"]}
                onChange={callback}
                expandIconPosition="left"
              >
                {selectedFormulas.map((formula, index) => {
                  return (
                    <Panel
                      header={formula.title}
                      key={index}
                      extra={[
                        <>
                          {currencyFormate.format(formula.totalProjectCharge) ||
                            currencyFormate.format(0)}{" "}
                          <span
                            className="closeicon-panel"
                            onClick={() => {
                              setSelectIndex(index);
                              setIsDeleting(true);
                            }}
                          >
                            {genExtra()}
                          </span>
                        </>,
                      ]}
                    >
                      <Row gutter={[24, 0]}>
                        {formula.elements.map((element, idx) => {
                          return (
                            <Col
                              lg={6}
                              span={24}
                              key={idx}
                              style={{
                                display: element.view?.includes(view)
                                  ? "block"
                                  : "none",
                              }}
                            >
                              <Card
                                bordered={false}
                                className={`radius-12 mb-3  count-card ${
                                  element.automatic ? "blue-card" : ""
                                }`}
                                bodyStyle={{ padding: "16px" }}
                                key={idx}
                              >
                                <div className="text-end drgicon"></div>
                                <span>
                                  {processNameOfElement(element, idx, index)}
                                </span>

                                <div className="d-flex align-items-center justify-content-between">
                                  {element.type === "manual" ||
                                  element.type === "prefilled" ? (
                                    <Input
                                      onChange={(e) => {
                                        handleEditField(
                                          e,
                                          index,
                                          "elements",
                                          idx
                                        );
                                      }}
                                      onBlur={onFocusOut}
                                      name="value"
                                      value={element.value}
                                      type="number"
                                    />
                                  ) : element.type === "dropdown" ? (
                                    <Select
                                      style={{ width: "100%" }}
                                      onChange={(value) =>
                                        handleEditDropdownField(
                                          value,
                                          index,
                                          idx
                                        )
                                      }
                                      value={
                                        element.selected?._id || element.value
                                      }
                                      onBlur={onFocusOut}
                                    >
                                      {element.options?.map((option) => {
                                        return (
                                          <Option
                                            value={option._id}
                                            key={option._id}
                                          >
                                            {option.name}
                                          </Option>
                                        );
                                      })}
                                    </Select>
                                  ) : element.type === "boolean" ? (
                                    <Select
                                      style={{ width: "100%" }}
                                      onChange={(value) =>
                                        handleOptionElement(
                                          value,
                                          index,
                                          idx,
                                          element.value
                                        )
                                      }
                                      onBlur={onFocusOut}
                                    >
                                      <Option value={1}>Yes</Option>
                                      <Option value={0}>No</Option>
                                    </Select>
                                  ) : element.name === "Markup" ? (
                                    <Input
                                      onChange={(e) => {
                                        handleEditField(
                                          e,
                                          index,
                                          "elements",
                                          idx
                                        );
                                      }}
                                      onBlur={onFocusOut}
                                      name="value"
                                      value={element.value}
                                      type="number"
                                    />
                                  ) : element.name === "Total Cost" ? (
                                    <Input
                                      name="value"
                                      value={currencyFormate.format(
                                        formula.totalMaterialsCost || 0
                                      )}
                                      onBlur={onFocusOut}
                                      disabled
                                    />
                                  ) : element.name === "Gross Profit" ? (
                                    <Input
                                      name="value"
                                      value={formula.grossProfit}
                                      onBlur={onFocusOut}
                                      disabled
                                    />
                                  ) : (
                                    <h4>
                                      {processFormula(
                                        element.value,
                                        element.formula || [],
                                        formula.elements,
                                        formula.hiddenValues || [],
                                        element.multiplicationFactor,
                                        element
                                      )}
                                    </h4>
                                  )}
                                  {/* <EditOutlined /> */}
                                </div>
                                <div
                                  className="card-color"
                                  style={{ background: element.color }}
                                />
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>

                      <Card className="radius-12 ant-estimate-table-card">
                        <Table
                          className="add-estimates-table"
                          columns={columns}
                          dataSource={processMaterials(formula)}
                          size="middle"
                          pagination={false}
                        />
                      </Card>
                      <Card
                        title="Client Contract"
                        className="radius-12 ant-estimate-table-card mt-3"
                      >
                        <pre>{formula.processedClientContract}</pre>
                      </Card>
                    </Panel>
                  );
                })}
              </Collapse>
            </Card>
          </Col>
          <Col span={24} lg={8}>
            <EstimationOverview
              selectedFormulas={selectedFormulas}
              setTotalProjectChargeChange={setTotalProjectCharge}
              setTotalProjectChargeAfterDiscountMain={
                setTotalProjectChargeAfterDiscount
              }
              onBlur={onFocusOut}
              estimationSettings={estimationSettings}
            />

            <Collapse
              defaultActiveKey={["1", "2", "3"]}
              onChange={callback}
              expandIconPosition="right"
              bordered={false}
              className="ant-bg-panel"
            >
              <Panel
                header="Estimate Settings"
                key="1"
                className="border-0 ant-bootom-line-effect"
              >
                <EstimateSettings
                  totalCharge={totalPorjectCharge}
                  estimationSettings={estimationSettings}
                  setEstimationSettings={setEstimationSettings}
                  onBlur={onFocusOut}
                />
              </Panel>
              <Panel
                header="Markup Settings"
                key="2"
                className="border-0 ant-bootom-line-effect"
              >
                <List
                  className="mb-3"
                  bordered={false}
                  dataSource={markup}
                  size="small"
                  renderItem={(item) => (
                    <List.Item className="border-0 font-d" extra={[item.cost]}>
                      {item.title}
                    </List.Item>
                  )}
                />
              </Panel>

              <Panel
                header="Payment Terms for Project"
                key="3"
                className="border-0 ant-bootom-line-effect"
              >
                <PaymentTerms
                  totalCharge={totalPorjectChargeAfterDiscount}
                  paymentTerms={paymentTerms}
                  setPaymentTerms={setPaymentTerms}
                  onBlur={onFocusOut}
                  isValid={isValidPaymentTerms}
                />
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
      {/* <div className="ant-floating">
        <Button type="primary" onClick={handleSaveEstimations}>
          <SaveOutlined />
        </Button>
      </div> */}
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={isDeleting}
        footer={null}
        closeIcon={<InfoCircleOutlined />}
      >
        <p>Are you sure you want to delete item ?</p>
        <Row>
          <Col md={12} className="text-center">
            <Button
              type="text"
              onClick={() => {
                setSelectIndex(null);
                setIsDeleting(false);
              }}
            >
              Cancel
            </Button>
          </Col>
          <Col md={12}>
            <Button type="link" onClick={() => handleRemoveService()}>
              Delete
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
