import React, { Component } from "react";
import {
  MoreOutlined,
  DownOutlined,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Form, Input, Row, Col, Select, Menu, Dropdown, Button } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RecipientList from "./recipientlist.component";
import ModalMain from "../modal/modal.component";
import SimpleEMailSent from "./simple.emailsent.component";
import ScheduleTimeDate from "./schedule.timedate.component";
import ScheduleEmailSent from "./schedule.emailsent.component";
import { getData } from "../../utils/fetchApi";
import { Card, Table } from "antd";
import { Nav, Tab } from "react-bootstrap";
import SmallLoader from "../loader/smallLoader";
export default class EmailSend extends Component {
  constructor(props) {
    super();
    this.state = {
      size: "large",
      tabShow: true,
      editorHtml: "",
      ModalVisible: false,
      recipientListState: false,
      toShow: "",
      templateData: [],
      smallLoader: true,
      value: "",
      /////
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ text: value });
  }
  // handleNew = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  //   console.log(event.target.value, "value");
  // };
  handleChange(html) {
    this.setState({ editorHtml: html });
    console.log(this.state.editorHtml, "thierhitheith");
  }
  onChangeTab = (val) => {
    if (val === "still-interested") {
      this.setState({
        tabShow: true,
      });
    } else if (val === "template2") {
      this.setState({
        tabShow: false,
      });
    } else {
      console.log(null);
    }
  };

  showModal = () => {
    this.setState({ ModalVisible: true });
  };
  mainModalShow = () => {
    this.setState({ ModalVisible: true });
    return <ModalMain content={<RecipientList />} />;
    // alert("email simple show");
  };
  ScheduleTimeDate = () => {
    this.setState({ scheduleTimeDateState: true });
  };
  recipientList = () => {
    this.setState({ ModalVisible: true });
    // return <ModalMain content={<RecipientList />} />;
  };
  // handleOk = () => {
  //   this.setState({ ModalVisible: false });
  //   return
  //     <ModalMain content={}  />

  // };

  handleCancel = () => {
    this.setState({ ModalVisible: false });
    this.setState({ recipientListState: false });
  };

  componentDidMount = async () => {
    const result = await getData(`email-template/list`);
    setTimeout(
      () =>
        this.setState({
          templateResults: result.data,
          templateData: result.data.Data,
          smallLoader: false,
        }),
      1000
    );
    console.log("templateData:", this.state.templateData.length);
  };

  renderItem = () => {
    switch (this.state.toShow) {
      case "recipentList":
        return (
          <RecipientList
            updateModel={() => this.setState({ toShow: "timeDate" })}
            handleCancel={() => this.setState({ toShow: "" })}
          />
        );
      // case "sendEmail":
      //   return <SimpleEMailSent />;
      case "sendEmail":
        return (
          <RecipientList
            updateModel={() => this.setState({ toShow: "simpleSendEmail" })}
            handleCancel={() => this.setState({ toShow: "" })}
          />
        );
      case "timeDate":
        return (
          <ScheduleTimeDate
            updateModel={() => this.setState({ toShow: "scheduleemailsent" })}
          />
        );
      case "simpleSendEmail":
        return (
          <SimpleEMailSent handleCancel={() => this.setState({ toShow: "" })} />
        );
      case "scheduleemailsent":
        return (
          <ScheduleEmailSent
            handleCancel={() => this.setState({ toShow: "" })}
            updateModel={() => this.setState({ toShow: "timeDate" })}
          />
        );
      default:
        return "";
    }
  };
  render() {
    const { Option } = Select;
    const menu = (
      <Menu className="dropdown-div-mail">
        <Menu.Item
          key="3"
          onClick={() => this.setState({ toShow: "recipentList" })}
        >
          Schedule Send <SendOutlined />
        </Menu.Item>
      </Menu>
    );

    const handleTabData = () => {
      console.log("check new new ewn");
    };
    return (
      <>
        <div
          className="bg-white email-section-page"
          style={{ margin: "-1.5rem", padding: "1.5rem" }}
        >
          <h5>Mail</h5>

          {this.state.smallLoader ? (
            <>
              <div className="text-center d-flex align-items-center justify-content-center ht-100">
                <span className="">
                  <SmallLoader />
                  <p className="mt-2">Loading Please Wait....</p>
                </span>
              </div>
            </>
          ) : (
            <>
              {this.state.templateData.length === 0 ? (
                <>
                  <div className="text-center">No Email Template Available</div>
                </>
              ) : (
                <>
                  {" "}
                  <Card
                    bordered={false}
                    className="radius-9"
                    bodyStyle={{ padding: "0px" }}
                  >
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey={this.state.templateData[0]?._id}
                    >
                      <Nav className="catlog-tabs" as="ul">
                        {this.state.templateData.map((datavalue, i) => {
                          return (
                            <Nav.Item as="li">
                              <Nav.Link
                                eventKey={datavalue._id}
                                onClick={(e) => {
                                  handleTabData(datavalue._id, i);
                                  console.log(datavalue._id, "this is id");
                                }}
                              >
                                <b class="left-curve"></b>
                                <b class="right-curve"></b>
                                {datavalue.name} <MoreOutlined />
                              </Nav.Link>
                            </Nav.Item>
                          );
                        })}
                        {/* <Nav.Item as="li">
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
                </Nav.Item> */}
                      </Nav>
                      <div className="p-3 card-shadow ">
                        <Tab.Content className="mt-2">
                          {/* <Tab.Pane eventKey="first">
                    {" "}
                    <Form layout="vertical">
                      {this.state.templateData.map((datavalue) => {
                        // console.log(datavalue, "values");
                        return (
                          <>
                            <Form.Item name="Column" label="Email Subject">
                              <Input
                                type="text"
                                onChange={this.handleChange}
                                value={datavalue.subject}
                                placeholder="Still Interested"
                              />
                            </Form.Item>
                            <Form.Item label="Description">
                              <ReactQuill
                                onChange={this.handleChange}
                                value={datavalue.bodyPart}
                                bounds={".app"}
                                placeholder={this.props.placeholder}
                              />
                            </Form.Item>
                          </>
                        );
                      })}
                      <Row>
                        <Col md={2}>
                          {" "}
                          <span className="d-lg-flex align-items-center mail-send-button">
                            <Button
                              type="primary"
                              size="middle"
                              onClick={() =>
                                this.setState({ toShow: "sendEmail" })
                              }
                            >
                              Send
                            </Button>
                            <Dropdown overlay={menu} trigger={["click"]}>
                              <a
                                className="ant-dropdown-link"
                                onClick={(e) => e.preventDefault()}
                              >
                                &nbsp;
                                <DownOutlined />
                              </a>
                            </Dropdown>
                          </span>          
                        </Col>
                        <Col md={20}></Col>
                        <Col md={2} className="text-right">
                          <span className="text-right delete-div-mail">
                            <MoreOutlined />
                            <DeleteOutlined />
                          </span>
                        </Col>
                      </Row>
                    </Form>
                  </Tab.Pane> */}
                          {this.state.templateData.map((datavalue) => {
                            // console.log(datavalue, "values");
                            return (
                              <>
                                <Tab.Pane eventKey={datavalue._id}>
                                  <Form layout="vertical">
                                    <Form.Item label="Email Subject">
                                      <Input
                                        name="subject"
                                        type="text"
                                        onChange={this.handleChange}
                                        defaultValue={datavalue.subject}
                                        placeholder="Still Interested"
                                      />
                                    </Form.Item>
                                    <Form.Item label="Description">
                                      <ReactQuill
                                        onChange={this.handleChange}
                                        defaultValue={datavalue.bodyPart}
                                        bounds={".app"}
                                        placeholder={this.props.placeholder}
                                      />
                                    </Form.Item>

                                    <Row>
                                      <Col md={2}>
                                        {" "}
                                        <span className="d-lg-flex align-items-center mail-send-button">
                                          <Button
                                            type="primary"
                                            size="middle"
                                            onClick={() =>
                                              this.setState({
                                                toShow: "sendEmail",
                                              })
                                            }
                                          >
                                            Send
                                          </Button>
                                          <Dropdown
                                            overlay={menu}
                                            trigger={["click"]}
                                          >
                                            <a
                                              className="ant-dropdown-link"
                                              onClick={(e) =>
                                                e.preventDefault()
                                              }
                                            >
                                              &nbsp;
                                              <DownOutlined />
                                            </a>
                                          </Dropdown>
                                        </span>
                                      </Col>
                                      <Col md={20}></Col>
                                      <Col md={2} className="text-right">
                                        <span className="text-right delete-div-mail">
                                          <MoreOutlined />
                                          <DeleteOutlined />
                                        </span>
                                      </Col>
                                    </Row>
                                  </Form>
                                </Tab.Pane>{" "}
                              </>
                            );
                          })}
                          <Tab.Pane eventKey="three">
                            Comming Soon Packages
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </Tab.Container>
                  </Card>
                </>
              )}
            </>
          )}
        </div>

        <ModalMain
          content={this.renderItem()}
          handleCancel={() => this.setState({ toShow: "" })}
          ModalVisible={this.state.toShow}
        />
      </>
    );
  }
}
