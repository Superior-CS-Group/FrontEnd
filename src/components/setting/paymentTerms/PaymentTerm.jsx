/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Row, Col, List, Input, Button, message } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getOrganizationDetails,
  updateOrganizationPaymentTerms,
} from "../../../api/organization";
export default function PaymentTerm() {
  const [paymentTerms, setPaymentTerms] = React.useState([]);
  const [isValid, setIsValid] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchOrganizationDetails = async () => {
    const response = await getOrganizationDetails();
    if (response.remote === "success") {
      setPaymentTerms(response.data.paymentTerms);
    }
  };
  useEffect(() => {
    fetchOrganizationDetails();
  }, []);

  const validatePaymentTerm = (newPaymentTerms) => {
    const totalPercentage = newPaymentTerms.reduce((acc, cur) => {
      return { value: Number(acc.value) + Number(cur.value) };
    });
    let valueValid = false;
    if (totalPercentage.value !== 100) {
      valueValid = true;
    }
    let nameValid = true;
    for (let i = 0; i < newPaymentTerms.length; i++) {
      if (!newPaymentTerms[i].title) {
        nameValid = false;
      }
    }
    setIsValid(!valueValid && nameValid);
  };

  const handleChange = (e, index) => {
    const newPaymentTerms = [...paymentTerms];
    newPaymentTerms[index][e.target.name] = e.target.value;
    setPaymentTerms(newPaymentTerms);
    validatePaymentTerm(newPaymentTerms);
  };

  const handleAdd = () => {
    const newPaymentTerms = [...paymentTerms];
    newPaymentTerms.push({
      name: "",
      value: "1",
    });
    setPaymentTerms(newPaymentTerms);
    validatePaymentTerm(newPaymentTerms);
  };

  const handleDelete = (index) => {
    const newPaymentTerms = [...paymentTerms];
    newPaymentTerms.splice(index, 1);
    setPaymentTerms(newPaymentTerms);
    validatePaymentTerm(newPaymentTerms);
  };

  const handleUpdate = async () => {
    const key = "updatable";
    message.loading({ content: "Saving...", key });
    const body = {
      paymentTerms,
    };
    setIsLoading(true);
    const result = await updateOrganizationPaymentTerms(body);
    if (result.remote === "success") {
      message.success({
        content: "Payment Terms updated successfully",
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
              dataSource={paymentTerms}
              size="small"
              renderItem={(item, index) => (
                <List.Item
                  extra={[
                    <div className="d-flex align-items-center">
                      <Input
                        type="number"
                        name="value"
                        maxLength="2"
                        placeholder=""
                        style={{
                          border: isValid
                            ? "1px solid #e8e8e8"
                            : "1px solid red",
                        }}
                        className="ant-width-small font-bold radius-4 gray-text"
                        value={item.value}
                        min={1}
                        max={100}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <span>%</span>{" "}
                      <DeleteOutlined
                        className="delete-icon"
                        onClick={() => handleDelete(index)}
                        disabled={paymentTerms.length === 1 || isLoading}
                      />
                    </div>,
                  ]}
                  className="border-0 font-d"
                >
                  <Input
                    placeholder="Milestons Name"
                    name="title"
                    value={item.title}
                    onChange={(e) => handleChange(e, index)}
                  />
                </List.Item>
              )}
            />
            <div className="addbtn-ant ps-3 py-3">
              <a
                href="#"
                className="d-inline-flex align-items-center"
                onClick={handleAdd}
              >
                <PlusCircleOutlined className="me-2" />
                Add new field
              </a>
            </div>
          </Card>
          <Button onClick={handleUpdate} disabled={!isValid || isLoading}>
            Update
          </Button>
        </Col>
      </Row>
    </>
  );
}
