import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../utils/routes";
import { Layout } from "antd";
import Menubar from "../components/navbar/menubar";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import Error from "../components/Error";
const { Header, Sider, Content } = Layout;
export default class Estimates extends Component {
  state = {
    collapsed: true,
    isHovered: false,
    sidebarProps: {},
  };

  componentDidMount() {
    this.setState({
      sidebarProps: {
        ...this.state.sidebarProps,
        collapsedWidth: 80,
        collapsible: true,
        collapsed: this.state.collapsed,
        onCollapse: this.onCollapse,
      },
    });
  }

  handleHover = (collapsed) => {
    this.setState({ collapsed: !this.state.collapsed }, () => {
      console.log(this.state.collapsed, "test");
      if (this.state.collapsed) {
        this.setState({
          sidebarProps: { width: 256, collapsed: this.state.collapsed },
        });
      } else {
        this.setState({
          sidebarProps: {
            ...this.state.sidebarProps,
            collapsedWidth: 80,
            collapsible: true,
            collapsed: this.state.collapsed,
            onCollapse: this.onCollapse,
          },
        });
      }
    });
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  // handleHover = () => {
  //   this.setState({
  //     isHovered: !this.state.isHovered,
  //   });
  // };
  render() {
    return (
      <>
        <Layout
          className="h-full"
          style={{ background: "#fff", minheight: "100vh" }}
        >
          <Sider
            trigger={null}
            {...this.state.sidebarProps}
            width="256"
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              background: "#fff",
              zIndex: "9999",
            }}
            // className="slide-shadow menu-fixed {btnclass}"
            className="slide-shadow"
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}
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
            <Content className="pt-64 px-4 pb-4 h-full">
              <Routes>
                {routes.map((route) => {
                  return <Route path={route.path} element={route.component} />;
                })}
                <Route path="*" element={<Error />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}
