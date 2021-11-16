import React, { Component } from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Row, Col, Button, Card, Collapse, Input, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { eye } from "../../utils/svg.file";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
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
    return (
      <>
        <div className="bg-estimates">
          <BreadcrumbBar name="Estimates" subname="Add Estimate" />
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
            <Col span="8" className="ms-auto d-lg-flex align-items-center">
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
              <Card bordered={false} className="estimation-card">
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={callback}
                  accordion
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

                    <Card className="radius-12">
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
              Comming Soon
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
