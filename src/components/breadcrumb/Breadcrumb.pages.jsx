import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { LeftOutlined } from "@ant-design/icons";
export default class BreadcrumbBar extends Component {
  render() {
    return (
      <div className="breadcrumb-box-main">
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
        <a
          className="float-end btn btn-primary text-white back-btn p-1 px-2 ps-1"
          href={this.props.sublink}
        >
          <LeftOutlined className="me-1" /> Back
        </a>
      </div>
    );
  }
}
