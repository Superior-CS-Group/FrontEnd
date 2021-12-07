import React from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { upload } from "../../../utils/svg.file";
import { CloseOutlined, DollarCircleOutlined } from "@ant-design/icons";

import { validateCreateItemInput } from "../../../validators/catalog/catalog.validator";
import {
  createCatalogItem,
  createVariation,
  updateCatalog,
  updateVariation,
} from "../../../api/catalogue";
import { fileToBase64 } from "../../../utils/fileBase64";
import { GetAllUnits } from "../../../api/unit";
const { Option } = Select;
export default function AddItem({
  handleCancel,
  selectedSubCatalog,
  setSelectedSubCatalog,
  handelUpdate,
  selectedElement,
  setSelectedElement,
}) {
  console.log("selectedElement: ", selectedElement, selectedSubCatalog);
  const [loading, setLoading] = React.useState(false);
  const [unitList, setUnitList] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState({
    name: "",
    price: "",
    description: "",
    unit: "",
    quantity: "",
    images: [],
    type: "catalog",
  });
  const [errors, setErrors] = React.useState({
    name: "",
    price: "",
    description: "",
    unit: "",
    quantity: "",
  });

  React.useEffect(async () => {
    if (selectedElement && selectedElement._id) {
      setItemDetails(selectedElement);
    } else {
      setItemDetails({
        name: "",
        price: "",
        description: "",
        unit: "",
        quantity: "",
        images: [],
        type: "catalog",
      });
    }

    let response = await GetAllUnits();
    console.log("ddd", response);
    setUnitList(response.data.userData.reverse());
  }, [selectedElement]);

  const handleClose = () => {
    setItemDetails({
      name: "",
      price: "",
      description: "",
      unit: "",
      quantity: "",
      images: [],
      type: "catalog",
    });
    setErrors({
      name: "",
      price: "",
      description: "",
      unit: "",
      quantity: "",
    });
    handleCancel();
  };

  const handleImageChange = async (e) => {
    console.log("image: ", e.target.files[0]);
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setItemDetails({
      ...itemDetails,
      images: [...itemDetails.images, imageBase64],
    });
  };

  const handleInputChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: Number(e.target.value) || e.target.value,
    });
  };
  const handleSelectChange = (value) => {
    console.log("select", value);
    setItemDetails({
      ...itemDetails,
      unit: value,
    });
    console.log("select", itemDetails);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setErrors({
      name: "",
      price: "",
      description: "",
      unit: "",
      quantity: "",
    });
    setLoading(true);
    try {
      const { isValid, errors } = validateCreateItemInput(itemDetails);
      console.log("isValid: ", isValid);
      if (!isValid) {
        throw errors;
      }
      let response = {};
      if (selectedSubCatalog) {
        if (selectedElement && selectedElement._id) {
          response = await updateVariation({
            ...itemDetails,
          });
        } else {
          response = await createVariation({
            ...itemDetails,
            catelogId: selectedSubCatalog,
          });
        }
      } else if (selectedElement._id) {
        response = await updateCatalog(itemDetails);
      } else {
        response = await createCatalogItem(itemDetails);
      }
      if (response.remote === "success") {
        console.log("responesUpdate: ", response);
        setTimeout(() => {
          setLoading(false);
          handleClose();
          handelUpdate(selectedSubCatalog);
          setSelectedSubCatalog("");
          setSelectedElement({});
          // setItemDetails({})
        }, 1000);
      } else {
        setErrors(response.errors.errors);
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
      setErrors(error);
    }
  };

  const handleRemoveImage = (index) => {
    const images = [...itemDetails.images];
    images.splice(index, 1);
    setItemDetails({
      ...itemDetails,
      images,
    });
  };
  console.log("listR", unitList);
  let renderUnitList;
  if (unitList)
    renderUnitList = unitList.map((unit) => {
      return <Option value={unit.name}>{unit.name}</Option>;
    });
  return (
    <>
      <div className="ant-upload-box">
        <Form layout="vertical">
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Form.Item label="Name of Material">
                <Input
                  placeholder="Material"
                  size="large"
                  className="ant-furmulla-input radius-30"
                  name="name"
                  onChange={handleInputChange}
                  value={itemDetails.name}
                />
                <span className="text-danger small">{errors.name}</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Price">
                <Input
                  prefix={<DollarCircleOutlined />}
                  placeholder="Price"
                  size="large"
                  className="ant-furmulla-input radius-30"
                  name="price"
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                  value={itemDetails.price}
                />
                <span className="text-danger small">{errors.price}</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Unit" className="ant-smily-select">
                {/* <Input
                  className="ant-furmulla-input radius-30"
                  placeholder="Unit"
                  size="large"
                  name="unit"
                  onChange={handleInputChange}
                  value={itemDetails.unit}
                /> */}
                <Select
                  size="large"
                  name="unit"
                  value={itemDetails.unit ? itemDetails.unit : "Select Unit"}
                  onChange={handleSelectChange}
                  // suffixIcon={<img src={arrowDwon} alt="" />}
                  // value={itemDetails.unit}
                  className="ant-select-box"
                >
                  {renderUnitList}
                </Select>
                <span className="text-danger small">{errors.unit}</span>
              </Form.Item>
            </Col>
            {/* <Col md={8}>
              <Form.Item label="Quantity">
                <Input
                  className="ant-furmulla-input radius-30"
                  placeholder="Quantity"
                  size="large"
                  name="quantity"
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                  value={itemDetails.quantity}
                />
                <span className="text-danger small">{errors.quantity}</span>
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item label="Description">
                <TextArea
                  className="ant-furmulla-input radius-30 p-3"
                  maxLength={300}
                  onChange={handleInputChange}
                  style={{ height: "120px", resize: "none" }}
                  placeholder="Enter Description about materials"
                  name="description"
                  value={itemDetails.description}
                />
                <span className="text-danger small">{errors.description}</span>
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={[24, 0]}>
            {itemDetails.images.map((image, index) => {
              return (
                <Col md={6} key={index}>
                  <div className="ant-image-upload">
                    {/* <span className="ant-star-icon">{star}</span> */}
                    {/* <span className="ant-star-tick ant-position d-none">
                    <CheckOutlined />
                  </span> */}
                    <span
                      className="ant-star-delete ant-position"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseOutlined />
                    </span>
                    <img src={image} alt="" />
                  </div>
                </Col>
              );
            })}
            <Col md={6}>
              <div className="ant-image-upload border-dash">
                <div className="d-flex align-items-center  justify-content-center h-100 upload-input">
                  <input type="file" onChange={handleImageChange} />
                  {upload}
                </div>
              </div>
            </Col>
            <Col md={24} className="text-end mt-3">
              {/* <Button
                type="link"
                danger
                className="radius-30 px-4 me-2 btn-width"
                onClick={handleClose}
                disabled={loading}
                size="large"
              >
                Delete Items
              </Button> */}
              <Button
                type="link"
                className="radius-30 px-4 me-2 btn-width"
                onClick={handleClose}
                disabled={loading}
                size="large"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                className="radius-30 px-4 btn-width"
                onClick={handleSave}
                disabled={loading}
              >
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
