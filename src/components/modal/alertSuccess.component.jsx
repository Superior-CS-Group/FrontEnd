import React, { useState } from "react";
import { Alert } from "antd";

export default function AlertSuccess() {
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div>
      {visible ? (
        <Alert
          message="Alert Message Text "
          type="success"
          closable
          afterClose={handleClose}
        />
      ) : null}
    </div>
  );
}
