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

  renderItem = () => {
    switch (this.state.toShow) {
      case "recipentList":
        return (
          <RecipientList
            updateModel={() => this.setState({ toShow: "timeDate" })}
          />
        );
      case "sendEmail":
        return <SimpleEMailSent />;

      case "timeDate":
        return (
          <ScheduleTimeDate
            updateModel={() => this.setState({ toShow: "scheduleemailsent" })}
          />
        );
      case "scheduleemailsent":
        return <ScheduleEmailSent />;
      default:
        return "";
    }
  };
  render() {
    const { Option } = Select;
    const menu = (
      <Menu>
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
              <li
                onClick={() => this.onChangeTab("still-interested")}
                className={this.state.tabShow ? "active" : ""}
              >
                Still interested? <MoreOutlined />
              </li>
              <li
                onClick={() => this.onChangeTab("template2")}
                className={!this.state.tabShow ? "active" : ""}
              >
                Template 2 <MoreOutlined />
              </li>
            </ul>
          </div>
          {this.state.tabShow === true ? (
            <div className="card-show pt-2 pb-3">
              <Form layout="vertical">
                <Form.Item name="Column" label="Email Subject">
                  <Input type="text" placeholder="Still Interested" />
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
                  <Col md={2}>
                    <span className="d-lg-flex align-items-center delete-div-mail">
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
                    <span className="d-lg-flex align-items-center delete-div-mail">
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
