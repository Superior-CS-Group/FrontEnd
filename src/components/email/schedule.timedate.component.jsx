import React, { useState } from "react";
import moment from "moment";
import { DatePicker, Space, Row, Col, Button, Divider } from "antd";
const { RangePicker } = DatePicker;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}
export default function ScheduleTimeDate(props) {
  const [ScheduleEmailSentState, setScheduleEmailSentState] = useState(false);
  var ScheduleEmailSent = () => {
    setScheduleEmailSentState(true);
    console.log("props: ", props);
    props.updateModel();
  };
  return (
    <>
      {" "}
      <h3>Schedule Email</h3>
      <Row style={{ height: "400px" }}>
        <Col md={24}>
          {" "}
          <Space direction="vertical" size={12}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Space>
        </Col>
        <Col md={24}>
          <div className="text-right">
            <Button type="text" className="mr-1" onClick={props.handleCancel}>
              Cancel
            </Button>
            <Button type="primary" shape="round" onClick={ScheduleEmailSent}>
              Scheduled Send
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
