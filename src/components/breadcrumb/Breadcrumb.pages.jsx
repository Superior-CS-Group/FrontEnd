import React from "react";
import { Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
export default function BreadcrumbBar(props) {
  const navigator = useNavigate();
  return (
    <div className="breadcrumb-box-main">
      <span
        className="btn btn-primary text-white float-end d-inline-flex align-items-center mt-1"
        onClick={() => navigator(-1)}
      >
        <ArrowLeftOutlined style={{ fontSize: "20px" }} />
      </span>
      <Breadcrumb className={`ant-breadcrumb-text ${props.breaclass}`}>
        <Breadcrumb.Item>
          <Link to={props.link || "/dashboard"}>{props.name}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={props.sublink || "/"}>{props.subname}</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item className="be-none">{props.subtitle}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
