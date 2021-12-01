import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { createCatalogItem, updateCatalog } from "../../../api/catalogue";

export default function Addelement({
  handelUpdate,
  handleCancel,
  selectedElement,
  setSelectedElement,
}) {
  const [name, setName] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (selectedElement && selectedElement._id) {
      setName(selectedElement.name);
    } else {
      setName("");
    }
  }, [selectedElement]);
  const handleSave = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!name) {
        setErrors({ name: "Name is required" });
        return;
      }
      let response = {};
      if (selectedElement && selectedElement._id) {
        response = await updateCatalog({
          name,
          type: "subCatalog",
          _id: selectedElement._id,
        });
      } else {
        response = await createCatalogItem({ name, type: "subCatalog" });
      }
      if (response.remote === "success") {
        console.log("remteo: ", response);
        setTimeout(() => {
          handelUpdate();
          handleCancel();
          setSelectedElement({});
          setLoading(false);
        }, 1000);
      } else {
        console.log("response: ", response);
        setLoading(false);
        setErrors(response.errors.errors);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
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
                <span className="text-danger small">{errors.name}</span>
              </Form.Item>
            </Col>

            <Col md={24} className="text-end">
              <Button type="primary" className="radius-9" onClick={handleSave}>
                {selectedElement && selectedElement._id && !loading
                  ? "Update"
                  : selectedElement && selectedElement._id && loading
                  ? "Updating..."
                  : loading
                  ? "Adding..."
                  : "Add"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
