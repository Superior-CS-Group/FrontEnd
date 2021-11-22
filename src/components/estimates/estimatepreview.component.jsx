import React from "react";
import PreviewBanner from "../../../src/images/estimate-banner.png";
import MountSky from "../../../src/images/mount-sky.png";
import { Divider, Button } from "antd";
import { edit } from "../../utils/svg.file";

export default function EstimatePreview() {
  return (
    <>
      <div className="card-shadow p-3" style={{ borderRadius: "25px" }}>
        <img src={PreviewBanner} className="estimateImg" />
        <div className="estimate-preview-detail">
          <div className="estiamte-preview-head">
            <img src={MountSky} />
            <div className="text-right-estimate-header">
              <h5>Mountain Sky Proposal</h5>
              <span>Sales: Siloh Churchill </span>
              <br></br>
              <span>Dates:11-02-2011</span>
            </div>
          </div>
          <div className="text-right-estimate-header mt-3">
            <p>Prepared For:</p>
            <h4>Leslie Alexander</h4>
            <span style={{ fontSize: "12px" }}>Located At</span>
            <br></br>
            <h6>Singpore</h6>
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
            <div className="work-scope-div-main mt-2 mb-3">
              <div className="work-scope-div">
                <div className="work-scope-top-left">
                  <img src={PreviewBanner} className="work-scope-img" />
                </div>
                <div className="work-scope-top-right">
                  <h4>Demolition & Prep</h4>
                  <h5>$3600.00</h5>
                </div>
              </div>
              <div className="d-lg-flex justify-content-between p-4 ">
                <ul className="work-scope-list">
                  <li>Remove the current landscape as discussed</li>
                  <li>Prep area for landscape/hardscape to be installed</li>
                  <li>Haul off and dispose of all materials</li>
                </ul>
                <span>{edit}</span>
              </div>
            </div>
            <div className="work-scope-div-main mt-2 mb-3">
              <div className="work-scope-div">
                <div className="work-scope-top-left">
                  <img src={PreviewBanner} className="work-scope-img" />
                </div>
                <div className="work-scope-top-right">
                  <h4>Demolition & Prep</h4>
                  <h5>$3600.00</h5>
                </div>
              </div>
              <div className="d-lg-flex justify-content-between p-4 ">
                <ul className="work-scope-list">
                  <li>Remove the current landscape as discussed</li>
                  <li>Prep area for landscape/hardscape to be installed</li>
                  <li>Haul off and dispose of all materials</li>
                </ul>
                <span>{edit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button type="primary" shape="round">
            Send to Customer
          </Button>
        </div>
      </div>
    </>
  );
}
