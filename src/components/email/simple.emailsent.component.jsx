import { Divider, Row, Col, Button } from "antd";
import React from "react";
import globe from "../../images/globe.png";
export default function SimpleEMailSent(props) {
  return (
    <>
      <div className="">
        <h4>Email Sent</h4>
        <Divider />
        <Row>
          <Col md={24}>
            <div className="text-center mt-2">
              <h3>Email Sent!</h3>
              <img src={globe} alt="" />

              <p className="mail-msg">
                <b>Congratulations!</b> Your email was sent <br />
                successfully and will be reaching your leads in seconds!
              </p>
            </div>
            <div className="text-right">
              <Button type="primary" shape="round" onClick={props.handleCancel}>
                Close
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
