import React, { Component } from "react";
import { Card, Button } from "antd";

export default class SlideItems extends Component {
  render() {
    return (
      <>
        <Card
          bordered={false}
          className="shadow estimate-card m-3"
          style={{ borderRadius: "10px" }}
        >
          <div className="d-flex align-items-start justify-content-between mb-3">
            <div className="ant-estimate-text">
              <span>Estimate</span>
              <h2>#00001</h2>
            </div>
            <Button className="ant-moving-button">Moving FWD</Button>
          </div>
          <div className="ant-estimate-text mb-3">
            <span>Costumer Na me</span>
            <h2>Leslie Alexander</h2>
          </div>
          <div className="d-flex align-items-start justify-content-between">
            <div className="ant-estimate-text">
              <span>Adress</span>
              <h2>11 West 53 Street, Manhattan</h2>
            </div>
            <div className="ant-estimate-text">
              <span>Distance</span>
              <h2>
                6.3<sub className="ms-2">km</sub>
              </h2>
            </div>
          </div>
        </Card>
      </>
    );
  }
}
