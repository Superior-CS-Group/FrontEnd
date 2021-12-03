import { Modal, Row, Col, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
export default function DeleteModal(props, removeId, table, updateData) {
  return (
    <>
      <Modal
        className="modal-radius warning-modal"
        title="Warning!"
        visible={props.ShowDeleteModal}
        onCancel={props.handleDeleteClose}
        onOk={props.handleDeleteOk}
        deleteId={props.deleteId}
        deleteIdx={props.deleteIdx}
        footer={null}
        width={350}
        closeIcon={<InfoCircleOutlined />}
      >
        <p>{props.content}</p>
        <Row>
          <Col md={12} className="text-center">
            <Button type="text" onClick={props.handleDeleteClose}>
              Cancel
            </Button>
          </Col>
          <Col md={12}>
            <Button
              type="link"
              onClick={(e) =>
                props.handleDeleteOk(props.deleteId, props.deleteIdx)
              }
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
