import React, { useState } from "react";
import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Form,
  Button,
  Upload,
  message,
} from "antd";
import { treeIcon } from "../../utils/svg.file";
import {
  EditOutlined,
  CloseOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
const { Dragger } = Upload;
export default function FormullaTree() {
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const [tree, setTree] = useState(false);
  const addTree = () => {
    setTree(true);
  };
  const onClose = () => {
    setTree(false);
  };
  const furmullaList = [
    1,
    2,
    3,
    4,
    { auto: "Automatic" },
    { auto: "Automatic" },
    { auto: "Automatic" },
    { auto: "Automatic" },
  ];

  const formullaTableList = [1, 2, 3, 4, 5, 6, 7];
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <BreadcrumbBar name="Add Service" breaclass="mb-3" />
      <Card
        className="shadow estimate-card mb-4"
        style={{ borderRadius: "10px" }}
      >
        <div className="furmulla-tree d-flex align-items-center justify-content-center flex-column">
          <div className="furmulla-tree-box d-inline-flex ant-cover-b ant-cover-primary p-4">
            <Row gutter={[24, 0]} className="align-items-center mb-3">
              <Col span={8}>
                <label>Name Service:</label>
              </Col>
              <Col span={16}>
                <Input placeholder="Granding" className="ant-furmulla-input" />
              </Col>
            </Row>
            <Row gutter={[24, 0]} className="align-items-center">
              <Col span={8}>
                <label>Total Charge:</label>
              </Col>
              <Col span={16}>
                <Input
                  placeholder="{Total Charge}"
                  className="ant-furmulla-input"
                />
              </Col>
            </Row>
          </div>
          <span className="ant-cricle-add" onClick={addTree}>
            {treeIcon}
          </span>
        </div>

        <Row gutter={[24, 0]} className="pt-4 tree-line-furmulla">
          {furmullaList.map((f, index) => (
            <Col span={24} md={6} className="mb-4" key={index}>
              <div className="furmulla-tree-box  ant-cover-b ant-cover-success px-2 py-4">
                <div className="ant-automic">{f.auto}</div>
                <span className="ant-edit-furmulla">
                  <EditOutlined />
                </span>
                <Row gutter={[8, 0]} className="align-items-center mb-3">
                  <Col md={8}>
                    <label>Name Element:</label>
                  </Col>
                  <Col md={16}>
                    <Input placeholder="Hours" className="ant-furmulla-input" />
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className="align-items-center mb-3">
                  <Col md={8}>
                    <label>Type Of Element:</label>
                  </Col>
                  <Col md={16}>
                    <Select
                      defaultValue="Manual Entry"
                      onChange={handleChange}
                      className="select-w"
                      style={{ width: "100%" }}
                    >
                      <Option value="Manual Entry">Manual Entry</Option>
                      <Option value="entry">Manual Entry</Option>

                      <Option value="Yiminghe">Manual Entry</Option>
                    </Select>
                  </Col>
                </Row>

                <Row gutter={[8, 0]} className="align-items-center mb-3">
                  <Col md={8}>
                    <label>Unit Type:</label>
                  </Col>
                  <Col md={16}>
                    <Select
                      defaultValue="Number"
                      onChange={handleChange}
                      className="select-w"
                      style={{ width: "100%" }}
                    >
                      <Option value="number">Number</Option>
                      <Option value="one">1</Option>

                      <Option value="two">2</Option>
                    </Select>
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className="align-items-center mb-3">
                  <Col md={8}>
                    <label>Enter Prefilled Amount</label>
                  </Col>
                  <Col md={16}>
                    <Input placeholder="0" className="ant-furmulla-input" />
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className="align-items-center">
                  <Col md={8}>
                    <label>View</label>
                  </Col>
                  <Col md={16}>
                    <Select
                      defaultValue="Client View"
                      onChange={handleChange}
                      className="select-w"
                      style={{ width: "100%" }}
                    >
                      <Option value="Client View">Client View</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>

        <div className="table-responsive">
          <table className="table ant-furmulla-table table-hover">
            <thead>
              <tr>
                <th colSpan="4">Line Items Needed</th>
              </tr>
            </thead>
            <tbody>
              {formullaTableList.map((index) => (
                <tr key={index}>
                  <td>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <label>Name Material:</label>
                      </Col>
                      <Col md={16}>
                        <Input
                          placeholder="Fill Dirt"
                          className="ant-furmulla-input"
                        />
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <label>Enter Quantity:</label>
                      </Col>
                      <Col md={16}>
                        <Input
                          placeholder="{Element: “Tons Of Fill Dirt”}"
                          className="ant-furmulla-input"
                        />
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <label>Cost:</label>
                      </Col>
                      <Col md={16}>
                        <Input
                          placeholder="{Quantity} * {Catalog: “Fill Dirt”}"
                          className="ant-furmulla-input"
                        />
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <label>Charge:</label>
                      </Col>
                      <Col md={16}>
                        <Input
                          placeholder="{Cost} * {Element: “Markup”}"
                          className="ant-furmulla-input"
                        />
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span className="ant-add-material mb-3 d-inline-block">
          Add New Material: {treeIcon}
        </span>

        <div className="table-responsive">
          <table className="table ant-furmulla-table table-hover">
            <thead>
              <tr>
                <th colSpan="2">Hidden Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="30%">
                  <Row className="align-items-center">
                    <Col className="pe-2">
                      <label>Name Value:</label>
                    </Col>
                    <Col>
                      <Input
                        placeholder="-----"
                        className="ant-furmulla-input"
                        style={{ width: "250px" }}
                      />
                    </Col>
                  </Row>
                </td>
                <td>
                  <Row className="align-items-center">
                    <Col className="pe-2">
                      <label>Enter Formula:</label>
                    </Col>
                    <Col>
                      <Input
                        placeholder="------"
                        className="ant-furmulla-input"
                        style={{ width: "250px" }}
                      />
                    </Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <td width="30%">
                  <Row className="align-items-center">
                    <Col className="pe-2">
                      <label>Name Value:</label>
                    </Col>
                    <Col>
                      <Input
                        placeholder="-----"
                        className="ant-furmulla-input"
                        style={{ width: "250px" }}
                      />
                    </Col>
                  </Row>
                </td>
                <td>
                  <Row className="align-items-center">
                    <Col className="pe-2">
                      <label>Enter Formula:</label>
                    </Col>
                    <Col>
                      <Input
                        placeholder="------"
                        className="ant-furmulla-input"
                        style={{ width: "250px" }}
                      />
                    </Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <td width="30%">
                  <Row className="align-items-center">
                    <Col className="pe-2">
                      <label>Name Value:</label>
                    </Col>
                    <Col>
                      <Input
                        placeholder="-----"
                        className="ant-furmulla-input"
                        style={{ width: "250px" }}
                      />
                    </Col>
                  </Row>
                </td>
                <td>
                  <Row className="align-items-center">
                    <Col className="pe-2">
                      <label>Enter Formula:</label>
                    </Col>
                    <Col>
                      <Input
                        placeholder="------"
                        className="ant-furmulla-input"
                        style={{ width: "250px" }}
                      />
                    </Col>
                  </Row>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-responsive">
          <table className="table ant-furmulla-table">
            <thead>
              <tr>
                <th>Enter Wording - Client Contract</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-0">
                  <div
                    contentEditable
                    className="border p-3 radius-4 line-height-40"
                  >
                    - Grade area as discussed <br />- Bring in
                    {"{Element:”Tons Of Fill Dirt”}"} tons of fill dirt and{" "}
                    {"{Element:”Yard Of Topsoil”}"} tons of topsoil for grading{" "}
                    <br />- Haul off dirt as needed
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="table ant-furmulla-table">
          <thead>
            <tr>
              <th>Select Photo - Client Contract</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-0">
                <div className="ant-optional">
                  <Form layout="horizontal">
                    <Form.Item
                      label="Optional: Select Dropdown To Pull Photo From"
                      className="mb-0"
                    >
                      <Select
                        defaultValue="lucy"
                        style={{ width: 150 }}
                        onChange={handleChange}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>

                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </div>
                <div className="ant-optional p-0 mt-3">
                  <Dragger {...props} className="border-0 p-3">
                    <p className="ant-upload-drag-icon">
                      <CloudUploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files
                    </p>
                  </Dragger>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      {tree ? (
        <div className="bottom-modal p-4 pt-3">
          <Form layout="vertical">
            <Row gutter={[24, 0]} className="mb-3">
              <Col span={24}>
                <h5 className="text-center mb-4">
                  Define Formula{" "}
                  <span className="float-end closeicon" onClick={onClose}>
                    <CloseOutlined />
                  </span>
                </h5>
              </Col>
              <Col lg={4}>
                <Select
                  size="large"
                  className="ant-formulla"
                  defaultValue="User Input"
                  style={{ width: "100%", borderRadius: "9px" }}
                >
                  <Option value="User Input">User Input</Option>
                  <Option value="User Input">User Input</Option>
                  <Option value="User Input">User Input</Option>
                  <Option value="User Input">User Input</Option>
                </Select>
              </Col>
              <Col lg={16}>
                <Input
                  placeholder="length of per pipe"
                  className="radius-9"
                  size="large"
                />
              </Col>
              <Col lg={4}>
                <Button type="primary" size="large" className="radius-9" block>
                  Add Element
                </Button>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col lg={20}>
                <Form.Item>
                  <div className="radius-9 ant-blue-add-tree-box">
                    <ul>
                      <li>
                        <span>Perf pipe cost</span>{" "}
                        <span className="tag-close-icon">x</span>
                      </li>
                      <li>
                        <span>Multiply {"{*}"}</span>{" "}
                        <span className="tag-close-icon">x</span>
                      </li>
                    </ul>
                  </div>
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Button type="primary" size="large" className="radius-9" block>
                  Save Formula
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
