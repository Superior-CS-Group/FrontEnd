import React, { useEffect, useState } from "react";
import PreviewBanner from "../../../src/images/estimate-banner.png";
import MountSky from "../../../src/images/mount-sky.png";
import { Divider, Button, Input, Row, Col, Form } from "antd";
import ReactQuill from "react-quill";
import SimpleEMailSent from "../email/simple.emailsent.component";
import ModalMain from "../modal/modal.component";
import { useParams } from "react-router-dom";
import { postData } from "../../utils/fetchApi";
import { sendEstimateContract } from "../../api/estimate-contract";
import { Document, Page, pdfjs } from "react-pdf";
// import dataPDF from "../../contract1.pdf";
export default function ContractPdf(props) {
  const url =
    "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf";

  pdfjs.GlobalWorkerOptions.workerSrc = `https//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const params = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
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

  const [editPreviewDiv, setEditPreviewDiv] = useState(false);
  const [editPreviewText, setEditPreviewText] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const [ModalVisible, setModalVisible] = useState(false);

  let handleEdit = () => {
    setEditPreviewDiv(true);
    setEditPreviewText(false);
  };
  let updateData = () => {
    setEditPreviewDiv(false);
    setEditPreviewText(true);
  };
  let handleChange = (html) => {
    setEditorHtml(html);
  };
  let handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const id = params.id;

    if (id) {
      const body = { id };
      const fetchData = async () => {
        const result = await postData(`customer/get-info`, body);
        // console.log("result.data.Data",result.data.Data)
        let userstatus;
        let autoReminder;

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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <>
      <div className="main text-center mt-4">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <div className="buttonc">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="Pre"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
