import React from "react";
import sticky from "../../images/sticky.png";
export default function ScheduleEmailSent() {
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
              <Button type="text" className="mr-1">
                Edit
              </Button>
              <Button type="primary" shape="round" onClick={props.handleCancel}>
                Close
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <ScheduleEmailSent />
    </>
  );
}
