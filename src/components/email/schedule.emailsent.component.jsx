import React, { useState } from "react";
import sticky from "../../images/sticky.png";
import { DatePicker, Space, Row, Col, Button, Divider } from "antd";
import ScheduleTimeDate from "./schedule.timedate.component";
export default function ScheduleEmailSent(props) {
  const [scheduleTimeDateState, setScheduleTimeDateState] = useState(false);
  var ScheduleTimeDate = () => {
    setScheduleTimeDateState(true);
    console.log("props send: ", props);
    props.updateModel();
  };
  return (
    <>
      <div className="">
        <h4>Email Sent</h4>
        <Divider />
        <Row>
          <Col md={24}>
            <div className="text-center mt-2">
              <h3>All Set!</h3>
              <img src={sticky} />

              <p className="mail-msg">
                Your mail will be sent on: <br />
                <b>November 8 at 9 a.m.</b>
              </p>
            </div>
            <div className="text-right">
              <Button type="text" className="mr-1" onClick={ScheduleTimeDate}>
                Edit
              </Button>
              <Button type="primary" shape="round" onClick={props.handleCancel}>
                Close
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* <ScheduleEmailSent /> */}
    </>
  );
}
