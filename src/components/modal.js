import React, { useState } from "react";
import "./Modal.css";

import FollowUp from "../pages/Customers/FollowUp";




export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Expo to email
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">

          <FollowUp />





            <button className="close-modal" onClick={toggleModal}>
            
            </button>
          </div>
        </div>
      )}
     
    </>
  );
}
