import React, { Component } from "react";
import { Menu, Divider } from "antd";
import {
  dashboard,
  crm,
  estimating,
  job,
  jobOr,
  time,
  endJob,
  invoice,
  setting,
  template,
  calender,
  lead,
  add,
  dot,
} from "../../utils/svg.file";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
export default class DashboardNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "",
    };
  }

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isToken: true });
    } else {
      this.setState({ isToken: false });
    }
  };

  render() {
    return (
      <>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="ant-siderbar-menu"
        >
          <Menu.Item key="1" icon={dashboard}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={crm}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">CRM</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={estimating}>
            <NavLink to="/estimating">Estimate Dashboard</NavLink>
          </Menu.Item>

          <Menu.Item
            key="4"
            icon={jobOr}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">Job Organization & Scheduling</NavLink>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={time}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">Time Tracking</NavLink>
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={job}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">Job Costing</NavLink>
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={endJob}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">End of job process</NavLink>
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={invoice}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">Invoicing</NavLink>
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={invoice}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">Change orders</NavLink>
          </Menu.Item>

          <SubMenu key="sub1" icon={setting} title="Settings" className="ps-0">
            <Menu.Item key="email">
              <NavLink to="/email-setting">
                <span className="me-2 dot-align">{dot}</span> Email Settings
              </NavLink>
            </Menu.Item>
            <Menu.Item key="esn">
              <NavLink to="/catalog">
                <span className="me-2 dot-align">{dot}</span> Catalog
              </NavLink>
            </Menu.Item>

            <Menu.Item key="es2">
              <NavLink to="/estimate-templates">
                <span className="me-2 dot-align">{dot}</span> Estimate Templates
              </NavLink>
            </Menu.Item>

            <Menu.Item key="es3">
              <NavLink to="/userlist">
                <span className="me-2 dot-align">{dot}</span> User List
              </NavLink>
            </Menu.Item>

            <Menu.Item key="es4">
              <NavLink to="/company-settings">
                <span className="me-2 dot-align">{dot}</span> Company Settings
              </NavLink>
            </Menu.Item>
            <Menu.Item key="es7">
              <NavLink to="/production-rates">
                <span className="me-2 dot-align">{dot}</span> Production Rates
              </NavLink>
            </Menu.Item>

            <Menu.Item key="es6">
              <NavLink to="/payment-terms">
                <span className="me-2 dot-align">{dot}</span> Payment Terms
              </NavLink>
            </Menu.Item>
            <Menu.Item key="es5">
              <NavLink to="/term-and-conditions">
                <span className="me-2 dot-align">{dot}</span> Term And
                Conditions
              </NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="11"
            icon={template}
            className="sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">Template</NavLink>
          </Menu.Item>
          <Menu.Item
            key="12"
            icon={calender}
            className="sidebar-btn-disable"
            disabled
          >
            {/* <NavLink to="/calendar">Calendar</NavLink> */}
            <NavLink to="#">Calendar</NavLink>
          </Menu.Item>
          <Divider style={{ margin: "10px 0px" }} />
          <Menu.Item key="13" icon={lead} className="no-color sidebar-btn">
            <NavLink to="/customer-lead">New Lead</NavLink>
          </Menu.Item>
          <Menu.Item
            key="14"
            icon={add}
            className="no-color sidebar-btn sidebar-btn-disable"
            disabled
          >
            <NavLink to="#">Add Task</NavLink>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}
