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
          <Menu.Item key="2" icon={crm}>
            <NavLink to="/crm">CRM</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={estimating}>
            <NavLink to="/estimating"> Estimating</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={jobOr}>
            <NavLink to="/job-organization">
              Job Organization & Scheduling
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={time}>
            <NavLink to="/time-tracking">Time Tracking</NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={job}>
            <NavLink to="/job-costing">Job Costing</NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={endJob}>
            <NavLink to="/end-of-job-process">End of job process</NavLink>
          </Menu.Item>
          <Menu.Item key="8" icon={invoice}>
            <NavLink to="/invoicing">Invoicing</NavLink>
          </Menu.Item>
          <Menu.Item key="9" icon={invoice}>
            <NavLink to="/change-orders">Change orders</NavLink>
          </Menu.Item>
          <Menu.Item key="10" icon={setting}>
            <NavLink to="/budgeting-and-settings">Budgeting & settings</NavLink>
          </Menu.Item>
          <Menu.Item key="11" icon={template}>
            <NavLink to="/template">Template</NavLink>
          </Menu.Item>
          <Menu.Item key="12" icon={calender}>
            <NavLink to="/calendar">Calendar</NavLink>
          </Menu.Item>
          <Divider style={{ margin: "10px 0px" }} />
          <Menu.Item key="13" icon={lead} className="no-color">
            <NavLink to="/customer-lead">New Lead</NavLink>
          </Menu.Item>
          <Menu.Item key="14" icon={add} className="no-color">
            <NavLink to="/add-task">Add Task</NavLink>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}
