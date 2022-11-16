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
  CAvatar,
} from "@coreui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Visa from "./../../assets/images/Visa_Logo.png";
import MasterCard from "./../../assets/images/MasterCard_Logo.png";
import AmericanExpress from "./../../assets/images/American-Express-logo.png";
import Bkash from "./../../assets/images/bkash-logo.png";
import Nagad from "./../../assets/images/Nagad-Logo.png";

const Payment = () => {
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
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <br></br>
        <h5>Payment channels</h5>
        <hr></hr>
        <div>
        <p>Accepcted Card</p>
          <CButton color="secondary" className="payment_wrapper"><CAvatar className="payment_logo_wrapper" src={Visa} size="xl" /></CButton>
          &nbsp;&nbsp;&nbsp;
          <CButton color="secondary" className="payment_wrapper"><CAvatar className="payment_logo_wrapper" src={MasterCard} size="xl" /></CButton>
          &nbsp;&nbsp;&nbsp;
          <CButton color="secondary" className="payment_wrapper"><CAvatar className="payment_logo_wrapper" src={AmericanExpress} size="xl" /></CButton>
        </div>
    <br></br>
        <div>
        <p>Mobile Banking</p>
          <CButton color="secondary" className="payment_wrapper"><CAvatar className="payment_logo_wrapper" src={Bkash} size="xl" /></CButton>
          &nbsp;&nbsp;&nbsp;
          <CButton color="secondary" className="payment_wrapper"><CAvatar className="payment_logo_wrapper" src={Nagad} size="xl" /></CButton>
        </div>
      </CContainer>
    </div>
  );
};

export default Payment;
