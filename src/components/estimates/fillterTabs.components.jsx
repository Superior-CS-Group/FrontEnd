import React, { useState } from "react";

import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Select, Input } from "antd";
import fillter from "../../images/fillter.png";
import FilterSorting from "./filter/filter.sorting.component";
import { Nav } from "react-bootstrap";
export default function FillterTabs(props) {
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div>
        <Nav className="catlog-tabs" as="ul">
          <Nav.Item as="li">
            <Nav.Link className="active">
              <b class="left-curve"></b>
              <b class="right-curve"></b>
              {props.name}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <b class="left-curve"></b>
              <b class="right-curve"></b>
              <span>
                <PlusCircleOutlined style={{ fontSize: "18px" }} />
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="p-3 card-shadow pe-4 ps-5">
        <div className="fillter d-lg-flex align-items-center">
          <span
            className="inline-block me-5 fillter-btn cursor-btn"
            onClick={showModal}
          >
            <img src={fillter} className="me-3" alt="" /> Filter and Sort
          </span>
          <span className="inline-block me-4">
            <Select
              defaultValue="Filter"
              style={{ width: 150 }}
              onChange={handleChange}
            >
              <Option value="jack">Boulder</Option>
              <Option value="lucy">Lucy</Option>

              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </span>
          <span className="ant-blue-plus">
            <PlusCircleOutlined style={{ fontSize: "18px" }} className="me-2" />{" "}
            Add Column
          </span>

          <div className="ms-auto col-lg-3">
            <Input
              placeholder={props.placeholder}
              text="search"
              className="ant-search-button"
              suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
            />
          </div>
        </div>
      </div>
      <FilterSorting
        showModal={showModal}
        ModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
}
