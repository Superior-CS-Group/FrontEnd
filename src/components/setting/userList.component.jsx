import React, { Component } from "react";
import { Button, Card, Select, Input, Modal, Radio } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import fillter from "../../images/fillter.png";

import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import UserTable from "./userTable.component";
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalVisible: false,
      visible: false,
      isMaterial: true,
      isProduct: true,
    };
  }

  showModal = () => {
    this.setState({ ModalVisible: true });
  };

  handleOk = () => {
    this.setState({ ModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ ModalVisible: false });
  };
  showModalNew = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <BreadcrumbBar name="User" subname="UserList" />
        </div>

        <Card
          bordered={false}
          className="card-depultview"
          bodyStyle={{ padding: "0px" }}
        >
          <div>
            <Nav className="catlog-tabs" as="ul">
              <Nav.Item as="li">
                <Nav.Link className="active">
                  <b class="left-curve"></b>
                  <b class="right-curve"></b>
                  UserList
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
          </div>
          <div className="p-3 card-shadow pe-4 ps-5">
            <div className="fillter d-lg-flex align-items-center">
              <div className="ms-auto col-lg-3">
                <Input
                  placeholder="Search by User "
                  text="search"
                  className="ant-search-button"
                  suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
                />
              </div>
            </div>
          </div>
          <div className="p-2">
            <UserTable />
          </div>
        </Card>
      </>
    );
  }
}
