/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
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
  InfoCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { arrowdown, arrowup, drag, ellps, eye } from "../../utils/svg.file";
import { Link } from "react-router-dom";
import { searchFormulaByName } from "../../api/formula";
import EstimationOverview from "./estimation/estimationOverview.component";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const { Meta } = Card;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default function AddEstimates(props) {
  console.log(props.custInfo);

  const [formulas, setFormulas] = React.useState([]);
  const [selectedFormulas, setSelectedFormulas] = React.useState([]);

  const [isSearchingFormula, setIsSearchingFormula] = React.useState(false);

  const box = [
    {
      title: "Hours",
      rate: <h4>16</h4>,
      editIcon: <EditOutlined />,
      columbtn: "count-card",
    },
    {
      title: "Tons Of Fill Dirt",
      rate: <h4>10</h4>,
      editIcon: <EditOutlined />,
      columbtn: "count-card",
    },
    {
      title: "Yards Of Topsoil",
      rate: <h4>5</h4>,
      editIcon: <EditOutlined />,
      columbtn: "count-card",
    },

    {
      title: "Haul Off Cost",
      rate: <h4>$1,500.00</h4>,
      editIcon: <EditOutlined />,
      columbtn: "count-card",
    },
    {
      title: (
        <>
          Days with<span className="tree-box">3</span> guys
        </>
      ),
      rate: <h4>0.67</h4>,
      editIcon: <InfoCircleOutlined />,
      columbtn: "blue-card",
    },
    {
      title: "Rental Equipment",
      rate: (
        <div className="d-flex align-items-center justify-content-between ">
          <h4 className="trencher">Trencher</h4>
          <Select
            defaultValue="$150.00"
            style={{ width: "100%" }}
            onChange={handleChange}
            className="ms-2"
            size="small"
          >
            <Option value="rate">$150.00</Option>
            <Option value="ss">$151.00</Option>
          </Select>
        </div>
      ),
      columbtn: "count-card",
    },
    {
      title: "Days Of Rental",
      rate: <h4>2</h4>,
      columbtn: "count-card",
      editIcon: <EditOutlined />,
    },
    {
      title: "Misc Cost",
      rate: <h4>$100.00</h4>,

      editIcon: <EditOutlined />,
      columbtn: "yellow-card",
    },
    {
      title: "Total Cost",
      rate: <h4>$2,871.00</h4>,
      columbtn: "danger-card",
      editIcon: <InfoCircleOutlined />,
    },
    {
      title: "Gross Profit",
      rate: <h4>44.93%</h4>,
      columbtn: "blue-card",
      editIcon: <InfoCircleOutlined />,
    },
    {
      title: "Markup",
      rate: <h4>1.69</h4>,
      columbtn: "count-card",
      editIcon: <EditOutlined />,
      columbtn: "blue-card",
    },
  ];
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
  const data = [
    {
      key: "1",
      name: "Disposal Fee",
      age: 1,
      address: "Each",
      cost: "$1,500.00",
      charge: "$2535.00",
    },
    {
      key: "1",
      name: "Disposal Fee",
      age: 1,
      address: "Each",
      cost: "$1,500.00",
      charge: "$2535.00",
    },
    {
      key: "1",
      name: "Disposal Fee",
      age: 1,
      address: "Each",
      cost: "$1,500.00",
      charge: "$2535.00",
    },
    {
      key: "1",
      name: "Disposal Fee",
      age: 1,
      address: "Each",
      cost: "$1,500.00",
      charge: "$2535.00",
    },
  ];

  const listdata = [
    { title: "Materials Cost", rate: "$5332.00", pricebtn: "danger-text" },
    { title: "Expected Overhead", rate: "$0.00", pricebtn: "danger-text" },
    { title: "Subcontractor Cost", rate: "$0.00", pricebtn: "danger-text" },
    { title: "Gross Profit", rate: "$12,124.98", pricebtn: "warring-text" },
    { title: "Gross Profit %", rate: "49.39%", pricebtn: "warring-text" },
    { title: "Net Profit", rate: "$12,124.98", pricebtn: "warring-text" },
    { title: "Man Hours", rate: "172", pricebtn: "blue-text" },
    { title: "Days w/5 guys", rate: "4.3", pricebtn: "blue-text" },
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
        <Input
          type="number"
          maxLength="2"
          placeholder="Basic usage"
          className="ant-width-small font-bold radius-4 gray-text"
          defaultValue="12"
          suffix="%"
        />
      ),
    },
    {
      title: "Progress payment when project is started",
      cost: (
        <Input
          type="number"
          min={1}
          max={2}
          placeholder="Basic usage"
          className="ant-width-small font-bold radius-4 gray-text"
          defaultValue="99"
          suffix="%"
        />
      ),
    },
    {
      title: "Completion payment",
      cost: (
        <Input
          type="number"
          maxLength="2"
          placeholder="Basic usage"
          className="ant-width-small font-bold radius-4 gray-text"
          defaultValue="89"
          suffix="%"
        />
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
  function handleSelectFormula(formula) {
    setSelectedFormulas([formula, ...selectedFormulas]);
  }
  function handleEditField(e, index, subField, subIndex) {
    const newSelectedFormulas = [...selectedFormulas];
    newSelectedFormulas[index][subField][subIndex][e.target.name] =
      e.target.value;
    setSelectedFormulas(newSelectedFormulas);
  }

  function findElementWithName(elements, name) {
    return elements.find((element) => element.name === name);
  }

  function processMaterials(formula) {
    const elements = [...formula.elements];
    let totalMaterialsCost = 0;
    let totalMaterialsCharge = 0;
    const materials = [...formula.materials].map((material) => {
      console.log("material", material);
      let cost = material.cost;
      let charge = material.charge;
      let quantity = findElementWithName(formula.elements, material.quantity);
      try {
        cost = "{Quantity} * " + cost;
        cost = cost.replace("{Quantity}", quantity.value);

        const usedMaterials = material.formula.map((item) => {
          return {
            title: `@{{catalog||${item._id}||${item.title}}}`,
            price: item.price,
          };
        });
        const usedElements = elements.map((element) => {
          return {
            title: `@{{element||${element._id}||${element.name}}}`,
            price: element.value,
          };
        });
        usedMaterials.map((material) => {
          cost = cost.replace(material.title, material.price);
          return cost;
        });
        usedElements.map((element) => {
          cost = cost.replace(element.title, element.price);
          charge = charge.replace(element.title, Number(element.price) / 100);
          return cost;
        });
        cost = Number(eval(cost).toFixed(2));
        charge = charge.replace("{Cost}", cost);
        charge = Number((eval(charge) + cost).toFixed(2));
        console.log("charege: ", typeof charge, typeof cost);
      } catch (error) {
        cost = 0;
        charge = 0;
      }
      totalMaterialsCost += cost;
      totalMaterialsCharge += charge;
      return { ...material, cost, charge, quantity: quantity.value || 0 };
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
                  className="radius-4 me-2"
                  onChange={(e) => handleFormulaSearch(e.target.value)}
                  suffix={[
                    <span onClick={() => setIsSearchingFormula(false)}>
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
                  <a href="#">Client</a>
                </li>
                <li>
                  <a className="active">Admin</a>
                </li>
                <li>
                  <a>Full</a>
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
                defaultActiveKey={["1", "2"]}
                onChange={callback}
                expandIconPosition="right"
              >
                {selectedFormulas.map((formula, index) => {
                  return (
                    <Panel
                      header={formula.title}
                      key={index}
                      extra={[
                        <>
                          ${formula.totalProjectCharge || 0}{" "}
                          <span className="closeicon-panel">
                            <CloseCircleFilled />
                          </span>
                        </>,
                      ]}
                    >
                      <Row gutter={[24, 0]}>
                        {formula.elements.map((element, idx) => {
                          return (
                            <Col lg={6} span={24} key={idx}>
                              <Card
                                bordered={false}
                                className={`radius-12 mb-3  count-card`}
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
                                    <h4>{element.value}</h4>
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
                />
                {/* <div className="p-3">
                  <Row>
                    <Col md={20}>
                      <Input placeholder="" />
                    </Col>
                    <Col md={4}>
                      <Input
                        type="number"
                        maxLength="2"
                        placeholder="Basic usage"
                        className="ant-width-small font-bold radius-4 gray-text"
                        defaultValue="89"
                        suffix="%"
                      />
                    </Col>
                  </Row>
                </div> */}
                <div className="addbtn-ant ps-3 py-3">
                  <a href="#" className="d-inline-flex align-items-center">
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
