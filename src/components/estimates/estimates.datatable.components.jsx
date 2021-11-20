import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import { Table, Checkbox } from "antd";
import ReactDragListView from "react-drag-listview";
import { drag } from "../../utils/svg.file";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../utils/fetchApi.js";

export default function Datatable() {
  const params = useParams();

  const [state, setState] = useState({
    estimateResults: [],
    data: [],
    columns: [
      {
        title: <Checkbox />,
        dataIndex: "key",
      },
      {
        title: (
          <>
            Estimate Date <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "date",
      },
      // {
      //   title: (
      //     <>
      //       Estimate <span className="float-end me-2">{drag}</span>
      //     </>
      //   ),
      //   dataIndex: "estimate",
      // },
      {
        title: (
          <>
            Costumer Name <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "name",
      },
      {
        title: (
          <>
            Email Id <span className="float-end me-2">{drag}</span>
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
            Address <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "address",
      },
      {
        title: (
          <>
            Auto Follow Up <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "autoFollowUp",
      },
      {
        title: (
          <>
            Estimate Sent <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonSent",
      },
      {
        title: (
          <>
            Status <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonStatus",
      },
      {
        title: (
          <>
            E stimaiton Sent Date <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonSentDate",
      },
      {
        title: (
          <>
            days t Took To Send Estimate{" "}
            <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "daysItTookToSendEstimate",
      },
      {
        title: (
          <>
            Design <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "design",
      },
      {
        title: (
          <>
            Design Paed <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "designPaid",
      },
      {
        title: (
          <>
            Phone Follow Up <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "noOfPhoneFollowUp",
      },
      {
        title: (
          <>
            Last Date Phone Follow Up{" "}
            <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "lastDatePhoneFollowUp",
      },
      {
        title: (
          <>
            Email Follow Up <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "noOfEmailFollowUp",
      },
      {
        title: (
          <>
            Last Date Email Follow Up{" "}
            <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "lastDateEmailFollowUp",
      },
      {
        title: (
          <>
            Close Date <span className="float-end me-2">{drag}</span>
          </>
        ),
        dataIndex: "estimaitonCloseDate",
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
        ...state,columns,
      });
    },
    nodeSelector: "th",
  };

  const updateShow = async (e) => {
    console.log(`selected ${e.target}`);
  };

  useEffect(() => {
    const data = [];
    const fetchData = async () => {
      const result = await getData(`estimation/upcoming-estimation`);
      setState({
        estimateResults: result.data,
      });
      // console.log(state.estimateResults.Data.length);

      for (let i = 0; i < result.data.Data.length; i++) {
        let estimateData = result.data.Data[i];
        console.log(estimateData, "estimateData");
        let customerData = estimateData.customerLeadId;

        data.push({
          key: <Checkbox onChange={updateShow(customerData[0]._id)} />,
          // estimate: estimateData.leadInvoinceNo,
          name: (
            <Link to={`/customer-lead/${customerData[0]._id}`}>
              {customerData[0].name}
            </Link>
          ),
          email: customerData[0].email,
          contactNo: customerData[0].contactNo,
          date: customerData[0].createdAt.split("T")[0],
          address: customerData[0].address,
          autoFollowUp: estimateData.autoFollowUp,
          estimaitonSent: estimateData.estimaitonSent,
          estimaitonStatus: estimateData.estimaitonStatus,
          estimaitonSentDate: estimateData.estimaitonSentDate,
          daysItTookToSendEstimate: estimateData.daysItTookToSendEstimate,
          design: estimateData.design,
          designPaid: estimateData.designPaid,
          noOfPhoneFollowUp: estimateData.noOfPhoneFollowUp,
          lastDatePhoneFollowUp: estimateData.lastDatePhoneFollowUp,
          noOfEmailFollowUp: estimateData.noOfEmailFollowUp,
          lastDateEmailFollowUp: estimateData.lastDateEmailFollowUp,
          estimaitonCloseDate: estimateData.estimaitonCloseDate,
        });
      }
      console.log("data: ", data);
      setState({ ...state, data });
    };
    fetchData();
  }, [params]);

  return (
    <>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          className="ant-table-estmating"
          columns={state.columns}
          pagination={true}
          dataSource={state.data}
          bordered={false}
          scroll={{ x: 3500 }}
        />
      </ReactDragListView.DragColumn>
    </>
  );
}
