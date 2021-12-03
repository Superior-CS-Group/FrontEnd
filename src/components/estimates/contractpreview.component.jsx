import React, { useEffect, useState } from "react";
import PreviewBanner from "../../../src/images/estimate-banner.png";
import MountSky from "../../../src/images/mount-sky.png";
import { Divider, Input, Row, Col, Form } from "antd";
import logo from "../../images/small-logo.png";
import TeamPic from "../../images/team.jpg";
import SimpleEMailSent from "../email/simple.emailsent.component";
import ModalMain from "../modal/modal.component";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { postData } from "../../utils/fetchApi";
import { sendEstimateContract } from "../../api/estimate-contract";
import { getUserEstimationDetailsById } from "../../api/formula";

export default function ContractPreview(props) {
  const params = useParams();
  const { search } = useLocation();
  const [state, setState] = useState({
    activeStatus: "Active",
    customerid: "",
    customerName: "",
    customerAddress: "",
    customerAddress1: "",
    autoReminderEmail: "",
    estimaitonStatus: "",
    resultData: [],
  });
  const [estimationId, setEstimationId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [estimationDetails, setEstimationDetails] = useState({});
  const [totalCharge, setTotalCharge] = useState(0);
  // const [totalCost, setTotalCost] = useState(0);
  // const [totalMaterialsCost, setTotalMaterialsCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const query = new URLSearchParams(search);
    const estimationId = query.get("estimationId");
    setEstimationId(estimationId);
    setIsLoading(false);
  }, [search]);

  let handleCancel = () => {
    setModalVisible(false);
  };

  const getEstimationDetails = async () => {
    const response = await getUserEstimationDetailsById(estimationId);
    if (response.remote === "success") {
      const formulas = response.data.data.services;
      let discount =
        response.data.data?.estimateSettings?.fluffNumberDiscount || 0;
      console.log("estimationDetails: ", response.data.data, formulas);
      let projectCharge = 0;
      let projectCost = 0;
      let materialsCost = 0;
      formulas.forEach((formula) => {
        projectCharge += formula.totalProjectCharge;
        projectCost += formula.totalMaterialsCost;
        materialsCost += formula.totalMaterialsCost;
      });
      discount = (projectCharge * discount) / 100;
      const projectChargeAfterDiscount = projectCharge - discount;
      setTotalCharge(projectChargeAfterDiscount.toFixed(2));
      setDiscount(discount.toFixed(2));
      console.log({
        projectCharge,
        projectCost,
        materialsCost,
        projectChargeAfterDiscount,
        discount,
      });
      setEstimationDetails(response.data.data);
    } else {
      setEstimationId(null);
    }
  };

  useEffect(() => {
    if (estimationId) {
      getEstimationDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimationId]);

  useEffect(() => {
    const id = params.id;

    if (id) {
      const body = { id };
      const fetchData = async () => {
        await postData(`customer/get-info`, body);

        const result = await postData(`customer/get-info`, body);
        // console.log("result.data.Data",result.data.Data)
        let userstatus;

        if (result.data.Data.activeStatus === true) {
          userstatus = "Active";
        } else {
          userstatus = "Deactive";
        }

        setState({
          ...state,
          id: id,
          customerid: id,
          customerName: result.data.Data.name,
          customerEmail: result.data.Data.email,
          customerAddress: result.data.Data.address,
          customerAddress1:
            result.data.Data.city +
            " " +
            result.data.Data.state +
            +result.data.Data.postalCode,
          activeStatus: userstatus,
          estimaitonStatus: result.data.Data.estimaitonStatus,
          autoReminderEmail: result.data.Data.autoReminderEmail,
          resultData: result.data.Data,
        });
      };

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  let modalShow = async () => {
    const custId = params.id;
    let custLeadId = [];
    custLeadId.push(custId);
    const body = { customerLeadId: custLeadId };
    console.log(body);
    const result = await sendEstimateContract(body);
    if (result.remote === "success") {
      console.log(result.data.data);
    }
    setModalVisible(true);
  };

  if (!estimationId && !isLoading) {
    return <Navigate to={`/customer-lead/${params.id}`} />;
  }

  return (
    <>
      <div className="card-shadow" style={{ borderRadius: "25px" }}>
        <img src={PreviewBanner} className="estimateImg" alt="" />
        <div className="estimate-preview-detail">
          <div className="estiamte-preview-head">
            <img src={MountSky} alt="" />
            <div className="text-right-estimate-header text-right ">
              <h5>Mountain Sky Proposal</h5>
              <span>Sales: Admin </span>
              <br></br>
              <span>Dates: {new Date().toLocaleString()}</span>
            </div>
          </div>

          <div className="estiamte-preview-head">
            <div className="text-right-estimate-header mt-3">
              <p>Prepared For:</p>
              <h4>{state.resultData.name}</h4>
              <span style={{ fontSize: "12px" }}>Located At</span>
              <br></br>
              <h6>
                {state.resultData.address +
                  ", " +
                  state.resultData.city +
                  " " +
                  state.resultData.state +
                  " " +
                  state.resultData.country +
                  ", " +
                  state.resultData.postalCode}
              </h6>
            </div>
            <div className="text-right-estimate-header">
              <img src={logo} alt="" />
            </div>
          </div>
          <Divider />
          <div className="mt-3 mb-3">
            <p>
              We appreciate the oppurtunity to work with you! Please see below
              for a<b> breakdown of your project.</b>
            </p>
            <p>
              {" "}
              Did you know? We offer <b>full 2D & 3D design services! </b>Reach
              out to us to get started.
            </p>
            <p>
              {" "}
              We also provide <b>financing for our customers!</b>
            </p>
          </div>
          <Divider />
          <div className="mt-3 mb-3">
            <h3>Scope of Work</h3>
            {estimationDetails.services &&
              estimationDetails.services.map((item, index) => {
                return (
                  <div className="work-scope-div-main mt-2 mb-3">
                    <div className="work-scope-div">
                      <div className="work-scope-top-left">
                        <img
                          src={PreviewBanner}
                          className="work-scope-img"
                          alt=""
                        />
                      </div>
                      <div className="work-scope-top-right">
                        <h4>{item.title}</h4>
                        <h5>${item.totalProjectCharge}</h5>
                      </div>
                    </div>
                    <div className="d-lg-flex justify-content-between p-4 ">
                      <ul className="work-scope-list">
                        <pre>{item.processedClientContract}</pre>
                      </ul>
                    </div>
                  </div>
                );
              })}

            <div className="text-right sub-total-div mt-4 pb-4">
              <ul>
                <li>
                  <b>Subtotal:</b> {totalCharge}
                </li>
                <li>
                  <b>Discount:</b> {discount}
                </li>
                <li>
                  <b>Contract Total:</b>{" "}
                  {totalCharge - discount < 0 ? 0 : totalCharge - discount}
                </li>
              </ul>
            </div>
            <div className="pb-4">
              <p>
                Are you ready to move forward? Contact the salesperson you were
                working with right away to get on our schedule!{" "}
              </p>
              <h5>Payment Terms for Project: </h5>
              <Row className="sub-total-div">
                <Col md={16}>
                  <li>
                    <b>Deposit payment at signing of contract:-</b> #DIV/0!
                  </li>
                  <li>
                    <b>Progress payment when project is started: -</b> #DIV/0!
                  </li>
                  <li>
                    <b>Progress payment when project is 50% complete: -</b>{" "}
                    #DIV/0!
                  </li>
                  <li>
                    <b>Completion payment: - </b> #DIV/0!
                  </li>
                  <span>
                    Note: Payment terms will change if change orders are made
                  </span>
                </Col>
                <Col md={8}></Col>
              </Row>

              <h4 className="mt-4">Meet Our Team!</h4>
              <img src={TeamPic} className="team-pic" alt="" />
            </div>

            <div className="term-for-project mt-5">
              <h5>Terms For Project</h5>
              <h6 className="mt-3">General Contract Terms: </h6>

              <ul>
                <li>
                  1.11 Both parties are entitled to fill out the agreement
                  below, signed by the client and the contractor.{" "}
                </li>
                <li>
                  1.12 By signing, the client agrees to everything in the
                  contract. By signing, ____________ agrees to everything in the
                  contract. This contract is legally binding.{" "}
                </li>
                <li>
                  1.13 If not stated in the contract, it is not included.{" "}
                </li>
                <li>
                  1.14 If _________________ employees have to “Redo” or “Take
                  up” or “Replace” any items after they are installed, the
                  client may be charged an additional cost unless installed not
                  to manufacturer specs by _______________ employees. (Example:
                  Rock type is changed after installed on site and
                  __________________ has to replace it, a fee will be applied){" "}
                </li>
                <li>
                  1.16 End date stated is not a guarantee and will depend on
                  weather, productivity, material availability etc{" "}
                </li>{" "}
                <li>
                  1.17 Depending on the size and length of the project, a
                  port-a-potty may be brought on site for the use of
                  _______________ crew.{" "}
                </li>{" "}
                <li>
                  1.18 Cancellation policy is as follows: Client may cancel the
                  project up to 21 (Twenty-one) days before project start date.
                  If the project is cancelled after 21 days prior to the start
                  date, a fee may be charged.{" "}
                </li>
                <li>
                  1.19 In event of a legal fee, the prevailing party is
                  responsible for legal fees.{" "}
                </li>
                <li>
                  1.20 Deposit is non refundable unless contract cancelled or
                  delayed by __________________.{" "}
                </li>
                <li>
                  1.21 Any changes in contract must be in writing and signed.
                  Payment terms and warranties do not apply to change orders{" "}
                </li>
                <li>
                  1.22 A change order will be made whenever something occurs
                  that is out of scope, extra or not originally foreseen. The
                  change order will become in part and conformance with this
                  contract.{" "}
                </li>
                <li>
                  {" "}
                  1.23 If unforeseen items occur a change order will be made.
                  Change orders may be verbally or written approved by the
                  client.
                </li>
                <li>
                  {" "}
                  1.24 Permit, city costs or hoa design approval cost is paid
                  for by client. ____________ will handle submitting the permit
                  and inspections, but the cost of admin and permit is not
                  included unless specified in contract.
                </li>
                <li>
                  1.25 Concrete shall attain a compressive strength of not less
                  than 4,000 pounds per square inch at the age of 30 days April
                  - October and age of 120 days November - March.
                </li>
                <li>
                  1.26 _________________ may charge extra if any other
                  contractor, or person delays, destroys or interferes with
                  workflow or already installed items.
                </li>
                <li>
                  {" "}
                  1.27 If soils are tested and a soil change is needed, this is
                  out of contract and will be additional.
                </li>
                <li>
                  {" "}
                  1.29 __________________ is not responsible for blowing out of
                  irrigation system unless otherwise noted
                </li>
                <li>
                  {" "}
                  1.30 ________________ will not be held liable for engineering
                  failures unless installed incorrectly by ____________________
                  crew.
                </li>
                <li>
                  {" "}
                  1.31 Construction work and equipment is dangerous to be
                  around. Please take caution when around any construction
                  materials, equipment, employees or any other construction
                  related items. When in a construction zone, please know this
                  is at your own risk.
                </li>
                <li>
                  {" "}
                  1.33 Designs are for conceptual vision only. Actual projects
                  may vary slightly from design.
                </li>
                <li>
                  {" "}
                  1.35 When installing Pavers, travertine or flagstone, the
                  surface is not guaranteed to be the same height from stone to
                  stone, and there may be slight height differences in the
                  pavers in the way they are manufactured
                </li>
                <li>
                  {" "}
                  1.36 If house is unsquare, there is not guarantee the
                  hardscaping, landscaping or sod around the home will be square
                  to the house or surrounding items
                </li>
                <li>
                  {" "}
                  1.37 When installing pavers, retaining walls or flatwork, the
                  slope direction and amount will be determined by the
                  ____________ crew based on the plan, existing elevations on
                  site or other items that will affect the grading.
                </li>
                <li>
                  {" "}
                  1.38 If____________ is hired to do drainage work on your
                  property, our crew will determine how everything will slope,
                  and where water will flow. This plan is determined by the
                  experts on our team and in most circumstances we do not
                  provide this plan to the homeowner.{" "}
                </li>{" "}
                <h5>Materials:</h5>
                <li>
                  {" "}
                  2.1 Materials that are being delivered on site (Such as,
                  mulch, rock, sand, gravel, soil, sod and plants) will be
                  delivered at various times throughout the project. We will do
                  our best to manage and schedule these deliveries out of the
                  way of needed access such as driveways and sidewalks.
                </li>
                <li>
                  {" "}
                  2.2 If more materials are needed then what's stated in the
                  contract, the section will be re-measured and you may be
                  charged accordingly for the amount extra.
                </li>
                <li>
                  {" "}
                  2.3 All excess or unused materials are the possession of
                  _________________. When doing projects we are required to
                  order in full pallet quantities although the client is only
                  paying for the amount/ sq ft listed in the contract/charged
                  for.
                </li>
                <li>
                  2.4 For all materials returned, that is denied for
                  installation by customer, restocking fees as well as labor,
                  billed at $65 per man hour, to return items will be charged to
                  the homeowner, unless returned by ______________ in the case
                  we have extra after project completion
                </li>
                <li>
                  2.5 If additional concrete is needed for a depth more than 4”
                  or what's stated in contract, a fee of $150 per yard will be
                  applied.
                </li>
                <h5> Warranties:</h5>
                <li>
                  {" "}
                  3.11 After the installation of a landscape project, it is the
                  homeowner's responsibility to maintain all living items such
                  as trees, shrubs, annuals, perennials, and grass as well as
                  any maintenance on hardscaping.
                </li>
                <li>
                  {" "}
                  3.12 ________________ will not be held liable for any damages
                  caused by natural forces (Cracked sprinklers, freeze and thaw,
                  erosion, animals or anything beyond our control)
                </li>
                <li>
                  3.13 _____________________ is not responsible for any weeds
                  after installation. Weed block is not a guarantee
                </li>
                <li>
                  3.14 ______________ is not responsible for any rotting of wood
                  after install
                </li>
                <li>
                  3.15________________ offers a limited 3 year warranty after
                  signing of the contract on all paver patios, paver walkways
                  and paver driveways. This warranty covers settling, and
                  cracking of pavers. The following items will not be covered in
                  this warranty: Self inflicted causes or natural causes
                  (Floods, fires, hurricanes, tornadoes etc). Warranty does not
                  cover settling if proper drainage isn't installed. Small
                  chips, polymeric sand and efflorescence is not warrantied. If
                  there is a manufacturer problem, the warranty will go through
                  the manufacturer directly. Pavers may have a height difference
                  from one paver to the other in amounts less then ⅜”. This is
                  not considered settling and is not warrantied.
                </li>
                <li>
                  3.16______________ offers a 3 year warranty after signing of
                  the contract on retaining wall installation services. This
                  warranty covers settling, cracking and manufacturing defects.
                  The following items will not be covered in this warranty: Self
                  inflicted causes or natural causes (Floods, fires, hurricanes,
                  tornadoes etc). Small chips and Efflorescence is not covered
                  in retaining wall warranty. If there is a manufacturer
                  problem, warranty will go through the manufacturer directly.
                </li>
                <li>
                  {" "}
                  3.17 Irrigation is covered in a 90 day warranty period after
                  signing of the project. This includes, manufacturing failures
                  or malfunctions, and installation failures. This does not
                  include personal or third party damage, freezing damage or
                  damage from other contractors. Drip emitters and backflow
                  preventers are not included in warranty. After the 90 day
                  warranty period, it will be the homeowners responsibility to
                  maintain the irrigation. Too much water or too little water is
                  not covered in warranty and further damage caused by
                  irrigation is not covered.
                </li>
                <li>
                  {" "}
                  3.18 Plants, trees, shrubs and grasses are covered in a 90 day
                  warranty period after installation of the project. This
                  warranty is only effective if ______________ installed and
                  maintained the irrigation system. After the 90 day warranty
                  period, it will be the homeowners responsibility to maintain
                  and upkeep the plants, trees, shrubs and grasses.
                  Freezing/thaw, damage to plants and tree from over or under
                  watering, and damage by homeowner or 3rd party source will not
                  be covered in warranty.
                </li>
                <li>
                  3.19 __________ does not warranty poured in place concrete or
                  asphalt against cracks, reflective cracks, chipping or any
                  other damage caused by settling or other circumstances beyond
                  our control.
                </li>
                <li>
                  3.20 Exact color replication for concrete is not warrantied.
                  Slight variations in color may also occur due to weather
                  conditions or projects requiring multiple pours.
                </li>
                <li>
                  {" "}
                  3.21 Rock, mulch, weed fabric, edging and sod is not covered
                  in warranty
                </li>
                <li>
                  3.22 Grading and drainage is not covered in warranty. Erosion,
                  puddles, and wet areas are very unlikely, but can occur.
                </li>
                <li>
                  3.23 When backfilling or demoing materials, there is no
                  guarantee items won't settle over the years
                </li>
                <li>
                  3.24 If a warranty call is needed, please contact the office
                  at ____________. After notice of what needs to be corrected,
                  _____________ will schedule for the repair. Depending on the
                  season, this may be up to 90 days. Warranty items may not be
                  able to be completed until a certain time of year, in which
                  case _______________ will wait until the time period to
                  complete the warranty call.
                </li>
                <li>
                  3.25 No warranty work will be completed until final payment is
                  made on the initial contract and any change orders.
                </li>
                <h5> Payment:</h5>
                <li>
                  {" "}
                  4.1The progress payments for this project will follow the
                  payments outlined directly above this terms section. All
                  progress payments will be made on time and when specified. If
                  a progress payment is not made, ______________ may retract
                  from the jobsite until further payment is made.
                </li>
                <li>
                  {" "}
                  4.11 Price Is Valid For 60 days from when the contract was
                  sent. After this time, contract will need to be looked over
                  and resent by ___________ before moving forward
                </li>
                <li>
                  {" "}
                  4.12 Payment methods for this project include Check and Cash.
                  Venmo, paypal and credit card will be accepted with the
                  exception of a 2-3% processing fee.
                </li>
                <li>
                  {" "}
                  4.13 If the project is not paid in full within 20 days from
                  completion of the project, the client will be charged 5% per
                  month beyond the terms of this contract. The client must pay
                  the project in full within 2 month(s) after the project
                  completion date.
                </li>
                <li>
                  {" "}
                  4.14 Final payment is due on completion of original contract
                  not including warranty work OR change orders
                </li>
                <li>
                  {" "}
                  4.15 Client understands for progress payments at time of
                  processing / charging credit card client is content with
                  progress of work/ project and will make no attempt to make any
                  charge-back attempts. If a Credit Card used for final payment
                  of any work done/ project completion before processing/
                  charging credit card client has ensured a final walk-through
                  has been conducted and is completely satisfied with work
                  performed/ project outcome/ completion and client agrees there
                  will make no charge-back attempts or charge-backs processed.
                  Instead of credit card charge back attempts clients will
                  utilize warranty provided by _______________. If legal
                  mitigation is needed for payment (including credit card
                  charge-backs), client accepts responsibility for legal/ court/
                  lawyer fees/ penalties etc. incurred by_____________ during
                  legal proceedings plus balance due.
                </li>
                <li>
                  4.16 If there are remaining items carried on for 2 weeks or
                  more past the date of which the project is over 80% complete,
                  the client should pay the remaining balance excluding an
                  agreed amount “Hold back” for the cost of the finalizing
                  items.__________________ will determine those costs to
                  determine the holdback for this.
                </li>
                <li>
                  {" "}
                  4.17 Irrigation adjustments may be required after the
                  completion of the project. Final payment will still be made if
                  irrigation adjustments are required as that's considered as
                  maintenance
                </li>
                <h5>Unforeseen Items:</h5>
                <li>
                  {" "}
                  5.10 We will have a location service mark for all utilities
                  before the project is started. Please do your best to not
                  disturb these markings since it is important for
                  _______________ to know where these markings are at the time
                  of project.
                </li>
                <li>
                  {" "}
                  5.11 If any utility lines are hit during the excavation, demo
                  or installation process, due to incorrectly marked
                  lines,________________ will not be held liable. If this is to
                  occur, an agreement will be made between ___________________
                  and client to resolve the issue. Utility line include but are
                  not limited to: (Gas, electric, comcast, cable,
                  tela-communications, xcel, power, etc)
                </li>
                <li>
                  {" "}
                  5.12 Any unknown objects encountered underground or
                  aboveground, or circumstances that may stop or delay work will
                  be considered extra work and is not covered under the original
                  contract. Examples include, but are not limited to; boulders,
                  large roots, construction footings, stumps, utilities,
                  groundwater springs, etc. Additional work will be billed for
                  these items if to occur
                </li>
                <li>
                  {" "}
                  5.13 The client is responsible for the marking of all
                  non-public utilities (i.e. irrigation, invisible fencing,
                  satellite lines, etc.) before work commences, and assumes
                  responsibility for any damages caused by unmarked lines
                </li>
                <li>
                  {" "}
                  5.14 It is the responsibility of the property owner to mark
                  property lines prior to the start of work. _______________
                  accepts no responsibility or liability for incorrectly marked
                  property lines or errors in survey. If access through a
                  neighboring property is required, it is the responsibility of
                  the client to gain legal, written, or verbal authorization to
                  proceed.
                </li>
                <li>
                  {" "}
                  5.15 When providing concrete demo, price assumes concrete is a
                  standard 4” thick with rebar spaced no closer than 16” and no
                  greater in size than ½” rebar. Concrete demo price also
                  assumes no wire mesh is originally installed inside the
                  concrete.
                </li>
                <h5>Insurance:</h5>
                <li>
                  {" "}
                  6.1 If any property damage, personal injury or any other
                  circumstances requiring insurance, please contact
                  _____________ to resolve everything. Please see insurance
                  policies listed below.
                </li>
                <li> 6.2 General liability insurance certificate:</li>
              </ul>
              <Form layout="vertical" className="contract-preview-form">
                <Row>
                  <Col md={11}>
                    {" "}
                    <Form.Item label="Contractor Signature">
                      <Input
                        placeholder="Contractor Signature"
                        type="text"
                        value={state.resultData.name}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={11}>
                    {" "}
                    <Form.Item label="Date">
                      <Input
                        placeholder="Date"
                        type="text"
                        value={new Date().toLocaleString()}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={11}>
                    {" "}
                    <Form.Item label="Owner">
                      <Input
                        placeholder="Owner"
                        type="text"
                        value={state.resultData.name}
                      />
                    </Form.Item>
                  </Col>{" "}
                  <Col md={2}></Col>
                  <Col md={11}>
                    {" "}
                    <Form.Item label="Company">
                      <Input
                        placeholder="Company"
                        type="text"
                        value={state.resultData.name}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={11}>
                    {" "}
                    <Form.Item label="Customer Signature">
                      <Input
                        placeholder="Customer Signature"
                        type="text"
                        value={state.resultData.name}
                      />
                    </Form.Item>
                  </Col>{" "}
                  <Col md={2}></Col>
                  <Col md={11}>
                    {" "}
                    <Form.Item label="Date">
                      <Input
                        placeholder="Date"
                        type="text"
                        value={new Date().toLocaleString()}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={11}>
                    {" "}
                    <Form.Item label="Customer Name">
                      <Input
                        placeholder="Customer Name"
                        type="text"
                        value={state.resultData.name}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        <div className="text-right p-4">
          <span onClick={modalShow} className="add-btn">
            Send to Customer
          </span>
        </div>
      </div>
      <ModalMain
        modalShow={modalShow}
        content={
          <SimpleEMailSent handleCancel={() => setModalVisible(false)} />
        }
        handleCancel={handleCancel}
        ModalVisible={ModalVisible}
      />
    </>
  );
}
