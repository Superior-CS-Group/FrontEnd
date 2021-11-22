import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../utils/routes";
import { Layout } from "antd";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Menubar from "../components/navbar/menubar";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
const { Header, Sider, Content } = Layout;

export default class Estimates extends Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <div>
        <Layout style={{ background: "#fff", minheight: "100vh" }}>
          <Sider
            collapsedWidth={80}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              background: "#fff",
            }}
            className="slide-shadow"
          >
            <DashboardNavbar />
          </Sider>
          <Layout className="site-layout main-layout">
            <Header
              className="site-layout-background header-shadow d-flex align-items-center"
              style={{
                position: "fixed",
                zIndex: 999,
                width: "95%",
                padding: "5px 15px",
              }}
            >
              {/* {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )} */}
              <Menubar />
            </Header>
            <Content className="pt-64 px-4 pb-4">
              <Routes>
                {routes.map((route) => {
                  return <Route path={route.path} element={route.component} />;
                })}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
