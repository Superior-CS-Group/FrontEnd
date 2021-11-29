import React from "react";
import { Modal } from "antd";
export default function ChangePasswordUser(props) {
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={props.isModalShowPassword}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
