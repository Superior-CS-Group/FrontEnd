/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
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
} from "antd";
import {
  PlusCircleOutlined,
  SaveOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
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
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default function AddEstimates(props) {
  const [variation, setVariation] = useState([]);
  const [formulas, setFormulas] = React.useState([]);
  const [selectedFormulas, setSelectedFormulas] = React.useState([]);
  const [estimationId, setEstimationId] = React.useState(null);
  const [isSearchingFormula, setIsSearchingFormula] = React.useState(false);
  const [view, setView] = React.useState("client");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [selectIndex, setSelectIndex] = React.useState(null);
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
      dataIndex: "address",
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

  const mdata = [
    { title: "Bulit In Design Cost", cost: "$0", pricebtn: "danger-text" },
    { title: "Fluff Number Discount?", cost: "0.00%", pricebtn: "gray-text" },
    { title: "Discount Amount", cost: "$0.00", pricebtn: "danger-text" },
    {
      title: "Total Without Discount",
      cost: "$24.551.14",
      pricebtn: "warring-text",
    },
  ];
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

  const payment = [
    {
      title: "Deposit payment at signing of contract",
      cost: (
        <>
          <span className="per-input">
            <Input
              type="number"
              maxLength="2"
              placeholder="12"
              className="ant-width-small font-bold radius-4 gray-text"
              defaultValue=""
            />
            %
          </span>
        </>
      ),
    },
    {
      title: "Progress payment when project is started",
      cost: (
        <>
          <span className="per-input">
            <Input
              type="number"
              min={1}
              max={2}
              placeholder="88"
              className="ant-width-small font-bold radius-4 gray-text"
              defaultValue=""
            />
            %{" "}
          </span>
        </>
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
    console.log(
      "newSelectedFormula",
      newSelectedFormula[index].elements[subIndex],
      index,
      subIndex,
      e
    );
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
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  function processFormula(
    formula,
    materials,
    elements,
    multiplicationFactor,
    name
  ) {
    if (name === "Days w/ 5 guys") {
      console.log("labour: ", formula);
    }
    if (materials) {
      const usedMaterials = materials.map((item) => {
        return {
          title: `@{{catalog||${item._id}||${item.name}}}`,
          price: item.price,
        };
      });

      usedMaterials.forEach((material) => {
        const regex = new RegExp(escapeRegExp(material.title), "g");
        formula = formula.replace(regex, material.price);
      });
    }
    if (name === "Days w/ 5 guys") {
      console.log("labour1: ", formula);
    }
    if (elements) {
      const usedElements = elements.map((element) => {
        return {
          title: `@{{element||${element._id}||${element.name}}}`,
          price: `${element.value} * ${
            element.multiplicationFactor === undefined ||
            element.multiplicationFactor === null
              ? 1
              : element.multiplicationFactor
          }`,
          usedMaterials: element.formula,
        };
      });
      usedElements.forEach((element) => {
        const regex = new RegExp(escapeRegExp(element.title), "g");
        try {
          formula = formula.replace(regex, element.price);
        } catch (error) {
          console.log("regex; ", regex);
          console.log("formula; ", formula);
          console.log("error: ", error);
        }
      });
    }
    if (name === "Days w/ 5 guys") {
      console.log("labour2: ", formula);
    }
    try {
      multiplicationFactor =
        multiplicationFactor === undefined || multiplicationFactor === null
          ? 1
          : multiplicationFactor;

      if (formula.match(/@\{\{[^\}]+\}\}/gi) && materials.length) {
        formula = processFormula(formula, materials);
      }
      if (name === "Days w/ 5 guys") {
        console.log("labour3: ", formula);
      }
      const result =
        Number(eval(formula).toFixed(2)) * Number(multiplicationFactor);
      if (name === "Days w/ 5 guys") {
        console.log("labor3", formula);
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
        formula.catalogs || [],
        elements,
        undefined,
        material.name
      );

      let cost =
        quantity *
        processFormula(material.cost || "", formula.catalogs || [], elements);
      let charge = processFormula(
        material.charge.replace("{Cost}", cost) || "",
        formula.catalog || [],
        elements
      );

      processClientContract(formula, material.formula, elements);
      totalMaterialsCost += cost;
      totalMaterialsCharge += charge;
      return { ...material, cost, charge, quantity };
    });
    formula.totalMaterialsCost = totalMaterialsCost;
    formula.totalProjectCharge = totalMaterialsCharge;
    const profitPercent = (
      Number((totalMaterialsCharge / totalMaterialsCost) * 100) - 100
    ).toFixed(2);
    console.log("profitPercent", profitPercent, `${profitPercent}%`);
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
    const body = { services: selectedFormulas, userId: props.custInfo.id };
    if (estimationId) {
      const updated = await updateUserEstimation(estimationId, body);
    } else {
      const response = await createUserEstimation(body);
      if (response.remote === "success") {
        setEstimationId(response.data.userEstimation._id);
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
          price: (
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
            {isSearchingFormula ? (
              <div>
                <Input
                  className="radius-30 me-2"
                  onChange={(e) => handleFormulaSearch(e.target.value)}
                  suffix={[
                    <span
                      onClick={() => setIsSearchingFormula(false)}
                      style={{ marginTop: "-5px" }}
                    >
                      <CloseCircleOutlined />
                    </span>,
                  ]}
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
            ) : (
              <Button
                type="primary"
                className="radius-30 ant-primary-btn font-15 ps-2"
                size="large"
                onClick={() => setIsSearchingFormula(true)}
              >
                <PlusCircleOutlined style={{ fontSize: "24px" }} />
                Add Service
              </Button>
            )}
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
                          ${formula.totalProjectCharge || 0}{" "}
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
                                <span>{element.name}</span>

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
                                      value={element.selected?._id}
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
                                      name="value"
                                      value={element.value}
                                      type="number"
                                    />
                                  ) : element.name === "Total Cost" ? (
                                    <Input
                                      name="value"
                                      value={formula.totalMaterialsCost}
                                      disabled
                                    />
                                  ) : element.name === "Gross Profit" ? (
                                    <Input
                                      name="value"
                                      value={formula.grossProfit}
                                      disabled
                                    />
                                  ) : (
                                    <h4>
                                      {processFormula(
                                        element.value,
                                        element.formula || [],
                                        formula.elements,
                                        element.multiplicationFactor,
                                        element.name
                                      )}
                                    </h4>
                                  )}
                                  {/* <EditOutlined /> */}
                                </div>
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
            <EstimationOverview selectedFormulas={selectedFormulas} />

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
                <List
                  bordered={false}
                  dataSource={mdata}
                  size="small"
                  renderItem={(item) => (
                    <List.Item
                      className="border-0 font-d"
                      extra={[
                        <Input
                          placeholder="Basic usage"
                          className={`ant-width font-bold radius-4 ${item.pricebtn}`}
                          defaultValue={item.cost}
                        />,
                      ]}
                    >
                      {item.title}
                    </List.Item>
                  )}
                />
                <div className="addbtn-ant ps-3 py-3">
                  <a href="#" className="d-inline-flex align-items-center">
                    <PlusCircleOutlined className="me-2" />
                    Add new field
                  </a>
                </div>
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
                <List
                  className="mb-3"
                  bordered={false}
                  dataSource={payment}
                  size="small"
                  renderItem={(item) => (
                    <List.Item className="border-0 font-d" extra={[item.cost]}>
                      {item.title}
                    </List.Item>
                  )}
                >
                  {variation.map((variation, index) => {
                    return (
                      <React.Fragment key={index}>
                        <List.Item
                          className="border-0 font-d position-relative"
                          extra={[
                            <>
                              <Input
                                style={{ width: "40px" }}
                                type="number"
                                maxLength="2"
                                placeholder=""
                                className="ant-width-small font-bold radius-4 gray-text"
                                defaultValue=""
                              />
                              <span>%</span>{" "}
                              <DeleteOutlined className="delete-icon" />
                            </>,
                          ]}
                        >
                          <Input placeholder="" style={{ width: "88%" }} />
                        </List.Item>
                      </React.Fragment>
                    );
                  })}
                </List>
                <div className="addbtn-ant ps-3 py-3">
                  <a
                    href="#"
                    className="d-inline-flex align-items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setVariation([
                        ...variation,
                        { title: "title", value: "" },
                      ]);
                    }}
                  >
                    <PlusCircleOutlined className="me-2" />
                    Add new field
                  </a>
                </div>
                <span>
                  <b>Note:</b>{" "}
                  <i>Payment terms will change if change orders are made</i>
                </span>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
      <div className="ant-floating">
        <Button type="primary" onClick={handleSaveEstimations}>
          <SaveOutlined />
        </Button>
      </div>
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
