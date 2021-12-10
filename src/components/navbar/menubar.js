import React, { Component } from "react";
import logo from "../../images/mount-sky.png";
import { Button, Menu, Badge, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import { Help, notifation, Message } from "../../utils/svg.file";
import { DownOutlined } from "@ant-design/icons";
import userProfile from "../../images/profile-top.png";
import { getCurrentUser } from "../../api/user";
export default class Menubar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
    };
  }
  componentDidMount = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser.remote === "success") {
      console.log("currentUser: ", currentUser.data);
      this.setState({ currentUser: currentUser.data });
    }
  };

  logout = async () => {
    localStorage.clear();

    window.location = "/auth";
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/user-profile">Profile</Link>
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item key="3" onClick={this.logout}>
          Log Out
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <div className="d-lg-flex align-items-center">
          <div className="logo me-5">
            <img src={logo} alt="" />
          </div>
          <h1 className="mb-0 dash-titile">
            Welcome, <span>{this.state.currentUser.name}!</span>
          </h1>
        </div>
        <div className="ms-auto d-lg-flex align-items-center">
          {this.state.currentUser.isAdmin && (
            <Button
              type="primary"
              className="radius-30 ant-primary-btn px-5 height-39 font-15 font-bold me-lg-5"
            >
              Admin
            </Button>
          )}
          <div className="rightside">
            <Menu mode="horizontal">
              <li>
                <Link to="/help">{Help}</Link>
              </li>
              <li>
                <Link to="/message">{Message}</Link>
              </li>
              <li>
                <Link to="/notification">
                  <Badge className="ant-badge-blue">{notifation}</Badge>
                </Link>
              </li>
              <li>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  className="d-block"
                >
                  <span onClick={(e) => e.preventDefault()}>
                    <Avatar src={userProfile} /> <DownOutlined />
                  </span>
                </Dropdown>
              </li>
            </Menu>
          </div>
        </div>
      </>
    );
  }
}
