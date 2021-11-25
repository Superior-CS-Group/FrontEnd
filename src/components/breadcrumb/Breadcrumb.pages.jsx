import React, { Component } from "react";
import { Breadcrumb } from "antd";
export default class BreadcrumbBar extends Component {
  render() {
    return (
      <>
        <Breadcrumb className={`ant-breadcrumb-text ${this.props.breaclass}`}>
          <Breadcrumb.Item>
            <a href="#">{this.props.name}</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="#">{this.props.subname}</a>
          </Breadcrumb.Item>

          <Breadcrumb.Item>{this.props.subtitle}</Breadcrumb.Item>
        </Breadcrumb>
      </>
    );
  }
}
