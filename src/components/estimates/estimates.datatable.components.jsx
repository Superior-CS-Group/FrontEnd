import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Checkbox, Input, message, Switch } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag, Datel } from "../../utils/svg.file";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../utils/fetchApi.js";
import DeleteModal from "../modal/deleteModal.component";

import FilterSorting from "./filter/filter.sorting.component";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import ColumnModal from "../modal/columnModal.component";
import fillter from "../../images/fillter.png";
import { deleteCustomerLead } from "../../api/delete";

export default function Datatable(props) {
  const params = useParams();
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [deleteEstimateId, setdeleteEstimateId] = useState();
  const [deleteEstimateIdx, setdeleteEstimateIdx] = useState();
  const [estimateResults, setdestimateResults] = useState([]);
  // const [result, setResult] = useState({});
  const [AddColumnShow, setAddColumnShow] = useState(false);

  const [state, setState] = useState({
    estimateResults: {},
    data: [],
    filteredData: [],
    columns: [
      {
        title: <Checkbox />,
        dataIndex: "keys",
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
  const buildTable = async (result) => {
    const data = [];
    for (let i = 0; i < result.data.Data.length; i++) {
      if (result.data.Data[i].customerLeadId[0]) {
        let estimateData = result.data.Data[i];
        // console.log(estimateData.autoFollowUp, "estimateData.autoFollowUp");
        let customerData = estimateData.customerLeadId;
        let followRemind;
        if (customerData[0].autoReminderEmail === true) {
          followRemind = "Yes";
        } else {
          followRemind = "No";
        }
        console.log("f", customerData[0].autoReminderEmail);
        data.push({
          keys: (
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
          autoFollowUp: (
            <>
              <div className="green-switch">
                <Switch
                  checked={customerData[0].autoReminderEmail}
                  onChange={() => {
                    console.log("check", estimateResults);
                    onChange(customerData[0], i);
                  }}
                />
              </div>
            </>
          ),
          scheduleDate: customerData[0].createdAt.split("T")[0],
          //  customerData[0].scheduleDate,
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
          // autoFollowUp: followRemind,
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
          // key:estimateData._id
        });
      }
    }
    // console.log("data: ", data);
    setState({ ...state, data, filteredData: data });
  };
  const fetchData = async () => {
    const result = await getData(`estimation/upcoming-estimation`);
    console.log("res=>", result);
    setdestimateResults({
      estimateResults: result.data,
    });
    // console.log(estimateResults);
    //  await setResult(results)
    await buildTable(result);
  };
  useEffect(async () => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(async() => {
    if(props.currentTabData.filterObject)
    handleOk(props.currentTabData.filterObject.estimaitonStatus);
    else
    fetchData();
    
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentTabData]);
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
    console.log("hey uncl2");
    setModalVisible(true);
  };

  const handleOk = async (leadSelected) => {
    console.log("hey uncl", leadSelected);
    const result2 = await postData(`estimation/filter-sort`, {
      estimaitonStatus: leadSelected,
    });
    console.log("sort==", result2);
    // [
    //   "New Lead - Multiple Contact Attempts",
    //   "Lead Added",
    // ]
    await buildTable(result2);
    setModalVisible(false);
    setAddColumnShow(false);
  };

  const handleCancel = () => {
    console.log("hey uncl3");
    setModalVisible(false);
    setAddColumnShow(false);
  };
  const onChange = async (customer, i) => {
    console.log(`switch to`, params);

    // even=!even.target.checked;
    const result = await postData(`customer/update-info`, {
      id: customer._id,
      autoReminderEmail: !customer.autoReminderEmail,
    });
    console.log(result, estimateResults);
    fetchData();
    // if(estimateResults.estimateResults)
    // estimateResults.estimateResults.Data.map((rr,idx)=>
    // { if(idx=== i)
    //   rr.customerLeadId.map(r=>{
    //     r.autoReminderEmail=!customer.autoReminderEmail
    //         });
    // });
    // console.log(estimateResults)
    //   temp[i].autoFollowUp= <>
    //   <div className="green-switch">
    //     <Switch checked={!customer.autoReminderEmail} onChange={()=>onChange(customer,i)} />
    //   </div>
    // </>;

    // setState({estimateResults})
  };
  const handleColumnModal = () => {
    setAddColumnShow(true);
  };
  const saveFilterss=async (query) =>{
    console.log('hii buddy',query,props.currentTabData._id);
    let id=props.currentTabData._id;
    const result2 = await postData(`tab-filter/update/${id}`,query);
    console.log('sortupd==',result2)
    props.updateTab(result2)

  }
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
          <span
            className="ant-blue-plus column-add-btn"
            onClick={handleColumnModal}
          >
            <PlusCircleOutlined style={{ fontSize: "18px" }} className="me-2" />{" "}
            Add Column
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
        saveFilterss={saveFilterss}
        currentTabData={props.currentTabData}
        
      />
      <ColumnModal
        handleColumnModal={handleColumnModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        AddColumnShow={AddColumnShow}
      />
    </>
  );
}
