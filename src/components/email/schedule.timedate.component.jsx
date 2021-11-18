import React from "react";
import { DatePicker, Space, Row, Col, Button } from "antd";
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
}

function onOk(value) {
  console.log("onOk: ", value);
}
export default function ScheduleTimeDate(props) {
  return (
    <>
      {" "}
      <h3>Schedule Email</h3>
      <Row style={{ height: "500px" }}>
        <Col md={24}>
          {" "}
          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
              open
            />
          </Space>
          ,
        </Col>
        <Col md={24}>
          <div className="text-right">
            <Button type="text" className="mr-1" onClick={props.handleCancel}>
              Cancel
            </Button>
            <Button type="primary" shape="round">
              Scheduled Send
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
