import React, { useEffect, useState } from "react";
import { Table, Badge, Tooltip, Input, message, Switch } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag } from "../../utils/svg.file";
import { useParams, Navigate } from "react-router-dom";
import { postData } from "../../utils/fetchApi.js";
import { getUserList } from "../../api/admin.js";
import { updateCustomerStatus, updateIsAdminStatus } from "../../api/user.js";
import { LockOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import ChangePasswordUser from "../modal/changePassword.component";
import SmallLoader from "../loader/smallLoader.js";

export default function UserTable(props) {
  const params = useParams();
  const [userId, setUserId] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [state, setState] = useState({
    userId: "",
    smallLoader: true,
    isRedirect: false,
    message: "",
    columns: [
      {
        title: (
          <>
            Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "Name",
      },
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
            Contact No <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "contactNo",
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
      {
        title: "Is Admin",
        dataIndex: "userRole",
      },
    ],
    data: [],
    filtredData: [],
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

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const isAdminHandleSubmit = async (id) => {
    const body = { id: id };
    console.log(body);
    const result = await updateIsAdminStatus(body);
    message.success("IsAdmin Updated", 5);
  };

  const updateStatusHandle = async (id) => {
    const body = { id: id };
    const result = await updateCustomerStatus(body);
    let data2 = state.data.filter((item) => item._id === id);
    message.success("Status Updated", 5);
  };

  useEffect(() => {
    const data = [];

    const fetchData = async () => {
      const body = { type: "service" };
      await postData(`services/list-by-type`, body);

      const result2 = await getUserList();
      console.log(result2.data, "result2   result2");

      for (let i = 0; i < result2.data.length; i++) {
        let userData = result2.data[i];
        data.push({
          // key: <Checkbox />,

          _id: userData._id,
          Name: userData.name,
          companyName: userData.companyName,
          email: userData.email,
          contactNo: userData.contactNo,
          cdate: userData.createdAt.split("T")[0],
          Status: userData.activeStatus ? (
            <>
              <Badge
                className="cursor-btn site-badge-count-109 me-2"
                count="Approved"
                style={{ backgroundColor: "#52c41a" }}
                onClick={(e) => updateStatusHandle(userData._id)}
              />
              <Tooltip title="Reset Password">
                <LockOutlined
                  className="cursor-btn pass-key-btn"
                  onClick={(e) => showModalPassword(userData._id)}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Badge
                className="cursor-btn site-badge-count-109 me-2"
                count="Pending"
                onClick={(e) => updateStatusHandle(userData._id)}
              />
            </>
          ),

          userRole: userData.activeStatus ? (
            <>
              <div className="green-switch">
                <Switch
                  value={userData.isAdmin}
                  onChange={(e) => isAdminHandleSubmit(userData._id)}
                  className="me-2"
                  defaultChecked={userData.isAdmin}
                />
              </div>
            </>
          ) : (
            ""
          ),
        });
      }
      // console.log("data: ", data);
      setTimeout(
        () =>
          setState({ ...state, data, filtredData: data, smallLoader: false }),
        500
      );
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const showModalPassword = (id) => {
    setUserId(id);
    setIsModalShow(true);
  };

  const handleOk = () => {
    setIsModalShow(false);
  };

  const handleCancel = () => {
    setIsModalShow(false);
  };

  const changePasswordHandle = () => {
    console.log(userId, state.newPassword);
  };

  const handleFilterData = (e) => {
    const { value } = e.target;
    const filtredData = state.data.filter((item) => {
      return (
        item.companyName.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setState({ ...state, filtredData });
  };

  // if (state.isRedirect) {
  //   return <Navigate to="/userlist" />;
  // }
  return (
    <>
      {state.smallLoader ? (
        <>
          <div className="text-center d-flex align-items-center justify-content-center ht-100">
            <span className="">
              <SmallLoader />
              <p className="mt-2">Loading Please Wait....</p>
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="p-3 card-shadow pe-4 ps-5">
            <div className="fillter d-lg-flex align-items-center">
              <div className="ms-auto col-lg-3">
                <Input
                  placeholder="Search by User "
                  text="search"
                  className="ant-search-button"
                  suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
                  onChange={handleFilterData}
                />
              </div>
            </div>
          </div>
          <ReactDragListView.DragColumn {...dragProps}>
            <Table
              // className="ant-table-color"
              className="components-table-demo-nested ant-thead-block scroll-style"
              columns={state.columns}
              pagination={false}
              dataSource={state.filtredData}
              bordered={false}
            />
          </ReactDragListView.DragColumn>
        </>
      )}

      <ChangePasswordUser
        showModalPassword={showModalPassword}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalShow={isModalShow}
        userId={userId}
      />
    </>
  );
}
