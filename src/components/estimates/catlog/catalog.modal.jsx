import React, { useState } from "react";
import { Modal } from "antd";
export default function CataLogModal(props) {
  return (
    <>
      <Modal
        title={props.title}
        visible={props.isModal}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={false}
        width={props.width}
      >
        {props.content}
      </Modal>
    </>
  );
}
