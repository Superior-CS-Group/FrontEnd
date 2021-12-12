import React, { useEffect, useState } from "react";
// import PreviewBanner from "../../../src/images/estimate-banner.png";
// import MountSky from "../../../src/images/mount-sky.png";
import { useParams } from "react-router-dom";
import { postData } from "../../utils/fetchApi";
// import dataPDF from "../../contract2.pdf";
export default function ContractPdf(props) {
  const dataMainPDF = "http://www.africau.edu/images/default/sample.pdf";
  const params = useParams();
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

  useEffect(() => {
    const id = params.id;

    if (id) {
      const body = { id };
      const fetchData = async () => {
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

  return (
    <>
      <div className="main text-center mt-4">
        <iframe
          src={dataMainPDF}
          style={{ height: "100vh", width: "100%" }}
          title="pdf"
        ></iframe>
      </div>
    </>
  );
}
