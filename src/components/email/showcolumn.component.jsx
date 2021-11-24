import { Divider, Row, Col, Button } from "antd";
import React from "react";
import globe from "../../images/globe.png";
export default function ShowColumn(props) {
  return (
    <>
      <div className="">
        <h4>Manage Column</h4>
        <Divider />
        <Row>
          <Col md={24}>
            <ul>
              <li></li>
              <li></li>
            </ul>
            
          </Col>

          <Col md={24}>
            <div className="text-right">
              <Button type="primary" shape="round" onClick={props.handleCancel}>
                Close
              </Button>
              <Button type="primary" shape="round">
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
