import React, { useEffect, useState, Component } from "react";
import { Table, Checkbox, Button, Modal, Radio, Badge, Tooltip } from "antd";
import ReactDragListView from "react-drag-listview";
import { Datel, drag, edit } from "../../utils/svg.file";
// import Material from "./material.components";
// import Services from "./services.components";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../utils/fetchApi.js";
import { deleteCatalog } from "../../api/catalogue";
import { getUserList } from "../../api/admin.js";
import { LockOutlined } from "@ant-design/icons";
import ChangePasswordUser from "../modal/changePassword.component";
export default function UserTable(props) {
  const params = useParams();

  const [isModalShow, setIsModalShow] = useState(false);
  const [state, setState] = useState({
    columns: [
      // {
      //   title: <Checkbox />,
      //   dataIndex: "key",
      // },

      {
        title: (
          <>
            Company Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "companyName",
      },
      {
        title: (
          <>
            Email <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "email",
      },
      {
        title: (
          <>
            Currency <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "currency",
      },
      {
        title: (
          <>
            Time Zone <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "timeZone",
      },
      {
        title: (
          <>
            Date <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "cdate",
      },
      {
        title: "Status",
        dataIndex: "Status",
      },
    ],
  });

  // const that = state;
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const columns = [...state.columns];
      const item = columns.splice(fromIndex, 1)[0];
      columns.splice(toIndex, 0, item);
      setState({
        ...state,
        columns,
      });
    },
    nodeSelector: "th",
  };

  const deleteServiceHandleSubmit = async (id) => {
    // console.log(id);

    const body = {
      _id: id,
    };
    // console.log("body: ", body);
  };

  useEffect(() => {
    const data = [];

    const fetchData = async () => {
      const body = { type: "service" };
      const result = await postData(`services/list-by-type`, body);

      const result2 = await getUserList();
      console.log(result2.data, "result2   result2");

      for (let i = 0; i < result2.data.length; i++) {
        let catalogueData = result2.data[i];
        data.push({
          // key: <Checkbox />,

          companyName: catalogueData.companyName,
          email: catalogueData.email,
          currency: catalogueData.currency,
          timeZone: catalogueData.timeZone,
          cdate: catalogueData.createdAt.split("T")[0],
          Status: (
            <>
              <Badge
                className="cursor-btn site-badge-count-109 me-2"
                count="Activate"
                style={{ backgroundColor: "#52c41a" }}
              />
              <Tooltip title="Change Password">
                <LockOutlined
                  className="cursor-btn pass-key-btn"
                  onClick={showModalPassword}
                />
              </Tooltip>
            </>
          ),
        });
      }
      // console.log("data: ", data);
      setState({ ...state, data });
    };
    fetchData();
  }, [params]);

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const hideModal = () => {
    setState({
      visible: false,
    });
  };

  const showModalPassword = () => {
    setIsModalShow(true);
  };

  const handleOk = () => {
    setIsModalShow(false);
  };

  const handleCancel = () => {
    setIsModalShow(false);
  };
  return (
    <>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          className="ant-table-color"
          columns={state.columns}
          pagination={false}
          dataSource={state.data}
          bordered={false}
        />
      </ReactDragListView.DragColumn>
      <ChangePasswordUser
        showModalPassword={showModalPassword}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalShow={isModalShow}
      />
    </>
  );
}
