import React, { useState } from "react";
import moment from "moment";
import {
  DatePicker,
  Input,
  Row,
  Col,
  Button,
  Divider,
  Calendar,
  Form,
} from "antd";
const { RangePicker } = DatePicker;

function onPanelChange(value, mode) {
  console.log(value, mode);
}
export default function ScheduleTimeDate(props) {
  const [ScheduleEmailSentState, setScheduleEmailSentState] = useState(false);
  const [state, setState] = useState({
    time: "",
    date: "",
  });
  var ScheduleEmailSent = () => {
    setScheduleEmailSentState(true);
    console.log("props: ", props);
    props.updateModel();
  };

  const handleAllChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <h3>Schedule Email</h3>
      <Divider />
      <Row style={{ height: "400px" }} className="time-date-main-div">
        <Col md={13}>
          <span>Pick Date & Time</span>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </Col>
        <Col md={2}></Col>
        <Col md={9}>
          <Form className="mt-4">
            <Form.Item name="username">
              <Input
                size="large"
                name="date"
                placeholder="12/11/21"
                id="date"
                defaultValue="12/11/21"
              />
            </Form.Item>

            <Form.Item name="username">
              <Input
                size="large"
                name="time"
                placeholder="12:30 PM"
                id="time"
                defaultValue="12:30 PM"
              />
            </Form.Item>
          </Form>
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
