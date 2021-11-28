/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
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
} from "antd";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  PlusCircleOutlined,
  SaveOutlined,
  EditOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { drag, ellps, eye } from "../../utils/svg.file";
import { Link } from "react-router-dom";
import { searchFormulaByName } from "../../api/formula";
import EstimationOverview from "./estimation/estimationOverview.component";
import { getVariationsByCatalogId } from "../../api/catalogue";
import DeleteModal from "../modal/deleteModal.component";
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

  const [isSearchingFormula, setIsSearchingFormula] = React.useState(false);
  const [view, setView] = React.useState("client");

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
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  async function handleFormulaSearch(value) {
    const newFormula = await searchFormulaByName(value);
    setFormulas(newFormula.data.data);
  }
  async function handleSelectFormula(formula) {
    const elements = formula.elements;
    const newElements = [];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type === "dropdown") {
        newElements.push({
          ...elements[i],
          options: await processDropdown(elements[i].dropdown),
        });
      } else {
        newElements.push(elements[i]);
      }
    }
    formula.elements = newElements;
    console.log("formula: ", formula);
    setSelectedFormulas([formula, ...selectedFormulas]);
  }
  function handleEditField(e, index, subField, subIndex) {
    const newSelectedFormulas = [...selectedFormulas];
    newSelectedFormulas[index][subField][subIndex][e.target.name] =
      e.target.value;
    setSelectedFormulas(newSelectedFormulas);
  }

  function handleEditDropdownField(e, index) {
    console.log({ e, index });
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  function processFormula(formula, materials, elements) {
    console.log("formula: ", { formula, materials, elements });
    if (materials) {
      const usedMaterials = materials.map((item) => {
        return {
          title: `@{{catalog||${item._id}||${item.title}}}`,
          price: item.price,
        };
      });
      usedMaterials.forEach((material) => {
        const regex = new RegExp(escapeRegExp(material.title), "g");
        formula = formula.replace(regex, material.price);
      });
    }

    if (elements) {
      const usedElements = elements.map((element) => {
        return {
          title: `@{{element||${element._id}||${element.name}}}`,
          price: element.value,
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
    try {
      const result = Number(eval(formula).toFixed(2));
      return result;
    } catch (error) {
      console.log("error: ", error);
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
        material.formula,
        elements
      );
      let cost =
        quantity *
        processFormula(material.cost || "", material.formula, elements);
      let charge = processFormula(
        material.charge.replace("{Cost}", cost) || "",
        material.formula,
        elements
      );

      totalMaterialsCost += cost;
      totalMaterialsCharge += charge;
      console.log(material, "material");
      return { ...material, cost, charge, quantity };
    });
    formula.totalMaterialsCost = totalMaterialsCost;
    formula.totalProjectCharge = totalMaterialsCharge;
    const profitPercent = Number(
      (
        (totalMaterialsCharge - totalMaterialsCost) /
        totalMaterialsCost
      ).toFixed(2)
    );
    formula.grossProfit = `${profitPercent * 100}%`;
    return materials;
  }

  async function processDropdown(id) {
    const elements = await getVariationsByCatalogId(id);
    console.log(elements);
    if (elements.remote === "success") {
      return elements.data.data;
    } else {
      return [];
    }
  }
  const genExtra = () => (
    <CloseCircleFilled
      // onClick={(event) => {
      //   event.stopPropagation();
      // }}
      onClick={DeleteModal}
    />
  );
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
                <div className="sagision">
                  <ul>
                    {formulas.map((formula) => (
                      <li onClick={() => handleSelectFormula(formula)}>
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
                pathname: `/contract-preview/${props.custInfo.id}`,
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
                          <span className="closeicon-panel">{genExtra()}</span>
                        </>,
                      ]}
                    >
                      <Row gutter={[24, 0]}>
                        {formula.elements
                          .filter((elem) => elem.view.includes(view))
                          .map((element, idx) => {
                            if (element.type === "dropdown") {
                              processDropdown(element.dropdown, element);
                            }
                            console.log("elelfdsakjlkds: ", element);
                            return (
                              <Col lg={6} span={24} key={idx}>
                                <Card
                                  bordered={false}
                                  className={`radius-12 mb-3  count-card ${
                                    element.automatic ? "blue-card" : ""
                                  }`}
                                  bodyStyle={{ padding: "16px" }}
                                >
                                  <div className="text-end drgicon">
                                    <span className="me-1">{drag}</span>{" "}
                                    <span>{ellps}</span>
                                  </div>
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
                                          handleEditDropdownField(value, idx)
                                        }
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
                                          null,
                                          formula.elements
                                        )}
                                      </h4>
                                    )}
                                    <EditOutlined />
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
                      <>
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
                      </>
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
        <Button type="primary">
          <SaveOutlined />
        </Button>
      </div>
    </>
  );
}
