/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Input, List } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
//855
const payment = [
  {
    title: "Deposit payment at signing of contract",
    cost: (
      <>
        <span className="per-input">
          <Input
            type="number"
            maxLength="2"
            placeholder="12"
            className="ant-width-small font-bold radius-4 gray-text"
            defaultValue=""
          />
          %
        </span>
      </>
    ),
  },
  {
    title: "Progress payment when project is started",
    cost: (
      <>
        <span className="per-input">
          <Input
            type="number"
            min={1}
            max={2}
            placeholder="88"
            className="ant-width-small font-bold radius-4 gray-text"
          />
          %{" "}
        </span>
      </>
    ),
  },
];
function PaymentTerms({ totalCharge, paymentTerms, setPaymentTerms }) {
  const [variation, setVariation] = React.useState([]);
  const [paymentDetails, setPaymentDetails] = React.useState([]);

  React.useEffect(
    () => {
      console.log("paymentTerms", { totalCharge, paymentTerms });
      setPaymentDetails(paymentTerms);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalCharge]
  );

  return (
    <>
      <List
        className="mb-3"
        bordered={false}
        dataSource={paymentDetails}
        size="small"
        renderItem={(item) => (
          <List.Item className="border-0 font-d" extra={[item.cost]}>
            {item.title}
          </List.Item>
        )}
      >
        {variation.map((variation, index) => {
          return (
            <React.Fragment key={index}>
              <List.Item
                className="border-0 font-d position-relative"
                extra={[
                  <>
                    <Input
                      style={{ width: "40px" }}
                      type="number"
                      maxLength="2"
                      placeholder=""
                      className="ant-width-small font-bold radius-4 gray-text"
                      defaultValue=""
                    />
                    <span>%</span> <DeleteOutlined className="delete-icon" />
                  </>,
                ]}
              >
                <Input placeholder="" style={{ width: "88%" }} />
              </List.Item>
            </React.Fragment>
          );
        })}
      </List>
      <div className="addbtn-ant ps-3 py-3">
        <a
          href="#"
          className="d-inline-flex align-items-center"
          onClick={(e) => {
            e.preventDefault();
            setVariation([...variation, { title: "title", value: "" }]);
          }}
        >
          <PlusCircleOutlined className="me-2" />
          Add new field
        </a>
      </div>
      <span>
        <b>Note:</b> <i>Payment terms will change if change orders are made</i>
      </span>
    </>
  );
}

export default PaymentTerms;
