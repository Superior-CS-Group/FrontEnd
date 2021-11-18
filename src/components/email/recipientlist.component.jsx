import React, { Component, useState } from "react";
import {
  Button,
  Card,
  Select,
  Input,
  Modal,
  message,
  Radio,
  Row,
  Col,
  Form,
  Divider,
  Checkbox,
  DatePicker,
  Space,
} from "antd";
import {
  PlusCircleOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import RecipentTable from "./recipient.table.component";
import ScheduleTimeDate from "./schedule.timedate.component";
import ModalMain from "../modal/modal.component";
export default function RecipientList(props) {
  const [scheduleTimeDateState, setScheduleTimeDateState] = useState(false);
  var ScheduleTimeDate = () => {
    setScheduleTimeDateState(true);
    console.log("props: ", props);
    props.updateModel();
  };
  var handleCancel = () => {
    setScheduleTimeDateState(false);
  };
  var handleOk = () => {
    setScheduleTimeDateState(false);
  };

  return (
    <>
      <h5>Confirm the Email Recipeint’s List</h5>
      <Row>
        <Col md={24}>
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
