import React, { Component } from "react";
import { Breadcrumb } from "antd";
export default class BreadcrumbBar extends Component {
  render() {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="">{this.props.name}</a>
          </Breadcrumb.Item>

          <Breadcrumb.Item>{this.props.subname}</Breadcrumb.Item>
        </Breadcrumb>
      </>
    );
  }
}
