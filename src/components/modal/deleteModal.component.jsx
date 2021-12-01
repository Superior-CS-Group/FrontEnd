import { Modal, Space, Row, Col, Button } from "antd";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { deleteCustomerLead } from "../../api/delete";

const { confirm } = Modal;
export default function DeleteModal(props, removeId, table, updateData) {
  // confirm({
  //   title: "Do you Want to delete these items?",
  //   icon: <ExclamationCircleOutlined />,
  //   content: "Some descriptions",
  //   onOk() {
  //     if (table === "customerLead") {
  //       const body = { id: removeId };
  //       console.log("OK", body);
  //       deleteCustomerLead(body);
  //     }
  //   },
  //   onCancel() {
  //     console.log("Cancel");
  //   },
  // });
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
                props.handleDeleteOk(
                  props.deleteId,
                  props.deleteIdx
                )
              }
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Modal>
      ;
    </>
  );
}
