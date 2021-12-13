import React from "react";
import { Button, Row, Col } from "antd";

import RecipentTable from "./recipient.table.component";
export default function RecipientList(props) {
  var ScheduleTimeDate = () => {
    console.log("props send: ", props);
    props.updateModel();
    /*--------------------API data-------------------*/
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
      <h5>Confirm the Email Recipeint’s List</h5>
      <Row>
        <Col md={24} className="pb-4">
          <RecipentTable />
        </Col>
        <Col md={24}>
          <div className="text-right">
            <Button type="text" className="mr-1" onClick={props.handleCancel}>
              Go Back
            </Button>
            <Button type="primary" shape="round" onClick={ScheduleTimeDate}>
              Confirm
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
