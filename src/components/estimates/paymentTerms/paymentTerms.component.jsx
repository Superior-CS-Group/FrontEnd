/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Input, List } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
function PaymentTerms({
  totalCharge,
  paymentTerms,
  setPaymentTerms,
  isValid,
  onBlur,
}) {
  const [paymentDetails, setPaymentDetails] = React.useState([]);
  React.useEffect(
    () => {
      console.log("paymentTerms", { totalCharge, paymentTerms });
      const newPaymentDetails = [];
      paymentTerms.forEach((item) => {
        newPaymentDetails.push({
          title: item.title,
          value: item.value,
          editable: item.editable,
        });
      });
      setPaymentDetails(newPaymentDetails);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalCharge, paymentTerms.length]
  );

  const handleChange = (e, index) => {
    const newPaymentDetails = [...paymentDetails];
    newPaymentDetails[index][e.target.name] = e.target.value;
    setPaymentTerms(newPaymentDetails);
  };

  // const onFocusOut = () => {
  //   setPaymentTerms(paymentDetails);
  // };

  const handleRemoveTerm = (e, index) => {
    if (e) {
      e.preventDefault();
    }
    const newPaymentDetails = [...paymentDetails];
    newPaymentDetails.splice(index, 1);
    setPaymentTerms(newPaymentDetails);
  };
  return (
    <>
      <List
        className="mb-3"
        bordered={false}
        dataSource={paymentDetails}
        size="small"
        renderItem={(item, index) => (
          <List.Item
            className="border-0 font-d"
            extra={[
              <div className="d-flex align-items-center">
                <Input
                  type="number"
                  name="value"
                  maxLength="2"
                  placeholder=""
                  style={{
                    width: "40px",
                    border: isValid ? "1px solid #e8e8e8" : "1px solid red",
                  }}
                  className="ant-width-small font-bold radius-4 gray-text"
                  value={item.value}
                  onChange={(e) => handleChange(e, index)}
                  min={0}
                  onBlur={onBlur}
                  max={100}
                />
                <span>%</span>{" "}
                {item.editable && (
                  <DeleteOutlined
                    className="delete-icon"
                    onClick={(e) => handleRemoveTerm(e, index)}
                  />
                )}
              </div>,
            ]}
          >
            {item.editable ? (
              <Input
                placeholder=""
                style={{ width: "88%" }}
                name="title"
                value={item.title}
                onChange={(e) => handleChange(e, index)}
                onBlur={onBlur}
              />
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
                title: "",
                value: "",
                editable: true,
              },
            ]);
            onBlur();
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
