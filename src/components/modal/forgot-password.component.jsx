import React from "react";
import { Modal, Form, Input, Button, message } from "antd";

export default function ForgotPassword(props) {
  return (
    <>
      <Modal
        className="modal-radius"
        title="Forgot Password"
        visible={props.isModalForgot}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Email">
            <Input name="email" type="email" />
          </Form.Item>

          <div className="text-right">
            <Button onClick={props.handleCancel} className="radius-30 me-3">
              Cancel
            </Button>
            <Button type="primary" className="radius-30">
              Send
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
