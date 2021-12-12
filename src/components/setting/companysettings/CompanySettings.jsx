import React, { useEffect, useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import UploadFile from "./card/uploadFile.component";
import {
  getOrganizationDetails,
  updateOrganizationDetails,
} from "../../../api/organization.js";

export default function CompanySettings() {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    coverPhoto: "",
    logo: "",
    teamPhoto: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserOrganization = async () => {
    const details = await getOrganizationDetails();
    if (details.remote === "success") {
      setCompanyDetails(details.data);
    }
  };

  useEffect(() => {
    getUserOrganization();
  }, []);

  const handleChange = (value, name) => {
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleRemove = (value, name) => {
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    setIsLoading(true);
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const body = {
      name: companyDetails.name,
      address: companyDetails.address,
      phoneNumber: companyDetails.phoneNumber,
      logo: companyDetails.logo,
      teamPhoto: companyDetails.teamPhoto,
      estimationCoverPhoto: companyDetails.coverPhoto,
    };
    console.log("body: ", body);
    if (!body.name) {
      setErrors({ ...errors, name: "Name is required" });
      return;
    }
    const response = await updateOrganizationDetails(body);
    if (response.remote === "success") {
      message.success({
        content: "Company Details Updated successfully",
        key,
        duration: 2,
      });
    } else {
      message.error({
        content: "Something went wrong",
        key,
        duration: 2,
      });
    }
    setIsLoading(false);
  };

  const layout = [
    {
      id: "logo",
      title: "Logo Upload",
      size: "1024 x 1024",
      image: companyDetails.logo,
    },
    {
      id: "coverPhoto",
      title: "Cover photo Upload",
      size: "1600 x 500",
      image: companyDetails.coverPhoto,
    },
    {
      id: "teamPhoto",
      title: "Meet The Team",
      size: "	6016 x 4016",
      image: companyDetails.teamPhoto,
    },
  ];
  return (
    <>
      <BreadcrumbBar
        name="Dashboard"
        subname="Settings"
        subtitle="Company Settings"
        link="/"
        sublink="#"
        breaclass="mb-3"
      />

      <Row gutter={[24, 0]}>
        <Col lg={12} className="mb-3">
          <Card bordered={false} className="radius-12 h-100">
            <Form layout="vertical">
              <Row gutter={[24, 0]}>
                <Col lg={24}>
                  <Form.Item label="Name">
                    <Input
                      type="text"
                      size="large"
                      placeholder="Enter Company Name"
                      name="name"
                      value={companyDetails.name}
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.name)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col lg={24}>
                  <Form.Item label="Address">
                    <Input.TextArea
                      className="textarea-resize"
                      size="large"
                      placeholder="Enter Company Address"
                      name="address"
                      value={companyDetails.address}
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.name)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        {layout.map((item, index) => {
          return (
            <Col lg={12} className="mb-3" key={index}>
              <UploadFile
                id={item.id}
                title={item.title}
                size={item.size}
                image={item.image}
                handleChange={handleChange}
                handleRemove={handleRemove}
              />
            </Col>
          );
        })}
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Row>
    </>
  );
}
