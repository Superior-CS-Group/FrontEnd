import React, { Component } from "react";
import { Breadcrumb } from "antd";
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
        <a className="float-end btn btn-primary text-white back-btn" href={this.props.sublink}>
          Back
        </a>
      </div>
    );
  }
}
