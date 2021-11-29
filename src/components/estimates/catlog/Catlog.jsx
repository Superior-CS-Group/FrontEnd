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
  PlusCircleTwoTone,
} from "@ant-design/icons";
import SmallLoader from "../../loader/smallLoader";
import CataLogModal from "./catalog.modal";
import Addelement from "./add.element";
import AddItem from "./add.item";
import log from "../../../images/placeholder.jpg";
import {
  getCatalogItem,
  getVariationsByCatalogId,
} from "../../../api/catalogue";
import CatalogServices from "./catalog.services";

export default function Catlog() {
  const [title, setTitle] = useState("Sub Category");
  const [isModal, setIsModal] = useState("");
  const [catalogItem, setCatalogItem] = useState([]);
  const [filtredCatalogItem, setFilteredCatalogItem] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [expandedRowRender, setExpandedRowRender] = useState([]);
  const [isLoadingVariation, setIsLoadingVariation] = useState(null);
  const [selectedSubCatalog, setSelectedSubCatalog] = useState("");
  const [variations, setVariations] = useState({});
  const handelUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const loadVariations = async (id) => {
    setIsLoadingVariation(id);
    const response = await getVariationsByCatalogId(id);
    if (response.remote === "success") {
      const variationsResponse = response.data.data;
      const prcessedVariations = variationsResponse.map((variation) => {
        return {
          key: variation._id,

          name: (
            <>
              <div className="d-flex align-items-center">
                {" "}
                <div className="ant-catalog-img me-3 w-64">
                  <img src={log} alt="" />
                </div>
                <span> {variation.name}</span>
              </div>
            </>
          ),

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
      console.log("valria: ", { ...variations, [id]: prcessedVariations });
      setVariations({ ...variations, [id]: prcessedVariations });
    }
    setTimeout(() => {
      setIsLoadingVariation(null);
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
      setFilteredCatalogItem(response.data.data);
    }
  };

  React.useEffect(() => {
    getCatalog();
  }, [isUpdate]);

  React.useEffect(() => {
    const newElements = [];
    filtredCatalogItem.forEach((element) => {
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
                <PlusCircleTwoTone />
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
  }, [filtredCatalogItem.length]);

  const columns = [
    {
      title: "Pipe",
      dataIndex: "name",
      key: "name",
      className: "font-bold",
    },
    {
      title: "Prize",
      dataIndex: "price",
      key: "price",
      className: "green-color",
    },
    { title: "Quantity", dataIndex: "version", key: "version" },

    { title: "Item", dataIndex: "creator", key: "creator" },

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
        return (
          <Addelement handleCancel={handleCancel} handelUpdate={handelUpdate} />
        );
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
  const filterCatalogItems = (e) => {
    const value = e.target.value;
    const newCatalog = catalogItem.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCatalogItem(newCatalog);
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
              <Nav.Item as="li">
                <Nav.Link>
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  <span>
                    <PlusCircleOutlined style={{ fontSize: "18px" }} />
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="p-3 card-shadow ">
              <Tab.Content className="mt-2">
                <Tab.Pane eventKey="first">
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
                          suffix={
                            <SearchOutlined style={{ fontSize: "18px" }} />
                          }
                          onChange={filterCatalogItems}
                        />
                      </div>
                    </div>
                  </div>
                  <Table
                    bordered={false}
                    scroll={{ y: 700 }}
                    className="components-table-demo-nested  scroll-style"
                    columns={columns}
                    expandable={{
                      expandedRowRender: (render) => {
                        if (isLoadingVariation === render._id) {
                          return (
                            <div className="text-center overflow-hidden">
                              <SmallLoader />
                            </div>
                          );
                        }
                        if (!variations[render._id]?.length) {
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
                            dataSource={variations[render._id]}
                            pagination={false}
                            bordered={false}
                            className="ant-table-expand  mt-3"
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
                        } else {
                          return (
                            <>
                              <div className="ant-catalog-img">
                                <img src={log} alt="" />
                              </div>
                            </>
                          );
                        }
                      },
                    }}
                    dataSource={expandedRowRender}
                    pagination={false}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="p-2">
                    <div className="fillter d-lg-flex align-items-center">
                      <span className="ant-blue-plus me-4">
                        <PlusCircleOutlined
                          style={{ fontSize: "18px" }}
                          className="me-2"
                        />{" "}
                        Add Services
                      </span>
                      {/* <span className="ant-text-danger me-4">
                        <CloseCircleOutlined
                          style={{ fontSize: "18px" }}
                          className="me-2"
                        />{" "}
                        Delete catalog
                      </span> */}

                      <div className="ms-auto col-lg-3">
                        <Input
                          placeholder="Search catalog by name"
                          text="search"
                          className="ant-search-button"
                          suffix={
                            <SearchOutlined style={{ fontSize: "18px" }} />
                          }
                          onChange={filterCatalogItems}
                        />
                      </div>
                    </div>
                  </div>
                  <CatalogServices />
                </Tab.Pane>
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
