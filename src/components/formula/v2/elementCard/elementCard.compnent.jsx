import { Col, Input, Modal, Row, Select, Button } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import ReactMentionInput from "../../../../utils/mentionInput/mentionInput";
import {
  getCatalogItem,
  getVariationsByCatalogId,
  searchCatalogByName,
} from "../../../../api/catalogue";

const typeOfOptions = [
  // { type: "manual", title: "Manual Entry" },
  { type: "prefilled", title: "Enter Prefilled Amount" },
  { type: "dropdown", title: "Dropdown" },
  { type: "boolean", title: "Conditional" },
  { type: "result_editable", title: "Result (Editable)" },
  { type: "result_locked", title: "Result (Locked)" },
];

function ElementCard({
  element,
  handleChange,
  idx,
  elementList,
  onFocusOut,
  handleRemoveElement,
}) {
  const { Option } = Select;
  // const [unit, setUnit] = React.useState([]);
  const [tempName, setTempName] = React.useState("");
  const [view, setView] = React.useState([]);
  const [typeOfElement, setTypeOfElement] = React.useState("");
  const [suggestedCatalogs, setSuggestedCatalogs] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [variation, setVariation] = React.useState([]);
  React.useEffect(() => {
    // setUnit(["km", "m", "$", "ton", "kg", "sqft"]);
    setTypeOfElement(element.type || "manual");
    setView([
      { type: "client", title: "Client view" },
      { type: "internal", title: "Internal View" },
      { type: "full", title: "Full View" },
    ]);
  }, [element]);

  React.useEffect(() => {
    async function fetchVariation() {
      console.log("fetchVariaiton");
      const response = await getVariationsByCatalogId(element.dropdown);
      if (response.remote === "success") {
        setVariation(response.data.data);
      }
    }
    console.log("elelemtn", element.dropdown);
    setVariation([
      { _id: "1", name: "Variation 1" },
      { _id: "2", name: "Variation 2" },
    ]);
    fetchVariation();
  }, [element.dropdown]);

  async function searchCatalog() {
    const catalogs = await searchCatalogByName(searchValue, "subCatalog");
    console.log("catalgos: ", catalogs);
    if (catalogs.remote === "success") {
      setSuggestedCatalogs(catalogs.data.data);
    } else {
      setSuggestedCatalogs([]);
    }
  }

  async function getSubCatalog(id) {
    const catalogs = await getCatalogItem(id);
    if (catalogs.remote === "success" && catalogs.data.data[0]) {
      setTempName(catalogs.data.data[0].name);
    }
  }

  React.useEffect(() => {
    searchCatalog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  const renderSection = () => {
    switch (typeOfElement) {
      case "dropdown":
        if (element.dropdown) {
          getSubCatalog(element.dropdown);
        }
        return (
          <>
            <Row gutter={[24, 0]} className="mb-3">
              <Col md={8} className="mb-3">
                <label>Choose Dropdown Items:</label>
              </Col>
              <Col md={16}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  onSearch={setSearchValue}
                  onChange={(value) => {
                    handleChange(value, "dropdown", idx);
                  }}
                  filterOption={(input, option) => {
                    return option.name
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                  value={tempName || element.dropdown}
                  onBlur={onFocusOut}
                >
                  {suggestedCatalogs.map((catalog) => (
                    <Option
                      key={catalog._id}
                      value={catalog._id}
                      name={catalog.name}
                    >
                      {catalog.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row gutter={[24, 0]} className="mb-3">
              <Col md={8} className="mb-3">
                <label>Choose Variation:</label>
              </Col>
              <Col md={16}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  onSearch={setSearchValue}
                  onChange={(value) => {
                    handleChange(value, "value", idx);
                  }}
                  filterOption={(input, option) => {
                    return option.name
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                  value={element.value} // TODO:  show variation name not id
                  onBlur={onFocusOut}
                  placeholder="Select Default Variation"
                >
                  {variation.map((catalog) => (
                    <Option
                      key={catalog._id}
                      value={catalog._id}
                      name={catalog.name}
                    >
                      {catalog.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </>
        );
      case "boolean":
        return (
          <>
            <Row gutter={[24, 0]} className="mb-3">
              <Col md={8}>
                <label>Element</label>
              </Col>
              <Col md={16}>
                <Select
                  style={{ width: "100%" }}
                  value={element.value}
                  onChange={(value) => handleChange(value, "value", idx)}
                  onBlur={onFocusOut}
                >
                  {elementList.map((element) => (
                    <Option key={element._id} value={element._id}>
                      {element.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </>
        );
      case "prefilled":
        return (
          <>
            <Row gutter={[24, 0]} className="mb-3">
              <Col md={8} className="mb-3">
                <label>Enter Prefilled Amount</label>
              </Col>
              <Col md={16}>
                <Input
                  placeholder="0"
                  className="ant-furmulla-input"
                  onChange={(e) =>
                    handleChange(e.target.value, e.target.name, idx)
                  }
                  value={element.value}
                  name="value"
                  onBlur={onFocusOut}
                  type="number"
                  min={0}
                />
              </Col>
            </Row>
          </>
        );
      case "result_editable":
        return (
          <>
            <Row gutter={[24, 0]} className="mb-3">
              <Col md={8}>
                <label>Formula(editable)</label>
              </Col>
              <Col md={16}>
                <ReactMentionInput
                  className="ant-furmulla-input"
                  elementList={elementList.map((element) => ({
                    display: element.name,
                    id: element._id,
                  }))}
                  onChange={(e, newValue) => {
                    e = { target: { ...e.target, name: "value" } };
                    handleChange(e.target.value, e.target.name, idx, newValue);
                  }}
                  placeholder="Enter Formula use '@' or '#' for the dynamic values"
                  value={element.value}
                  onBlur={onFocusOut}
                  // noMaterial
                  disabled={element.disabled}
                />
              </Col>
            </Row>
          </>
        );
      case "result_locked":
        return (
          <>
            <Row gutter={[24, 0]} className="mb-3">
              <Col md={8}>
                <label>Formula(locked)</label>
              </Col>
              <Col md={16}>
                <ReactMentionInput
                  className="ant-furmulla-input"
                  elementList={elementList.map((element) => ({
                    display: element.name,
                    id: element._id,
                  }))}
                  onChange={(e, newValue) => {
                    e = { target: { ...e.target, name: "value" } };
                    handleChange(e.target.value, e.target.name, idx, newValue);
                  }}
                  placeholder="Enter Formula use '@' or '#' for the dynamic values"
                  value={element.value}
                  onBlur={onFocusOut}
                  // noMaterial
                />
              </Col>
            </Row>
          </>
        );
      default:
        return "";
    }
  };
  return (
    <>
      <Col span={24} md={6} className="mb-4">
        <div
          className={`furmulla-tree-box  ant-cover-b ${
            !element.automatic ? "ant-cover-success" : "ant-cover-gray"
          } px-2 py-4`}
        >
          {!element.disabled && (
            <span className="delect">
              <DeleteOutlined
                className="text-danger"
                onClick={() => setIsDeleting(true)}
              />
            </span>
          )}
          <div className="ant-automic">{element.auto}</div>
          {/* <span className="ant-edit-furmulla">
          <EditOutlined />
        </span> */}
          <Row gutter={[8, 0]} className="align-items-center mb-3 ">
            <Col md={8}>
              <label>Name Element:</label>
            </Col>
            <Col md={16}>
              <Input
                placeholder="Name of Element"
                className="ant-furmulla-input"
                onChange={(e) =>
                  handleChange(e.target.value, e.target.name, idx)
                }
                value={element.name}
                name="name"
                onBlur={onFocusOut}
                disabled={element.disabled}
              />
            </Col>
          </Row>
          <Row gutter={[8, 0]} className="align-items-center mb-3">
            <Col md={8}>
              <label>Type Of Element:</label>
            </Col>
            <Col md={16}>
              <Select
                className="select-w"
                size="large"
                value={element.type}
                style={{ width: "100%" }}
                onChange={(value) => {
                  handleChange(value, "type", idx);
                  handleChange("", "value", idx);
                  setTypeOfElement(value);
                }}
                disabled={element.disabled}
                onBlur={onFocusOut}
              >
                {typeOfOptions.map((item, idx) => {
                  return (
                    <Option value={item.type} key={idx}>
                      {item.title}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>

          {renderSection()}
          <Row gutter={[8, 0]} className="align-items-center">
            <Col md={8}>
              <label>View</label>
            </Col>
            <Col md={16}>
              <Select
                mode="multiple"
                size="large"
                allowClear
                value={[...(element.view || [])]}
                onChange={(e) => handleChange(e, "view", idx)}
                className="select-w"
                style={{ width: "100%" }}
                onBlur={onFocusOut}
              >
                {view.map((item, index) => {
                  return (
                    <Option value={item.type} key={index}>
                      {item.title}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
        </div>
      </Col>
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={isDeleting}
        footer={null}
        closeIcon={<InfoCircleOutlined />}
      >
        <p>Are you sure you want to delete item ?</p>
        <Row>
          <Col md={12} className="text-right">
            <Button type="text" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
          </Col>
          <Col md={12}>
            <Button
              type="link"
              onClick={() => {
                handleRemoveElement(idx);
                setIsDeleting(false);
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ElementCard;
