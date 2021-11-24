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

      /////
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ text: value });
  }
  handleChange(html) {
    this.setState({ editorHtml: html });
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
    this.setState({
      templateResults: result.data,
      templateData: result.data.Data,
    });
    // console.log("templateData:", this.state.templateData);
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
        return <SimpleEMailSent />;
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
    return (
      <>
        <div
          className="bg-white email-section-page"
          style={{ margin: "-1.5rem", padding: "1.5rem" }}
        >
          <h5>Mail</h5>
          <div className="tab-div-new-email">
            <ul className="">
              {this.state.templateData.map((datavalue) => {
                return (
                  <li
                    onClick={() => this.onChangeTab("still-interested")}
                    className={this.state.tabShow ? "active" : ""}
                  >
                    {datavalue.name} <MoreOutlined />
                  </li>
                );
              })}
            </ul>
          </div>
          {this.state.tabShow === true ? (
            <div className="card-show pt-2 pb-3">
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
                        onClick={() => this.setState({ toShow: "sendEmail" })}
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
            </div>
          ) : (
            <div className="card-show pt-2 pb-3">
              {" "}
              <Form layout="vertical">
                <Form.Item name="Column" label="Email Subject">
                  <Input type="text" placeholder="Template 2" />
                </Form.Item>
                <Form.Item label="Description">
                  <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
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
                        onClick={() => this.setState({ toShow: "sendEmail" })}
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
                    <span className=" text-right delete-div-mail">
                      <MoreOutlined />
                      <DeleteOutlined />
                    </span>
                  </Col>
                </Row>
              </Form>
            </div>
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
