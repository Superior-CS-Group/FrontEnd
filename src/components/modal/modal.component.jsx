import React from "react";
import { Modal } from "antd";
export default function ModalMain(props) {
  return (
    <>
      <Modal
        width={700}
        className="modal-filter"
        visible={props.ModalVisible}
        // visible={props.recipientListState}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <div>{props.content}</div>
      </Modal>
    </>
  );
}
