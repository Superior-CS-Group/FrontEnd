import { Modal, Button, Space, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteCustomerLead } from "../../api/delete";

const { confirm } = Modal;
export default function DeleteModal(removeId, table, updateData, props) {
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

  <Modal
  // title="Warning!"
  // visible={props.showDeleteModal}
  // onCancel={props.handleDeleteClose}
  // onOk={props.handleDeleteOk}
  >
    {/* <p>{props.content}</p> */}
    <Row>
      <Col md={12}>
        <Button>Cancel</Button>
      </Col>
      <Col md={12}>
        <Button>Delete</Button>
      </Col>
    </Row>
  </Modal>;
}
