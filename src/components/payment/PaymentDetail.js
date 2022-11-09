import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
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
import { Link, useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const PaymentDetail = () => {
  // const [visible, setVisible] = useState(false);
  const location = useLocation();

  const getPaymentList = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}sessions/whoami?sessionId=${location.state}`
      )
      .then((responce) => {
        console.log("responce", responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getPaymentList();
  }, []);

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
    </>
  );
};

export default PaymentDetail;
