import React from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, List, Input, Button, Row, Col } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
export default function ProductionRates() {
  const data = [
    {
      title: "On Average, how many guys work on each of your crews? ",
      price: "5",
    },
    {
      title: "How many hours do your guys work per day on average? ",
      price: "8",
    },
    {
      title: "Average cost per hour man hour per man",
      price: "$31",
    },
    {
      title: "Charge per man hour",
      price: "$75",
    },
  ];

  return (
    <>
      <BreadcrumbBar
        name="Dashboard"
        subname="Settings"
        subtitle="Production Rates"
        link="/"
        sublink="#"
        breaclass="mb-3"
      />
      <Row gutter={[24, 0]}>
        <Col lg={12}>
          <Card
            bordered={false}
            className="radius-12"
            title={[<h5 className="mb-0">Production Rates</h5>]}
          >
            <List
              bordered={false}
              dataSource={data}
              size="small"
              renderItem={(item) => (
                <List.Item
                  extra={[
                    <div className="d-flex align-items-center">
                      <Input
                        size="large"
                        type="number"
                        name="value"
                        maxLength="2"
                        placeholder=""
                        className="ant-width-small font-bold radius-4 gray-text"
                        value={item.rate}
                        min={1}
                        max={100}
                      />
                      <DeleteOutlined className="text-danger ms-2" />
                    </div>,
                  ]}
                  className="border-0 font-d px-0"
                >
                  <Input
                    size="large"
                    className="radius-4 "
                    placeholder=""
                    name="title"
                    value={item.title}
                  />
                </List.Item>
              )}
            />
            <div className="addbtn-ant py-3">
              <span className="d-inline-flex align-items-center ant-btn-link cursor-btn">
                <PlusCircleOutlined className="me-2" />
                Add new field
              </span>
            </div>
            <div className="mt-3">
              <Button type="primary" size="large">
                Update
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
