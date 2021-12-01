import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Checkbox, Input, message, Skeleton } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag, Datel } from "../../utils/svg.file";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/fetchApi.js";
import DeleteModal from "../modal/deleteModal.component";
import { SearchOutlined } from "@ant-design/icons";
import FilterSorting from "./filter/filter.sorting.component";

import fillter from "../../images/fillter.png";
import { deleteCustomerLead } from "../../api/delete";

export default function Datatable(props) {
  const params = useParams();
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [deleteEstimateId, setdeleteEstimateId] = useState();
  const [deleteEstimateIdx, setdeleteEstimateIdx] = useState();
  const [estimateResults, setdestimateResults] = useState([]);
  const [state, setState] = useState({
    estimateResults: [],
    data: [],
    filteredData: [],
    columns: [
      {
        title: <Checkbox />,
        dataIndex: "key",
        width: 50,
      },

      {
        title: (
          <>
            Lead Added <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "date",
        width: 200,
      },
      {
        title: (
          <>
            Scheduled Date <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "scheduleDate",
        width: 200,
      },
      {
        title: (
          <>
            Customer Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "name",
        width: 200,
      },
      {
        title: (
          <>
            Email Id <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "email",
        width: 300,
      },
      {
        title: (
          <>
            Contact No <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "contactNo",
        width: 200,
      },
      {
        title: (
          <>
            Address <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "address",
        width: 200,
      },
      {
        title: (
          <>
            Softwere Follow Up <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "autoFollowUp",
        width: 200,
      },
      {
        title: (
          <>
            Estimate Sent <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonSent",
        width: 200,
      },
      {
        title: (
          <>
            Estimate No. <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimate No",
        width: 200,
      },
      {
        title: (
          <>
            Status <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonStatus",
        className: "text-green",
        width: 200,
      },
      {
        title: (
          <>
            Estimaiton Sent Date <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonSentDate",
        width: 300,
      },
      {
        title: (
          <>
            Days Took To Send Estimate{" "}
            <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "daysItTookToSendEstimate",
        width: 300,
      },
      {
        title: (
          <>
            Design <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "design",
        width: 200,
      },
      {
        title: (
          <>
            Design Paed <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "designPaid",
        width: 200,
      },
      {
        title: (
          <>
            Phone Follow Up <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "noOfPhoneFollowUp",
        width: 200,
      },
      {
        title: (
          <>
            Last Date Phone Follow Up{" "}
            <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "lastDatePhoneFollowUp",
        width: 300,
      },
      {
        title: (
          <>
            Email Follow Up <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "noOfEmailFollowUp",
        width: 200,
      },
      {
        title: (
          <>
            Last Date Email Follow Up{" "}
            <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "lastDateEmailFollowUp",
        width: 300,
      },
      {
        title: (
          <>
            Close Date <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonCloseDate",
        width: 200,
      },
      {
        title: "Action",
        dataIndex: "action",
        width: 100,
        fixed: "right",
        className: "text-center",
      },
    ],
    deleteEstimateId: "",
  });

  const [newEstimateData, setNewEstimateData] = useState([]);

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

  function handleAllChecked(e, id, name, email) {
    let newEstimateData1;
    console.log(e.target.checked, e.target);
    if (e.target.checked) {
      newEstimateData1 = {
        leadId: id,
        leadName: name,
        leadEmail: email,
      };

      setNewEstimateData([...newEstimateData, newEstimateData1]);
      console.log("newEstimateData", newEstimateData);
    } else {
      var newEstimateData2 = newEstimateData.filter(
        (item) => item.leadId !== id
      );
      setNewEstimateData([...newEstimateData2]);
    }
  }

  useEffect(() => {
    const data = [];
    const fetchData = async () => {
      const result = await getData(`estimation/upcoming-estimation`);
      setdestimateResults({
        estimateResults: result.data,
      });
      // console.log(estimateResults);

      for (let i = 0; i < result.data.Data.length; i++) {
        let estimateData = result.data.Data[i];
        // console.log(estimateData.autoFollowUp, "estimateData.autoFollowUp");
        let customerData = estimateData.customerLeadId;
        let followRemind;
        if (customerData[0].autoReminderEmail === true) {
          followRemind = "Yes";
        } else {
          followRemind = "No";
        }
        data.push({
          key: (
            <Checkbox
              onChange={(e) =>
                handleAllChecked(
                  e,
                  customerData[0]._id,
                  customerData[0].name,
                  customerData[0].email
                )
              }
            />
          ),
          action: (
            <>
              <span
                className="me-2 cursor-btn"
                onClick={(e) => {
                  DeleteModalEstimate(customerData[0]._id, i);
                }}
              >
                {Datel}
              </span>
            </>
          ),
          scheduleDate: customerData[0].scheduleDate,
          filterName: customerData[0].name,
          name: (
            <Link to={`/customer-lead/${customerData[0]._id}`}>
              {customerData[0].name}
            </Link>
          ),
          email: customerData[0].email,
          contactNo: customerData[0].contactNo,
          date: customerData[0].createdAt.split("T")[0],
          address: customerData[0].address,
          autoFollowUp: followRemind,
          estimaitonSent: estimateData.estimaitonSent ? "Yes " : "No",
          estimaitonStatus: customerData[0].estimaitonStatus,
          estimaitonSentDate: estimateData.estimaitonSentDate,
          daysItTookToSendEstimate: estimateData.daysItTookToSendEstimate,
          design: estimateData.design,
          designPaid: estimateData.designPaid,
          noOfPhoneFollowUp: estimateData.noOfPhoneFollowUp,
          lastDatePhoneFollowUp: estimateData.lastDatePhoneFollowUp,
          noOfEmailFollowUp: estimateData.noOfEmailFollowUp,
          lastDateEmailFollowUp: estimateData.lastDateEmailFollowUp,
          estimaitonCloseDate: estimateData.estimaitonCloseDate,
          _id: customerData[0]._id,
        });
      }
      // console.log("data: ", data);
      setState({ ...state, data, filteredData: data });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const filterData = (e) => {
    const { value } = e.target;
    console.log("value: ", value);
    const filteredData = state.data.filter((item) => {
      return item.filterName.toLowerCase().includes(value.toLowerCase());
    });
    console.log("filterData: ", filteredData);
    setState({ ...state, filteredData, filter: value });
  };
  const DeleteModalEstimate = (id, idx) => {
    setdeleteEstimateId(id);
    setdeleteEstimateIdx(idx);
    setShowDeleteModal(true);
    console.log("deleteIdx", idx);
  };
  const handleDeleteOk = (id, idx) => {
    console.log("deleteId", id, idx);
    const body = { id: id };
    setShowDeleteModal(false);
    // deleteCustomerLead(body)
    message.success("Data Deleted", 5);

    let restultData = estimateResults.estimateResults.Data;
    console.log(restultData);
    if (idx > -1) {
      restultData.splice(idx, 1);
    }
    console.log(restultData);
    setdestimateResults({ estimateResults: restultData });
  };
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <div className="p-3 card-shadow pe-4 ps-5">
        <div className="fillter d-lg-flex align-items-center">
          <span
            className="inline-block me-5 fillter-btn cursor-btn"
            onClick={showModal}
          >
            <img src={fillter} className="me-3" alt="" /> Filter and Sort
          </span>

          <div className="ms-auto col-lg-3">
            <Input
              placeholder="Search customers by name"
              text="search"
              className="ant-search-button"
              suffix={<SearchOutlined style={{ fontSize: "18px" }} />}
              onChange={filterData}
            />
          </div>
        </div>
      </div>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          columns={state.columns}
          pagination={false}
          dataSource={state.filteredData}
          bordered={false}
          className="ant-table-estmating scroll-style vertical-align"
          scroll={{ x: 400, y: 500 }}
        />
      </ReactDragListView.DragColumn>
      <DeleteModal
        DeleteModalEstimate={DeleteModalEstimate}
        ShowDeleteModal={ShowDeleteModal}
        handleDeleteClose={handleDeleteClose}
        handleDeleteOk={handleDeleteOk}
        deleteId={deleteEstimateId}
        deleteIdx={deleteEstimateIdx}
        content={<>Are you sure delete this item?</>}
      />

      <FilterSorting
        showModal={showModal}
        ModalVisible={ModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
}
