import React, { useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Input, Table, Button, Image, message } from "antd";
import { Nav, Tab } from "react-bootstrap";
import {
  PlusCircleOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  UpCircleFilled,
  DownCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import SmallLoader from "../../loader/smallLoader";
import CataLogModal from "./catalog.modal";
import Addelement from "./add.element";
import AddItem from "./add.item";
import log from "../../../images/placeholder.jpg";
import DeleteModal from "../../modal/deleteModal.component";
import {
  getCatalogItem,
  getVariationItem,
  getVariationsByCatalogId,
  removeCatalog,
} from "../../../api/catalogue";
import CatalogServices from "./catalog.services";
import AddService from "./addService.component";
import EditItem from "./edit.item";
import Services from "./services/services.component";

export default function Catlog() {
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [ListShowPreview, setListShowPreview] = useState(false);
  const [deleteCatelogId, setdeleteCatelogId] = useState();
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
  const [IsEditData, setIsEditData] = useState(false);
  const [IsAddData, setIsAddData] = useState(false);
  const [variationName, setVariationName] = useState("");
  const [variationPrice, setVariationPrice] = useState("");
  const [variationUnit, setVariationUnit] = useState("");
  const [selectedVariation, setSelectedVariation] = useState({});
  const [state, setState] = useState({
    smallLoader: true,
  });
  const handleAddModal = () => {
    setIsAddService(true);
  };
  const handleEditModal = async (id) => {
    console.log(id, "idddddddd");
    const body = { id: id };
    const getVariationData = await getVariationItem(body);
    setVariationName(getVariationData.data.data.name);
    setVariationPrice(getVariationData.data.data.price);
    setVariationUnit(getVariationData.data.data.unit);
    setdeleteCatelogId(getVariationData.data.data._id);
    console.log(getVariationData, "getVariationData");
    // setIsAddData(true);
    console.log(variationName, "VariationName");
    setIsModal("additem");
    setTitle("Edit Item");
  };
  const [visible, setVisible] = useState(false);
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
                <div className="ant-catalog-img me-3">
                  <Image
                    preview={{ visible: false }}
                    src={log}
                    onClick={() => setVisible(true)}
                    alt=""
                  />
                  <div style={{ display: "none" }}>
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
                  </div>
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
                shape="circle"
                className="d-inline-flex align-items-center justify-content-center"
                onClick={(e) => handleEditModal(variation._id)}
                // onClick={(e) => {
                //   setIsModal("additem",variation._id);
                //   setTitle("Add Item");
                // }}
              >
                <EditOutlined className="text-primary" />
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
    setIsAddService(false);
    setIsEditData(false);
  };

  const handleCancel = () => {
    setIsAddService(false);
    setIsModal("");
    setIsEditData(false);
  };

  const getCatalog = async () => {
    const response = await getCatalogItem();
    if (response.remote === "success") {
      setCatalogItem(response.data.data);
      setFilteredCatalogItem(response.data.data);
    }
    setTimeout(
      () =>
        setState({
          smallLoader: false,
        }),
      1000
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
            >
              <DeleteOutlined
                className="text-danger"
                onClick={(e) => removeCatalogData(element._id)}
              />
            </Button>
            <Button
              type="text"
              shape="circle"
              className="d-inline-flex align-items-center justify-content-center"
            >
              <EditOutlined className="text-primary" />
            </Button>
          </>
        ),
      });
    });
    setExpandedRowRender(newElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredCatalogItem.length]);

  const removeCatalogData = async (id) => {
    setdeleteCatelogId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteOk = (id) => {
    console.log("deleteId", id);
    const body = { id: id };
    setShowDeleteModal(false);
    const response = removeCatalog(body);

    if (response.remote === "success") {
    }
    message.success("Data Deleted", 5);
    setShowDeleteModal(false);
  };
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

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
          <Addelement handleCancel={handleCancel} handelUpdate={handelUpdate} />
        );
      case "additem":
        return (
          <AddItem
            handleCancel={handleCancel}
            selectedSubCatalog={selectedSubCatalog}
            // IsAddData={IsAddData}
            handelUpdate={handelUpdate}
            setSelectedSubCatalog={setSelectedSubCatalog}
            itemDetails={{
              CatelogId: deleteCatelogId,
              name: variationName,
              price: variationPrice,
              unit: variationUnit,
            }}
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
                                  Add Item..
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
                                    onClick={() => setVisible(true)}
                                    alt=""
                                  />
                                  <div style={{ display: "none" }}>
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
                                  </div>
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
      <EditItem
        title={title}
        handleEditModal={handleEditModal}
        IsEditData={IsEditData}
        deleteId={deleteCatelogId}
        variationName={variationName}
        variationPrice={variationPrice}
        variationUnit={variationUnit}
        // isModal={isModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={575}
      />
      <DeleteModal
        DeleteModalEstimate={removeCatalogData}
        ShowDeleteModal={ShowDeleteModal}
        handleDeleteClose={handleDeleteClose}
        handleDeleteOk={handleDeleteOk}
        deleteId={deleteCatelogId}
        content={<>Do you real want to delete?</>}
      />
    </>
  );
}
