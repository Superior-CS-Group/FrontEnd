/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Row, Col, List, Input, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
export default function PaymentTerm() {
  const data = [
    { title: "Milestons Name", present: <Button>10</Button> },
    { title: "Milestons Name", present: <Button>10</Button> },
    { title: "Milestons Name", present: <Button>10</Button> },
    { title: "Milestons Name", present: <Button>10</Button> },
    {
      title: <Input type="text" defaultValue={55} style={{ width: "98%" }} />,
      present: (
        <Input type="text" style={{ width: "45px" }} defaultValue={10} />
      ),
      delete: (
        <span className="ms-1 delete-icon">
          <DeleteOutlined />
        </span>
      ),
    },
  ];
  return (
    <>
      <BreadcrumbBar
        name="Dashboard"
        subname="settings"
        subtitle="Payment Terms"
        breaclass="mb-3"
        link="/"
      />

      <Row gutter={[24, 0]}>
        <Col lg={12}>
          <Card
            bordered={false}
            className="radius-12"
            title={[<h5 className="mb-0">Payment Terms</h5>]}
          >
            <List
              bordered={false}
              dataSource={data}
              size="small"
              renderItem={(item) => (
                <List.Item
                  extra={[
                    <>
                      {item.present} <span>%</span>
                      {item.delete}
                    </>,
                  ]}
                  className="border-0 font-d"
                >
                  <List.Item.Meta description={item.title} />
                </List.Item>
              )}
            />
            <div className="addbtn-ant ps-3 py-3">
              <a href="#" className="d-inline-flex align-items-center">
                <PlusCircleOutlined className="me-2" />
                Add new field
              </a>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
