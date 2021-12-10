/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Input, Table, Button, Image, Modal, Row, Col } from "antd";
import { Nav, Tab } from "react-bootstrap";
import {
  PlusCircleOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  UpCircleFilled,
  DownCircleFilled,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import SmallLoader from "../../loader/smallLoader";
import CataLogModal from "./catalog.modal";
import Addelement from "./add.element";
import AddItem from "./add.item";
import log from "../../../images/placeholder.jpg";
import {
  deleteCatalog,
  getCatalogItem,
  getVariationsByCatalogId,
  removeVariation,
} from "../../../api/catalogue";
import AddService from "./addService.component";
import Services from "./services/services.component";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

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
  const [isAddService, setIsAddService] = useState(false);
  const [selectedElement, setSelectedElement] = useState({});
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const [deleteErrors, setDeleteErrors] = useState("");
  const [deleteing, setDeleteing] = useState(false);
  // const images = ['https://onepercent.portal.superiorcsgroup.com:1629/media/users/61a0f99ef25060133ba3a61a/materials/61a0f99ef25060133ba3a61a-1638390458848.jpg','https://onepercent.portal.superiorcsgroup.com:1629/media/users/61a0f99ef25060133ba3a61a/materials/61a0f99ef25060133ba3a61a-1638390458847.jpg'];
  const [state, setState] = useState({
    smallLoader: true,
  });
  const handleAddModal = () => {
    setIsAddService(true);
  };
  const handleSelectedElement = (data, action) => {
    setSelectedElement({
      ...data,
      action,
    });
  };

  const handleRemoveElement = async () => {
    let response = {};
    setDeleteErrors("");
    setDeleteing(true);
    if (
      selectedElement &&
      ["subCatalog", "catalog"].includes(selectedElement.type)
    ) {
      response = await deleteCatalog(selectedElement._id);
    } else {
      response = await removeVariation(selectedElement._id);
    }
    if (response.remote === "success") {
      let newCatalogItem = [...catalogItem];
      newCatalogItem = newCatalogItem.filter(
        (item) => item._id !== selectedElement._id
      );
      let newFiltredCatalogItem = [...filtredCatalogItem];
      newFiltredCatalogItem = newFiltredCatalogItem.filter(
        (item) => item._id !== selectedElement._id
      );
      let newVariations = [...(variations[selectedElement._id] || [])];
      newVariations = newVariations.filter(
        (item) => item._id !== selectedElement._id
      );
      setCatalogItem(newCatalogItem);
      setFilteredCatalogItem(newFiltredCatalogItem);
      setVariations({
        ...variations,
        [selectedElement.catelogId]: newVariations,
      });
      setSelectedElement({});
    } else {
      setDeleteErrors(response.errors.errors.msg);
    }
    setDeleteing(false);
  };

  React.useEffect(() => {
    if (selectedElement && selectedElement.action === "edit") {
      if (selectedElement.type === "catalog") {
        setIsModal("additem");
      } else if (selectedElement.type === "subCatalog") {
        setIsModal("subcategory");
      } else if (selectedElement.type === "variation") {
        setSelectedSubCatalog(selectedElement.catelogId);
      }
    } else if (selectedElement && selectedElement.action === "delete") {
    }
  }, [Object.keys(selectedElement).length]);
  const handelUpdate = (variationId) => {
    if (variationId) {
      loadVariations(variationId);
    }
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
                <div className="ant-catalog-img me-3">
                  <Image
                    preview={{ visible: false }}
                    src={variation.images[0] || log}
                    onClick={(rr = variation.images) => {
                      setCurrentImages(variation.images);
                      setIsOpen(true);
                    }}
                    alt=""
                  />
                  {/* <div style={{ display: "none" }}>
                    <Image.PreviewGroup
                      preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                      }}
                    >
                      <Image src={log} />
                      <Image src={log} />
                      <Image src={log} />
                    </Image.PreviewGroup>
                  </div> */}
                </div>
                <span> {variation.name}</span>
              </div>
            </>
          ),
          price: `$${variation.price} ${variation.unit}`,
          quantity: variation.quantity,
          unit: variation.unit,
          description: variation.description,
          _id: variation._id,
          action: (
            <>
              <Button
                type="text"
                shape="circl"
                className="me-2 d-inline-flex align-items-center justify-content-center"
                onClick={() => handleSelectedElement(variation, "delete")}
              >
                <DeleteOutlined
                  className="text-danger"
                  // onClick={(e) => removeCatalogData(element._id)}
                />
              </Button>
              <Button
                type="text"
                shape="circle"
                className="d-inline-flex align-items-center justify-content-center"
                onClick={() =>
                  handleSelectedElement(
                    { ...variation, type: "variation" },
                    "edit"
                  )
                }
              >
                <EditOutlined className="text-primary" />
              </Button>
            </>
          ),
        };
      });
      setVariations({ ...variations, [id]: prcessedVariations });
    }
    setTimeout(() => {
      setIsLoadingVariation(null);
    }, 500);
  };

  React.useEffect(() => {
    if (selectedSubCatalog) {
      setIsModal("additem");
      setTitle("Add variation");
    }
  }, [selectedSubCatalog]);

  const addModal = () => {
    setIsModal("additem");
  };
  const handleOk = () => {
    setIsModal(false);
    setIsAddService(false);
    setSelectedElement({});
    setSelectedSubCatalog(null);
  };

  const handleCancel = () => {
    setIsAddService(false);
    setIsModal("");
    setSelectedElement({});
    setSelectedSubCatalog(null);
  };

  const getCatalog = async () => {
    const response = await getCatalogItem();
    if (response.remote === "success") {
      setCatalogItem([...response.data.data]);
      setFilteredCatalogItem([...response.data.data]);
      setSearch("a"); // force update
      setSearch(""); // force update
    }
    setTimeout(
      () =>
        setState({
          smallLoader: false,
        }),
      500
    );
  };

  React.useEffect(() => {
    getCatalog();
  }, [isUpdate]);

  React.useEffect(() => {
    const newElements = [];
    filtredCatalogItem.forEach((element) => {
      newElements.push({
        images: element.images,
        key: element._id,
        _id: element._id,
        name: element.name,
        price: element.price ? `$${element.price}  ${element.unit}` : "",
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
                <PlusCircleOutlined className="text-primary" />
              </Button>
            )}
            <Button
              type="text"
              shape="circle"
              className="me-2 d-inline-flex align-items-center justify-content-center"
              onClick={() => handleSelectedElement(element, "delete")}
            >
              <DeleteOutlined
                className="text-danger"
                // onClick={(e) => removeCatalogData(element._id)}
              />
            </Button>
            <Button
              type="text"
              shape="circle"
              className="d-inline-flex align-items-center justify-content-center"
              onClick={() => {
                handleSelectedElement(element, "edit");
                element.type === "subCatalog"
                  ? setTitle("Edit Sub Category")
                  : setTitle("Edit Item");
              }}
            >
              <EditOutlined
                className="text-primary"
                // onClick={handleEditCatalog}
              />
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
      className: "font-bold w-275",
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
          <Addelement
            handleCancel={handleCancel}
            handelUpdate={handelUpdate}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
          />
        );
      case "additem":
        return (
          <AddItem
            handleCancel={handleCancel}
            selectedSubCatalog={selectedSubCatalog}
            handelUpdate={handelUpdate}
            setSelectedSubCatalog={setSelectedSubCatalog}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
          />
        );

      default:
        return "";
    }
  };
  const filterCatalogItems = () => {
    const newCatalog = catalogItem.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase().trim());
    });
    setFilteredCatalogItem(newCatalog);
  };

  React.useEffect(() => {
    filterCatalogItems();
  }, [search]);

  return (
    <>
      <BreadcrumbBar
        name="Dashboard "
        subname="Estimates"
        subtitle="Catalog"
        breaclass="mb-3"
        link="/dashboard"
        sublink="estimating"
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
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                        />
                      </div>
                    </div>
                  </div>
                  {state.smallLoader ? (
                    <>
                      <div className="text-center d-flex align-items-center justify-content-center ht-100">
                        <span className="">
                          <SmallLoader />
                          <p className="mt-2">Loading Please Wait....</p>
                        </span>
                      </div>
                    </>
                  ) : (
                    <Table
                      bordered={false}
                      scroll={{ y: 700 }}
                      className="components-table-demo-nested  scroll-style "
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
                                onClick={() =>
                                  setSelectedSubCatalog(render._id)
                                }
                              >
                                <h1 className="font-16 mb-0 cursor-btn py-3">
                                  Add Item...
                                </h1>
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
                        rowExpandable: (element) =>
                          element.type === "subCatalog",
                        expandIcon: ({ expanded, onExpand, record }) => {
                          if (record.type === "subCatalog") {
                            return expanded ? (
                              <UpCircleFilled
                                className="font-24"
                                style={{ color: "#3483FA" }}
                                onClick={(e) => {
                                  onExpand(record, e);
                                }}
                              />
                            ) : (
                              <DownCircleFilled
                                className="font-24"
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
                                  <Image
                                    preview={{ visible: false }}
                                    src={record.images[0] || log}
                                    onClick={(rr = record.images) => {
                                      catalogItem.map((r) => {
                                        if (r._id === record.key) {
                                          setCurrentImages(r.images);
                                        }
                                      });
                                      setIsOpen(true);
                                    }}
                                    alt=""
                                  />
                                  <div>
                                    {isOpen && (
                                      <Lightbox
                                        mainSrc={
                                          currentImages[photoIndex] || log
                                        }
                                        nextSrc={
                                          currentImages[
                                            (photoIndex + 1) %
                                              currentImages.length
                                          ]
                                        }
                                        prevSrc={
                                          currentImages[
                                            (photoIndex +
                                              currentImages.length -
                                              1) %
                                              currentImages.length
                                          ]
                                        }
                                        onCloseRequest={() => setIsOpen(false)}
                                        onMovePrevRequest={() =>
                                          setPhotoIndex(
                                            (photoIndex +
                                              currentImages.length -
                                              1) %
                                              currentImages.length
                                          )
                                        }
                                        onMoveNextRequest={() =>
                                          setPhotoIndex(
                                            (photoIndex + 1) %
                                              currentImages.length
                                          )
                                        }
                                      />
                                    )}
                                  </div>
                                  {/* <div style={{ display: "none" }}>
                                    <Image.PreviewGroup
                                      preview={{
                                        visible,
                                        onVisibleChange: (vis) =>
                                          setVisible(vis),
                                      }}
                                    >
                                      {record.images.map((image, idx) => (
                                        <Image src={image} key={idx} alt="" />
                                      ))}
                                    </Image.PreviewGroup>
                                  </div> */}
                                </div>
                              </>
                            );
                          }
                        },
                      }}
                      dataSource={expandedRowRender}
                      pagination={false}
                    />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Services />
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
      <AddService
        title="Add Service"
        handleAddModal={handleAddModal}
        isAddService={isAddService}
        // isModal={isModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={575}
      />
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={selectedElement.action === "delete"}
        footer={null}
        closeIcon={<InfoCircleOutlined />}
      >
        <p>Are you sure you want to delete element ?</p>
        <span className="text-danger">{deleteErrors}</span>
        <Row>
          <Col md={12} className="text-center">
            <Button
              type="text"
              onClick={() => {
                setSelectedElement({});
                setDeleteErrors("");
              }}
              disabled={deleteing}
            >
              Cancel
            </Button>
          </Col>
          <Col md={12}>
            <Button
              type="link"
              onClick={handleRemoveElement}
              disabled={deleteing}
            >
              {deleteing ? "Deleting..." : "Delete"}
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
