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
      const newPaymentDetails = [];
      paymentTerms.forEach((item) => {
        newPaymentDetails.push({
          title: item.title,
          value: item.value,
          editable: false,
        });
      });
      setPaymentDetails(newPaymentDetails);
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
          <List.Item
            className="border-0 font-d"
            extra={[
              <Input
                style={{ width: "40px" }}
                type="number"
                maxLength="2"
                placeholder=""
                className="ant-width-small font-bold radius-4 gray-text"
                value={item.value}
              />,
            ]}
          >
            {item.editable ? (
              <Input placeholder="" style={{ width: "88%" }} />
            ) : (
              item.title
            )}
          </List.Item>
        )}
      />
      <div className="addbtn-ant ps-3 py-3">
        <a
          href="#"
          className="d-inline-flex align-items-center"
          onClick={(e) => {
            e.preventDefault();
            setPaymentDetails([
              ...paymentDetails,
              {
                title: "title",
                value: 0,
                editable: true,
              },
            ]);
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
