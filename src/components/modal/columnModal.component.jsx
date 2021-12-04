import React from "react";
import { Modal, Checkbox, Button } from "antd";

export default function ColumnModal(props) {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <>
      <Modal
        title="Show Columns"
        className="modal-radius warning-modal"
        width={250}
        footer={null}
        visible={props.AddColumnShow}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <div style={{ textAlign: "left" }}>
          <Checkbox onChange={onChange} className="mx-2 mb-2">
            Column 1
          </Checkbox>
          <Checkbox onChange={onChange} className="mb-2">
            Column 2
          </Checkbox>
          <Checkbox onChange={onChange} className="mb-2">
            Column 3
          </Checkbox>
          <Checkbox onChange={onChange} className="mb-2">
            Column 4
          </Checkbox>
          <Checkbox onChange={onChange} className="mb-2">
            Column 5
          </Checkbox>
          <Checkbox onChange={onChange} className="mb-2">
            Column 6
          </Checkbox>
          <Checkbox onChange={onChange} className="mb-2">
            Column 7
          </Checkbox>
          <Checkbox onChange={onChange} className="mb-2">
            Column 8
          </Checkbox>
        </div>
        <div className="">
          <Button type="primary" className="radius-30 mt-3">
            Show Columns(s)
          </Button>
        </div>
      </Modal>
    </>
  );
}
