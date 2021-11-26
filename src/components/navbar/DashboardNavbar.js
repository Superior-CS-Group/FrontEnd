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
} from "../../utils/svg.file";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
export default class DashboardNavbar extends Component {
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
          <Menu.Item key="2" icon={crm} className="sidebar-btn-disable">
            <NavLink to="#">CRM</NavLink>
          </Menu.Item>
          {/* <Menu.Item key="3" icon={estimating}>
            <NavLink to="/estimating"> Estimating</NavLink>
          </Menu.Item> */}
          <SubMenu key="sub1" icon={estimating} title=" Estimating">
            <Menu.Item key="esn">
              {" "}
              <NavLink to="/new-catalog">New Catalog</NavLink>
            </Menu.Item>
            <Menu.Item key="es1">
              {" "}
              <NavLink to="/catalog">Catalog</NavLink>
            </Menu.Item>

            <Menu.Item key="es2">
              {" "}
              <NavLink to="/services"></NavLink>Service
            </Menu.Item>
            <Menu.Item key="es3">
              <NavLink to="/estimating">Estimation</NavLink>
            </Menu.Item>
            <Menu.Item key="es4">
              <NavLink to="/userlist">User List</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={jobOr} className="sidebar-btn-disable">
            <NavLink to="#">Job Organization & SchedulingS</NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={time} className="sidebar-btn-disable">
            <NavLink to="#">Time Tracking</NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={job} className="sidebar-btn-disable">
            <NavLink to="#">Job Costing</NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={endJob} className="sidebar-btn-disable">
            <NavLink to="#">End of job process</NavLink>
          </Menu.Item>
          <Menu.Item key="8" icon={invoice} className="sidebar-btn-disable">
            <NavLink to="#">Invoicing</NavLink>
          </Menu.Item>
          <Menu.Item key="9" icon={invoice} className="sidebar-btn-disable">
            <NavLink to="#">Change orders</NavLink>
          </Menu.Item>
          <Menu.Item key="10" icon={setting}>
            <NavLink to="/email-setting">Settings</NavLink>
          </Menu.Item>
          <Menu.Item key="11" icon={template} className="sidebar-btn-disable">
            <NavLink to="#">Template</NavLink>
          </Menu.Item>
          <Menu.Item key="12" icon={calender} className="sidebar-btn-disable">
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
          >
            <NavLink to="#">Add Task</NavLink>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}
