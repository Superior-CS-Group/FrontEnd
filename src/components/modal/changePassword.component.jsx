import React from "react";
import { Modal, Form, Input, Button } from "antd";
export default function ChangePasswordUser(props) {
  return (
    <>
      <Modal
        className="modal-radius"
        title="Reset Password"
        visible={props.isModalShow}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="New Password" name="New Password ">
            <Input />
          </Form.Item>
          <Form.Item label="Confirm Password" name="Confirm Password">
            <Input />
          </Form.Item>
          <div className="text-right">
            <Button onClick={props.handleCancel} className="radius-30 me-3">
              Cancel
            </Button>
            <Button type="primary" className="radius-30">
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
