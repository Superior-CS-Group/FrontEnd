import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Checkbox, Input } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag, Datel } from "../../../utils/svg.file";
import { useParams } from "react-router-dom";
import { getData } from "../../../utils/fetchApi";
import DeleteModal from "../../modal/deleteModal.component";
import { SearchOutlined } from "@ant-design/icons";

import fillter from "../../../images/fillter.png";

export default function EstimationList(props) {
  const params = useParams();
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [ListShowPreview, setListShowPreview] = useState(false);

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
            Customer Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "name",
        width: 200,
      },
      {
        title: (
          <>
            Estimation No <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "Estimation No",
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
        title: "Action",
        dataIndex: "action",
        width: 100,
        fixed: "right",
        className: "text-center",
      },
    ],
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
  const handleShowEstimatePreview = () => {
    setListShowPreview(true);
  };
  useEffect(() => {
    const data = [];
    const fetchData = async () => {
      const result = await getData(`estimation/upcoming-estimation`);
      setState({
        estimateResults: result.data,
      });
      console.log(result.data.Data);

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
                  DeleteModalEstimate(customerData[0]._id, "customerLead");
                }}
              >
                {Datel}
              </span>
            </>
          ),
          filterName: customerData[0].name,
          name: (
            <Link
              to={`/customer-lead/${customerData[0]._id}`}
              onClick={handleShowEstimatePreview}
            >
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
  const DeleteModalEstimate = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteOk = () => {
    setShowDeleteModal(false);
  };
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };
  return (
    <>
      <div className="card-shadow p-2">
        <div className="p-3 card-shadow pe-4 ps-5">
          <div className="fillter d-lg-flex align-items-center">
            {/* <span
              className="inline-block me-5 fillter-btn cursor-btn"
              // onClick={this.showModal}
            >
              <img src={fillter} className="me-3" alt="" /> Filter and Sort
            </span> */}

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
            className="ant-table-estmating scroll-style"
            scroll={{ x: 400, y: 500 }}
          />
        </ReactDragListView.DragColumn>
        <DeleteModal
          DeleteModalEstimate={DeleteModalEstimate}
          ShowDeleteModal={ShowDeleteModal}
          handleDeleteClose={handleDeleteClose}
          handleDeleteOk={handleDeleteOk}
          content={<>You are about to delete all the Service</>}
        />
      </div>
    </>
  );
}
