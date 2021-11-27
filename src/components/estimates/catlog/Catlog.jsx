import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Input, Table, Button } from "antd";
import { Nav, Tab } from "react-bootstrap";

import {
  PlusCircleOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  UpCircleFilled,
  DownCircleFilled,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

import CataLogModal from "./catalog.modal";
import Addelement from "./add.element";
import AddItem from "./add.item";
import {
  getCatalogItem,
  getVariationsByCatalogId,
} from "../../../api/catalogue";

export default function Catlog() {
  const [title, setTitle] = useState("Sub Category");
  const [isModal, setIsModal] = useState("");
  const [catalogItem, setCatalogItem] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [expandedRowRender, setExpandedRowRender] = useState([]);
  const [isLoadingVariation, setIsLoadingVariation] = useState(false);
  const [selectedSubCatalog, setSelectedSubCatalog] = useState("");
  const [variations, setVariations] = useState([]);

  const handelUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const loadVariations = async (id) => {
    setIsLoadingVariation(true);
    console.log("id: ", id);
    const response = await getVariationsByCatalogId(id);
    if (response.remote === "success") {
      const variations = response.data.data;
      console.log("variations: ", variations);
      const prcessedVariations = variations.map((variation) => {
        return {
          key: variation._id,
          name: variation.name,
          price: variation.price,
          quantity: variation.quantity,
          unit: variation.unit,
          description: variation.description,
          _id: variation._id,
          action: (
            <>
              <Button
                type="text"
                shape="circle"
                className="me-2 d-inline-flex align-items-center justify-content-center"
              >
                <DeleteTwoTone />
              </Button>
              <Button
                type="text"
                shape="circle"
                className="d-inline-flex align-items-center justify-content-center"
              >
                <EditTwoTone />
              </Button>
            </>
          ),
        };
      });
      setVariations(prcessedVariations);
    }
    setTimeout(() => {
      setIsLoadingVariation(false);
    }, 1000);
  };

  React.useEffect(() => {
    if (selectedSubCatalog) {
      setIsModal("additem");
      setTitle("Add Item");
    }
  }, [selectedSubCatalog]);

  const addModal = () => {
    setIsModal("additem");
  };
  const handleOk = () => {
    setIsModal(false);
  };

  const handleCancel = () => {
    setIsModal("");
  };

  const getCatalog = async () => {
    const response = await getCatalogItem();
    if (response.remote === "success") {
      setCatalogItem(response.data.data);
    }
  };

  React.useEffect(() => {
    getCatalog();
  }, [isUpdate]);

  React.useEffect(() => {
    const newElements = [];
    console.log("catalogItem: ", catalogItem);
    catalogItem.forEach((element) => {
      newElements.push({
        key: element._id,
        _id: element._id,
        name: element.name,
        price: element.price,
        quantity: element.quantity,
        description: element.description,
        type: element.type,
        action: (
          <>
            {element.type === "subCatalog" && (
              <Button
                type="text"
                shape="circle"
                className="me-2 d-inline-flex align-items-center justify-content-center"
                onClick={() => setSelectedSubCatalog(element._id)}
              >
                <PlusCircleOutlined />
              </Button>
            )}
            <Button
              type="text"
              shape="circle"
              className="me-2 d-inline-flex align-items-center justify-content-center"
            >
              <DeleteTwoTone />
            </Button>
            <Button
              type="text"
              shape="circle"
              className="d-inline-flex align-items-center justify-content-center"
            >
              <EditTwoTone />
            </Button>
          </>
        ),
      });
    });
    setExpandedRowRender(newElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogItem.length]);

  const columns = [
    { title: "Pipe", dataIndex: "name", key: "name", className: "font-bold" },
    {
      title: "Prize",
      dataIndex: "price",
      key: "price",
      className: "green-color",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      className: "text-end",
    },
  ];

  const renderItem = () => {
    switch (isModal) {
      case "subcategory":
        return <Addelement handleCancel={handleCancel} />;
      case "additem":
        return (
          <AddItem
            handleCancel={handleCancel}
            selectedSubCatalog={selectedSubCatalog}
            handelUpdate={handelUpdate}
            setSelectedSubCatalog={setSelectedSubCatalog}
          />
        );

      default:
        return "";
    }
  };

  return (
    <>
      <BreadcrumbBar
        name="Dashboard "
        subname="Estimates"
        subtitle="Catalog"
        breaclass="mb-3"
      />
      <div className="ant-catlog-main">
        <Card
          bordered={false}
          className="radius-9"
          bodyStyle={{ padding: "0px" }}
        >
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav className="catlog-tabs" as="ul">
              <Nav.Item as="li">
                <Nav.Link eventKey="first">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  Materials
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="second">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>Services
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="three">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>Packages
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="p-3 card-shadow ">
              <div className="p-2">
                <div className="fillter d-lg-flex align-items-center">
                  <span
                    className="ant-blue-plus me-4"
                    onClick={() => {
                      setIsModal("subcategory");
                      setTitle("Sub Category");
                    }}
                  >
                    <PlusCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Sub Category
                  </span>
                  <span
                    className="ant-blue-plus me-4"
                    onClick={() => {
                      setIsModal("additem");
                      setTitle("Add Item");
                    }}
                  >
                    <PlusCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Add Item
                  </span>
                  <span className="ant-text-danger me-4">
                    <CloseCircleOutlined
                      style={{ fontSize: "18px" }}
                      className="me-2"
                    />{" "}
                    Delete catalog
                  </span>

                  <div className="ms-auto col-lg-3">
                    <Input
                      placeholder="Search catalog by name"
                      text="search"
                      className="ant-search-button"
                      suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
                    />
                  </div>
                </div>
              </div>
              <Tab.Content className="mt-2">
                <Tab.Pane eventKey="first">
                  <Table
                    bordered={false}
                    className="components-table-demo-nested"
                    columns={columns}
                    expandable={{
                      expandedRowRender: (render) => {
                        if (isLoadingVariation) {
                          return (
                            <div className="text-center">
                              <h1>Loading...</h1>
                            </div>
                          );
                        }
                        if (!variations.length) {
                          return (
                            <div
                              className="text-center"
                              onClick={() => setSelectedSubCatalog(render._id)}
                            >
                              <h1>Add Item..</h1>
                            </div>
                          );
                        }
                        return (
                          <Table
                            columns={columns}
                            dataSource={variations}
                            pagination={false}
                            bordered={false}
                            className="ant-table-expand"
                          />
                        );
                      },
                      rowExpandable: (element) => element.type === "subCatalog",
                      expandIcon: ({ expanded, onExpand, record }) => {
                        if (record.type === "subCatalog") {
                          return expanded ? (
                            <UpCircleFilled
                              style={{ color: "#3483FA" }}
                              onClick={(e) => {
                                onExpand(record, e);
                              }}
                            />
                          ) : (
                            <DownCircleFilled
                              style={{ color: "#3483FA" }}
                              onClick={(e) => {
                                onExpand(record, e);
                                loadVariations(record._id);
                              }}
                            />
                          );
                        }
                      },
                    }}
                    dataSource={expandedRowRender}
                    pagination={false}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">Comming Soon Services</Tab.Pane>
                <Tab.Pane eventKey="three">Comming Soon Packages</Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Card>
      </div>
      <CataLogModal
        title={title}
        addModal={addModal}
        isModal={isModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        content={renderItem()}
        width={575}
      />
    </>
  );
}
