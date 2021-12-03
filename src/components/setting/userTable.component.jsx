import React, { useEffect, useState } from "react";
import { Table, Badge, Tooltip, Input } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag } from "../../utils/svg.file";
import { useParams } from "react-router-dom";
import { postData } from "../../utils/fetchApi.js";
import { getUserList } from "../../api/admin.js";
import { LockOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import ChangePasswordUser from "../modal/changePassword.component";
import SmallLoader from "../loader/smallLoader.js";

export default function UserTable(props) {
  const params = useParams();

  const [isModalShow, setIsModalShow] = useState(false);
  const [state, setState] = useState({
    smallLoader: true,
    columns: [
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

  useEffect(() => {
    const data = [];

    const fetchData = async () => {
      const body = { type: "service" };
      await postData(`services/list-by-type`, body);

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
              <Badge
                className="cursor-btn site-badge-count-109 me-2"
                count="Deactivate"
              />
              <Tooltip title="Reset Password">
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
      setTimeout(
        () =>
          setState({ ...state, data, filtredData: data, smallLoader: false }),
        1000
      );
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const showModalPassword = () => {
    setIsModalShow(true);
  };

  const handleOk = () => {
    setIsModalShow(false);
  };

  const handleCancel = () => {
    setIsModalShow(false);
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
      />
    </>
  );
}
