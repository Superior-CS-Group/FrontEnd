import React, { useEffect, useState } from "react";
import { Row, Col, Select, Button, Card, Switch, message, Avatar } from "antd";
import { useParams, useLocation, Link } from "react-router-dom";
import { getData, postData } from "../../../utils/fetchApi.js";
import {
  UserOutlined,
  PhoneOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
// import Button from "@restart/ui/esm/Button";
import LeadInfo from "./lead.info.component";
import AddEstimates from "../add.estimates.components";
import { updateCustomerDetails } from "../../../api/customer.js";
import EstimationList from "../estimation/estimation.list.component.jsx";
import userProfile from "../../../images/profile-top.png";
import { time } from "../../../utils/svg.file";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages.jsx";
import { getUserEstimation } from "../../../api/formula.js";
export default function CustomerLeadInfo(props) {
  const params = useParams();

  const [state, setState] = useState({
    size: "large",
    tabShow: true,
    activeStatus: "Active",
    customerid: "",
    customerName: "",
    customerAddress: "",
    customerAddress1: "",
    autoReminderEmail: "",
    distance: "",
    statusList: [],
    estimaitonStatus: "",
    resultData: [],
  });
  const [estimaitonId, setEstimationId] = useState("");
  const { search } = useLocation();

  const [isAddingNew, setIsAddingNew] = useState(false);
  let [customerInfo, setCustomerInfo] = useState({});
  let [GetUserEstimationData, setGetUserEstimationData] = useState({});

  const toggleAddNew = () => {
    setIsAddingNew(!isAddingNew);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const query = new URLSearchParams(search);
    setEstimationId(query.get("estimationId"));
  }, [search]);

  useEffect(async() => {
    const id = params.id;
    if (id) {
      const body = { id };
      const fetchData = async () => {
        const result = await postData(`customer/get-info`, body);
        // console.log("result.data.Data",result.data.Data)
        setCustomerInfo(result);
        let userstatus;

        if (result.data.Data.activeStatus === true) {
          userstatus = "Active";
        } else {
          userstatus = "Deactive";
        }
        const status = await getData(`status/list`, body);

        setState({
          ...state,
          id: id,
          customerid: id,
          customerName: result.data.Data.name,
          customerEmail: result.data.Data.email,
          customerAddress: result.data.Data.address,
          distance: result.data.Data.distance,
          customerAddress1:
            result.data.Data.city +
            " " +
            result.data.Data.state +
            +result.data.Data.postalCode,
          activeStatus: userstatus,
          estimaitonStatus: result.data.Data.estimaitonStatus,
          autoReminderEmail: result.data.Data.autoReminderEmail,
          resultData: result.data.Data,
          statusList: status.data.Data,
        });
      };

      fetchData();
    }
    const getUserEstimationD = await getUserEstimation(params.id);
    setGetUserEstimationData(getUserEstimationD)
  }, []);

  const onChangeTab = (val) => {
    setIsAddingNew(false);
    if (val === "Estimate") {
      setState({
        ...state,
        tabShow: true,
      });
    } else if (val === "Lead") {
      setState({
        ...state,
        tabShow: false,
      });
    } else {
      console.log(null);
    }
  };

  const { size } = state;

  const autoReminderEmailHandleSubmit = async (e) => {
    let id = params.id;
    const body = {
      id: id,
      autoReminderEmail: e,
    };
    const updateCustomer = await updateCustomerDetails(body);
    if (updateCustomer.remote === "success") {
      setState({
        ...state,
        errors: [],
        autoReminderEmail: e,
      });
      message.success("Data Updated!", 5);
    } else {
      setState({
        ...state,
        errors: updateCustomer.remote.data.errors,
        isLoading: false,
      });
    }
  };

  const updateStatusHandleSubmit = async (e) => {
    let id = params.id;
    const body = {
      id: id,
      estimaitonStatus: e,
    };
    console.log("body: ", body);
    const updateCustomer = await updateCustomerDetails(body);
    if (updateCustomer.remote === "success") {
      setState({
        ...state,
        errors: [],
        estimaitonStatus: e,
      });
      message.success("Data Updated!", 5);
    } else {
      setState({
        ...state,
        errors: updateCustomer.remote.data.errors,
        isLoading: false,
      });
    }
  };

  return (
    <>
      <div className="bg-estimates">
        <BreadcrumbBar
          name="Dashboard "
          subname="Estimates"
          subtitle="username"
          breaclass="mb-3"
        />

        <Row>
          <Col md={24}>
            <Card
              bordered={false}
              bodyStyle={{ padding: "0px" }}
              className="radius-12"
            >
              {params.id ? (
                <>
                  <div className="fillter d-lg-flex align-items-center p-3">
                    <span className="inline-block user-name-div me-1 fillter-btn d-lg-flex align-items-center">
                      <Avatar src={userProfile} className="me-2" />{" "}
                      {state.customerName}
                    </span>
                    <span className="inline-block me-4">
                      <Select
                        size="large"
                        className="me-4 ant-bg-primary status-drop"
                        bordered={false}
                        style={{ fontSize: "14px" }}
                        value={state.estimaitonStatus}
                        name="estimaitonStatus"
                        onChange={updateStatusHandleSubmit}
                        // defaultValue={state.estimaitonStatus}
                      >
                        {state.statusList.map((Datalist, idx) => {
                          return (
                            <option value={Datalist.name} key={idx}>
                              {Datalist.name}
                            </option>
                          );
                        })}
                      </Select>
                    </span>

                    <div className="ms-auto col-lg-4 text-end d-inline-flex align-items-center justify-content-end ">
                      <div className="float-start d-inline-flex align-items-center">
                        {/* <span className="me-2">
                          {console.log(
                            state.autoReminderEmail,
                            "111state.autoReminderEmail"
                          )}
                          Auto Reminder Email{" "}
                        </span>
                        <Switch
                          value={state.autoReminderEmail}
                          onChange={autoReminderEmailHandleSubmit}
                          className="me-2"
                          checked={state.autoReminderEmail}
                        /> */}
                        <Button type="link">
                          <UserAddOutlined className="mr-2" /> Create Customer
                          Login{" "}
                        </Button>
                      </div>

                      <Button
                        style={{ width: "150px" }}
                        className="add-btn me-4 d-inline-flex align-items-center justify-content-center"
                        type="primary"
                        shape="round"
                        size={size}
                        ghost
                      >
                        <PhoneOutlined /> Contact
                      </Button>
                      <Button
                        // style={{ width: "150px" }}
                        className="add-btn me-4 align-items-center justify-content-center"
                        type="primary"
                        shape="round"
                        size={size}
                        onClick={toggleAddNew}
                        style={{
                          display: isAddingNew ? "none" : "block",
                        }}
                      >
                        <span style={{ marginRight: "5px" }}>{time}</span>
                        Create Estimate
                      </Button>
                    </div>
                  </div>

                  <div className="tab-div border-top">
                    <ul className="">
                      <Link to={`/customer-lead/${params.id}`}>
                        <li
                          onClick={() => onChangeTab("Estimate")}
                          className={state.tabShow ? "active" : ""}
                        >
                          Estimate
                        </li>
                      </Link>
                      <li
                        onClick={() => onChangeTab("Lead")}
                        className={!state.tabShow ? "active" : ""}
                      
                      >
                        Lead
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
            </Card>

            {state.tabShow === false ? (
              <div className="card-show mt-3 pb-3">
                <LeadInfo  
                 result={customerInfo}
                 />
              </div>
            ) : (
              <div className="card-show mt-3">
                {props.show}
                {!estimaitonId && !isAddingNew ? (
                  <EstimationList 
                  toggleAddNew={toggleAddNew}
                  fetched={GetUserEstimationData}
                  />
                ) : (
                  <AddEstimates
                    custInfo={{
                      id: state.customerid,
                      name: state.customerName,
                      email: state.customerEmail,
                      address1: state.customerAddress1,
                      address: state.customerAddress,
                    }}
                    estimationId={estimaitonId}
                  />
                )}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
