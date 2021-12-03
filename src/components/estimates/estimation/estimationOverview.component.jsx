import { Card, List } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { arrowdown, arrowup } from "../../../utils/svg.file";

function EstimationOverview({
  selectedFormulas,
  setTotalProjectChargeChange,
  estimationSettings,
}) {
  const [totalProjectCharge, setTotalProjectCharge] = React.useState(0);
  const [totalProjectCost, setTotalProjectCost] = React.useState(0);
  const [totalMaterialsCharge, setTotalMaterialsCharge] = React.useState(0);
  const [totalGrossProfit, setTotalGrossProfit] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [totalProjectChargeAfterDiscount, setTotalProjectChargeAfterDiscount] =
    React.useState(0);
  const [
    totalGrossProfitPercentageAfterDiscount,
    setTotalGrossProfitPercentageAfterDiscount,
  ] = React.useState(0);
  const [totalGrossProfitAfterDiscount, setTotalGrossProfitAfterDiscount] =
    React.useState(0);
  const [totalGrossProfitPercentage, setTotalGrossProfitPercentage] =
    React.useState(0);
  React.useEffect(() => {
    setTotalProjectChargeChange(totalProjectCharge);
  }, [setTotalProjectChargeChange, totalProjectCharge]);

  React.useEffect(() => {
    setDiscount(estimationSettings?.fluffNumberDiscount || 0);
  }, [estimationSettings?.fluffNumberDiscount]);

  React.useEffect(() => {
    const totalProjectChargeAfterDiscount =
      totalProjectCharge - (totalProjectCharge * discount) / 100;
    setTotalProjectChargeAfterDiscount(
      totalProjectChargeAfterDiscount.toFixed(2)
    );
    const totalGrossProfitPercentageAfterDiscount =
      (totalProjectChargeAfterDiscount / totalProjectCost) * 100 - 100;
    setTotalGrossProfitPercentageAfterDiscount(
      totalGrossProfitPercentageAfterDiscount.toFixed(2)
    );
    const totalGrossProfitAfterDiscount =
      totalProjectChargeAfterDiscount - totalProjectCost;
    setTotalGrossProfitAfterDiscount(totalGrossProfitAfterDiscount.toFixed(2));
  }, [discount, totalProjectCharge, totalProjectCost]);

  const listdata = [
    {
      title: "Materials Cost",
      rate: `$${totalMaterialsCharge}`,
      pricebtn: "danger-text",
    },
    { title: "Expected Overhead", rate: "$0.00", pricebtn: "danger-text" },
    { title: "Subcontractor Cost", rate: "$0.00", pricebtn: "danger-text" },
    {
      title: "Gross Profit",
      rate: `$${totalGrossProfitAfterDiscount}`,
      pricebtn: "warring-text",
    },
    {
      title: "Gross Profit %",
      rate: `${totalGrossProfitPercentageAfterDiscount}%`,
      pricebtn: "warring-text",
    },
    {
      title: "Net Profit",
      rate: `$${totalGrossProfitAfterDiscount}`,
      pricebtn: "warring-text",
    },
    { title: "Man Hours", rate: "172", pricebtn: "blue-text" },
    { title: "Days w/5 guys", rate: "4.3", pricebtn: "blue-text" },
  ];
  React.useEffect(() => {
    let projectCharge = 0;
    let projectCost = 0;
    let materialsCost = 0;
    selectedFormulas.forEach((formula) => {
      projectCharge += formula.totalProjectCharge;
      projectCost += formula.totalMaterialsCost;
      materialsCost += formula.totalMaterialsCost;
    });
    setTotalProjectCharge(projectCharge.toFixed(2));
    setTotalProjectCost(projectCost.toFixed(2));
    setTotalMaterialsCharge(materialsCost.toFixed(2));
  }, [selectedFormulas]);
  React.useEffect(() => {
    if (totalProjectCharge && totalProjectCost) {
      setTotalGrossProfit((totalProjectCharge - totalProjectCost).toFixed(2));
      setTotalGrossProfitPercentage(
        (
          ((totalProjectCharge - totalProjectCost) / totalProjectCost) *
          100
        ).toFixed(2)
      );
    }
  }, [totalProjectCharge, totalProjectCost, totalMaterialsCharge]);
  return (
    <Card bordered={false} className="radius-12 ant-bootom-line-effect mb-3">
      <Meta
        className="border-bottom ant-meta-title text-center py-3"
        title="Estimate Overview"
      />
      <div className="ant-desc-box ">
        <ul>
          <li className="py-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-inline-flex align-items-center ant-overview-card">
                <span className="me-2">{arrowup}</span>
                Total Project Price
              </div>

              <span className="ant-blue-rate-font ant-blue-rate">
                ${totalProjectChargeAfterDiscount}
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-inline-flex align-items-center ant-overview-card">
                <span className="me-2">{arrowdown}</span>
                Total Project Cost
              </div>

              <span className="ant-dager-rate ant-blue-rate-font">
                ${totalProjectCost}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <List
        bordered={false}
        size="large"
        dataSource={listdata}
        renderItem={(item) => (
          <List.Item
            className="px-0 ant-list-bx"
            extra={[<div className={` ${item.pricebtn}`}>{item.rate}</div>]}
          >
            <List.Item.Meta description={item.title} />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default EstimationOverview;
