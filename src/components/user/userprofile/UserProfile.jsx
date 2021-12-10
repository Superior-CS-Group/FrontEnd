import React from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Row, Col, Card, Form, Button } from "antd";

export default function UserProfile() {
  const profileData = [
    {
      title: "Full Name",
      subtitle: "sunil singh",

      line: <hr className="bg-gray" />,
    },
    {
      title: "Email",
      subtitle: "gabrielc@superiorcsgroup.com",
      line: <hr className="bg-gray" />,
    },
    {
      title: "Phone No.",
      subtitle: "9131889706",
      line: <hr className="bg-gray" />,
    },
    { title: "Password", subtitle: "123", line: <hr className="bg-gray" /> },
    {
      title: "Address",
      subtitle: "Bay Area, San Francisco, CA",
      line: <hr className="bg-gray" />,
    },
    {
      title: "City",
      subtitle: "Francisco",
      line: <hr className="bg-gray" />,
    },
    {
      title: "State",
      subtitle: "USA",
      line: <hr className="bg-gray" />,
    },
  ];


  
  return (
    <>
      <BreadcrumbBar
        name="Dashboard"
        subname="user"
        subtitle="User Profile"
        breaclass="mb-3"
        sublink="user-profile"
        link="/"
      />
      <Card bordered={false} className="radius-12">
        <div className="user-profile">
          <Row gutter={[24, 0]}>
            <Col lg={6} className="border-end">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span className="font-weight-bold">gabrielc</span>
              </div>
            </Col>
            <Col lg={18}>
              <Form className="ps-lg-3">
                {profileData.map((p, index) => (
                  <React.Fragment key={index}>
                    <Row gutter={[24, 0]}>
                      <Col lg={4}>
                        <h6 className="mb-0">{p.title}</h6>
                      </Col>
                      <Col lg={20}>
                        <label htmlFor="name" className="text-secondary">
                          {p.subtitle}
                        </label>
                      </Col>
                    </Row>
                    {p.line}
                  </React.Fragment>
                ))}
                <div>
                  <Button type="primary">Edit</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}
