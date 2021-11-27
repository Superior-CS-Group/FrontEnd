import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteCustomerLead } from "../../api/delete";

const { confirm } = Modal;

export default function DeleteModal(removeId, table, updateData) {
  confirm({
    title: "Do you Want to delete these items?",
    icon: <ExclamationCircleOutlined />,

    content: "Some descriptions",
    onOk() {
      if (table === "customerLead") {
        const body = { id: removeId };
        console.log("OK", body);
        deleteCustomerLead(body);
      }
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
