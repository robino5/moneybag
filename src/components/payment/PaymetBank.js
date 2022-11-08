import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import {
  CCol,
  CContainer,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const PaymetBank = () => {
  // const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const addResponce = () => {
    const data = {
      merchant_id: 5,
      merchant_pass: 12345,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}sessions/create-session/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response.data.session_id);
        swal({
          position: "top-end",
          text: "Organization Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/payment-details", {
          state: response.data.session_id,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal({
          position: "top-end",
          text: error.response.data.detail,
          icon: "error",
          button: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      {/* <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} size="xl">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <iframe
            src="https://coreui.io/react/docs/components/modal/"
            width="100%"
            height="800"
          ></iframe>
        </CModalBody>
      </CModal> */}

      <CButton onClick={addResponce}>ADD</CButton>
    </>
  );
};

export default PaymetBank;
