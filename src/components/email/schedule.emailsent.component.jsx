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

    var axios = require("axios");

    var data = JSON.stringify({
      estimateId: ["61922504c5f1c17970c97634", "61922504c5f1c17970c97634"],
      customerLeadId: ["619743070b02cdbe1dedfb8a", "6195fce7f8a35249b02d246d"],
      emailTemplateId: "Estimate Template",
      estimaitonScheduleDate: "2021-11-23T18:14",
    });

    var config = {
      method: "post",
      url: "http://digimonk.net:1629/api/estimation/sent-estimate",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThjZGM5ZjQ0MGE1YzY0MWUwYTI3M2IiLCJlbWFpbCI6ImFkbWluQG9uZXBlcmNlbnRjcm0uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NjIzMjg2LCJleHAiOjE2NjgxODAyMTJ9.YWUaTHpsKkjMFJe44BX5D7fLDXz4Omard3pz6J5l0fo",
        "Content-Type": "application/json",
        Cookie:
          "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTRhMGE1YTNjY2VmMjMwOGVlZjVjNCIsImlhdCI6MTYzNTU4ODAxMSwiZXhwIjoxNjQzMzY0MDExfQ.MLQGmFDL8r9CVUi_EuP-9DiiWr195YwV0Y_z5aVYgkY",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response, "check data"));
      })
      .catch(function (error) {
        console.log(error, "main error");
      });
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
