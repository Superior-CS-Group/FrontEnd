import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
export default class BreadcrumbBar extends Component {
  render() {
    return (
      <div className="breadcrumb-box-main">
        <a
          href={this.props.sublink}
          className="btn btn-primary text-white float-end d-inline-flex align-items-center mt-1"
        >
          <ArrowLeftOutlined style={{ fontSize: "20px" }} />
        </a>
        <Breadcrumb className={`ant-breadcrumb-text ${this.props.breaclass}`}>
          <Breadcrumb.Item>
            <a href={this.props.link}>{this.props.name}</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href={this.props.sublink}>{this.props.subname}</a>
          </Breadcrumb.Item>

          <Breadcrumb.Item className="be-none">
            {this.props.subtitle}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}
