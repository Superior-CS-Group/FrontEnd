import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Row, Col, Card, Form, Button, InputNumber, Input } from "antd";
import user from "../../../images/userprofile.jpg";
import { EditFilled } from "@ant-design/icons";

export default function UserProfile() {
  const profileData = [
    {
      title: "Name",
      subtitle: "gabriel",
      editInput: <Input type="text" size="large" defaultValue="gabriel" />,

      line: <hr className="bg-gray" />,
    },

    {
      title: "Email",
      subtitle: "gabrielc@superiorcsgroup.com",
      line: <hr className="bg-gray" />,
      editInput: (
        <Input
          type="email"
          size="large"
          defaultValue="gabrielc@superiorcsgroup.com"
        />
      ),
    },
    {
      title: "Company",
      subtitle: "superiorcsgroup",
      line: <hr className="bg-gray" />,
      editInput: (
        <Input type="text" size="large" defaultValue="superiorcsgroup" />
      ),
    },
    {
      title: "Phone Number",
      subtitle: "1234567890",
      line: <hr className="bg-gray" />,
      editInput: (
        <InputNumber
          type="text"
          size="large"
          defaultValue="1234567890"
          className="w-100"
        />
      ),
    },
    {
      title: "Password",
      subtitle: "123",
      line: <hr className="bg-gray" />,
      editInput: (
        <Input type="password" size="large" defaultValue="1234567890" />
      ),
    },
  ];

  const [profile, setProfile] = useState("");

  const handleEdit = () => {
    const isEdit = profile === "edit" ? "" : "edit";
    setProfile(isEdit);
  };

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
          {profile === "edit" ? (
            <Row gutter={[24, 0]}>
              <Col lg={6} className="border-end">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <div className="position-relative">
                    <span className="editphoto">
                      <EditFilled />
                      <Input type="file" />
                    </span>
                    <img
                      className="rounded-circle"
                      width="150px"
                      src={user}
                      alt=""
                    />
                  </div>
                  {/* <span className="font-weight-bold">gabrielc</span> */}
                </div>
              </Col>
              <Col lg={18}>
                <Form className="ps-lg-3">
                  {profileData.map((p, index) => (
                    <React.Fragment key={index}>
                      <Row
                        gutter={[24, 0]}
                        className="d-flex align-items-center"
                      >
                        <Col lg={4}>
                          <h6 className="mb-0">{p.title}</h6>
                        </Col>
                        <Col lg={20}>{p.editInput}</Col>
                      </Row>
                      {p.line}
                    </React.Fragment>
                  ))}
                  <div>
                    <Button type="primary" onClick={handleEdit}>
                      save
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          ) : (
            <Row gutter={[24, 0]}>
              <Col lg={6} className="border-end">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle"
                    width="150px"
                    src={user}
                    alt=""
                  />
                  {/* <span className="font-weight-bold">gabrielc</span> */}
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
                    <Button type="primary" onClick={handleEdit}>
                      Edit
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          )}
        </div>
      </Card>
    </>
  );
}
