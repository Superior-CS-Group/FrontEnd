import React from "react";
import { Input, List } from "antd";

function EstimateSettings({
  totalCharge,
  estimationSettings,
  setEstimationSettings,
  onBlur,
}) {
  const [estimateSettings, setEstimateSettings] = React.useState([
    {
      title: "Bulit In Design Cost",
      cost: 0,
      pricebtn: "danger-text",
      type: "builtInDesignCost",
    },
    {
      title: "Fluff Number Discount?",
      cost: 0,
      pricebtn: "gray-text",
      type: "fluffNumberDiscount",
    },
    {
      title: "Discount Amount",
      cost: 0,
      pricebtn: "danger-text",
      type: "discountAmount",
    },
    {
      title: "Total Without Discount",
      cost: 0,
      pricebtn: "warring-text",
      type: "totlaWithoutDiscount",
    },
  ]);
  const [discount, setDiscount] = React.useState(0);

  React.useEffect(() => {
    const newEstimateSettings = [...estimateSettings];
    const discount = estimateSettings.find(
      (item) => item.type === "fluffNumberDiscount"
    );
    discount.cost = estimationSettings.fluffNumberDiscount;
    setEstimateSettings(newEstimateSettings);
    setDiscount(estimationSettings.fluffNumberDiscount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimationSettings]);

  React.useEffect(() => {
    let newEstimationSettings = [...estimateSettings];
    const discountAmount = (totalCharge * (discount / 100)).toFixed(2);
    newEstimationSettings = newEstimationSettings.map((item) => {
      if (item.type === "discountAmount") {
        item.cost = discountAmount;
      } else if (item.type === "fluffNumberDiscount") {
        item.cost = discount;
      } else if (item.type === "totlaWithoutDiscount") {
        item.cost = totalCharge;
      }
      return item;
    });
    setEstimateSettings(newEstimationSettings);
    if (discount) {
      setEstimationSettings({
        ...estimationSettings,
        fluffNumberDiscount: discount,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount, totalCharge]);

  return (
    <>
      <List
        bordered={false}
        dataSource={estimateSettings}
        size="small"
        renderItem={(item) => {
          return (
            <List.Item
              className="border-0 font-d"
              extra={[
                item.type === "fluffNumberDiscount" ? (
                  <Input
                    placeholder="Discount Percentage"
                    className={`ant-width font-bold radius-4 ${item.pricebtn}`}
                    value={item.cost}
                    onChange={(e) =>
                      e.target.value < 100 && setDiscount(e.target.value)
                    }
                    type="number"
                    min={0}
                    max={100}
                    onBlur={onBlur}
                  />
                ) : (
                  <Input
                    placeholder="Basic usage"
                    className={`ant-width font-bold radius-4 ${item.pricebtn}`}
                    value={item.cost}
                    disabled
                    onChange={(e) => setDiscount(e.target.value)}
                    type="number"
                    onBlur={onBlur}
                  />
                ),
              ]}
            >
              {item.title}
            </List.Item>
          );
        }}
      />
    </>
  );
}

export default EstimateSettings;
