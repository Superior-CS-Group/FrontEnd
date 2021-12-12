import React, { Component } from "react";
import { Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import BreadcrumbBar from "../breadcrumb/Breadcrumb.pages";
import { Nav } from "react-bootstrap";
import UserTable from "./userTable.component";

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
        <BreadcrumbBar
          name="Dashboard"
          subname="Settings"
          subtitle="User List"
          breaclass="mb-3"
          link="/"
        />

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

          <UserTable />
        </Card>
      </>
    );
  }
}
