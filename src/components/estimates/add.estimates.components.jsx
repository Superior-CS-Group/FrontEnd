import React, { Component } from "react";
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
} from "antd";
import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { arrowdown, arrowup, eye } from "../../utils/svg.file";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const { Meta } = Card;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class AddEstimates extends Component {
  render() {
    const box = [
      {
        title: "Disposal Fee",
        rate: <Input placeholder="$1,500" value="$1,500" className="p-0" />,
        columbtn: "count-card",
      },
      {
        title: "Hours",
        rate: <Input value="30" className="p-0" />,
        columbtn: "count-card",
      },
      {
        title: "Days w/3 guys",
        rate: <Input value="30" className="p-0" />,
        columbtn: "count-card",
      },

      {
        title: "Sqft of concrete demo",
        rate: <Input value="$3,500" className="p-0" />,
        columbtn: "count-card",
      },
      {
        title: "Total Cost",
        rate: <h4>$2,430.00</h4>,
        columbtn: "danger-card",
      },
      {
        title: "Gross Profit",
        rate: <h4>49.22%</h4>,
        columbtn: "blue-card",
      },
      {
        title: "Markup",
        rate: <Input value="1.69" className="p-0" />,
        columbtn: "count-card",
      },
    ];
    const columns = [
      {
        title: "Materials needed:",
        dataIndex: "name",
      },
      {
        title: "QTY",
        dataIndex: "age",
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
    return (
      <>
        <div className="">
          {/* <BreadcrumbBar name="Estimates" subname="Add Estimate" /> */}
          <Row className="mt-4 mb-4">
            <Col span="8">
              <Button
                type="primary"
                className="radius-30 ant-primary-btn font-15 ps-2"
                size="large"
              >
                <PlusCircleOutlined style={{ fontSize: "24px" }} />
                Add Service
              </Button>
            </Col>
            <Col span={8} className="text-end pe-5">
              <Link to="/contract-preview">
                <Button
                  type="primary"
                  className="radius-30 ant-primary-btn font-15 ps-4"
                  size="large"
                >
                  Contract Preview
                </Button>
              </Link>
            </Col>
            <Col span="8" className="d-lg-flex align-items-center">
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
                  <Panel
                    header="Demolition & Prep"
                    key="1"
                    extra={[<>$4,785.00</>]}
                  >
                    <Row gutter={[24, 0]}>
                      {box.map((c, index) => (
                        <Col lg={5} span={24} key={index}>
                          <Card
                            bordered={false}
                            className={`radius-12 mb-3 height-half ${c.columbtn}`}
                          >
                            <span>{c.title}</span>

                            {c.rate}
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    <Card className="radius-12 ant-estimate-table-card">
                      <Table
                        className="ant-table-estmating add-estimates-table"
                        columns={columns}
                        dataSource={data}
                        size="middle"
                        pagination={false}
                      />
                    </Card>
                  </Panel>
                  <Panel header="Paver Patio" key="2" extra={[<>$4,785.00</>]}>
                    <Row gutter={[24, 0]}>
                      {box.map((c, index) => (
                        <Col lg={5} span={24} key={index}>
                          <Card
                            bordered={false}
                            className={`radius-12 mb-3 height-half ${c.columbtn}`}
                          >
                            <span>{c.title}</span>

                            {c.rate}
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    <Card className="radius-12 ant-estimate-table-card">
                      <Table
                        className="ant-table-estmating add-estimates-table"
                        columns={columns}
                        dataSource={data}
                        size="middle"
                        pagination={false}
                      />
                    </Card>
                  </Panel>
                </Collapse>
              </Card>
            </Col>
            <Col span={24} lg={8}>
              <Card
                bordered={false}
                className="radius-12 ant-bootom-line-effect mb-3"
              >
                <Meta
                  className="border-bottom ant-meta-title text-center py-3"
                  title="Estimate Overview"
                />
                <div className="ant-desc-box ">
                  <ul>
                    <li className="py-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-inline-flex align-items-center ant-overview-card">
                          <span className="me-2">{arrowup}</span>
                          Total Project Price
                        </div>

                        <span className="ant-blue-rate-font ant-blue-rate">
                          $24,551.14
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-inline-flex align-items-center ant-overview-card">
                          <span className="me-2">{arrowdown}</span>
                          Total Project Cost
                        </div>

                        <span className="ant-dager-rate ant-blue-rate-font">
                          $24,551.14
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <List
                  bordered={false}
                  size="large"
                  dataSource={listdata}
                  renderItem={(item) => (
                    <List.Item
                      className="px-0 ant-list-bx"
                      extra={[
                        <div className={` ${item.pricebtn}`}>{item.rate}</div>,
                      ]}
                    >
                      <List.Item.Meta description={item.title} />
                    </List.Item>
                  )}
                />
              </Card>
              <Collapse
                defaultActiveKey={["1", "2"]}
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
                      <List.Item
                        className="border-0 font-d"
                        extra={[item.cost]}
                      >
                        {item.title}
                      </List.Item>
                    )}
                  />
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
}
