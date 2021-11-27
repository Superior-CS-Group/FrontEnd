import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { createCatalogItem } from "../../../api/catalogue";

export default function Addelement() {
  const [name, setName] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const handleSave = async (e) => {
    try {
      e.preventDefault();
      if (!name) {
        setErrors({ name: "Name is required" });
        return;
      }
      const response = await createCatalogItem({ name, type: "subCatalog" });
      if (response.remote) {
        console.log("remteo: ", response);
      } else {
        console.log("response: ", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="ant-upload-box">
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Form.Item label="Name of Material">
                <Input
                  placeholder="e.g hard pipe"
                  size="large"
                  className="ant-furmulla-input radius-30"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Item>
            </Col>

            <Col md={24} className="text-end">
              <Button type="primary" className="radius-9" onClick={handleSave}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
