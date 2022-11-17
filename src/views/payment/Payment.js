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
  CCard,
  CCardBody,
} from "@coreui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Visa from "./../../assets/images/Visa_Logo.png";
import MasterCard from "./../../assets/images/MasterCard_Logo.png";
import AmericanExpress from "./../../assets/images/American-Express-logo.png";
import Bkash from "./../../assets/images/bkash-logo.png";
import Nagad from "./../../assets/images/Nagad-Logo.png";
import chargeAmount from "./PaymentDetails.json";

const Payment = () => {
  const [paymentDetail, setPaymentDetail] = useState();
  const [chargeDetail, setChargeDetail] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(paymentDetail);
  console.log("charge", chargeDetail);
  const getPaymentList = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}sessions/whoami?sessionId=${location.state}`
      )
      .then((responce) => {
        console.log("responce", responce.data);
        setPaymentDetail(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getChargeAmount = (e) => {
    console.log(e);
    chargeAmount &&
      chargeAmount.map((element) => {
        if (element.paymode === e) {
          setChargeDetail(element);
        }
      });
  };

  const submitPayment = () => {
    const paymentData = {
      merchant_id: "000003",
      order_amount: "200",
      charge_amount: "20",
      order_id: "TXN01010102",
      description: "A Test of Python 2",
      paymode: chargeDetail.paymode,
    };
    console.log(paymentData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}gw-provider/get-pg`, paymentData, {
        headers,
      })
      .then((response) => {
        console.log(response.data.redirectUrl);
        window.open(response.data.redirectUrl);
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
        <CRow>
          <CCol md={8}>
            <h5>Payment channels</h5>
            <hr></hr>
            <div>
              <p>Accepcted Card</p>
              <CButton color="secondary" className="payment_wrapper">
                <CAvatar
                  className="payment_logo_wrapper"
                  onClick={() => {
                    getChargeAmount("VISA");
                  }}
                  src={Visa}
                  size="xl"
                />
              </CButton>
              &nbsp;&nbsp;&nbsp;
              <CButton color="secondary" className="payment_wrapper">
                <CAvatar
                  className="payment_logo_wrapper"
                  onClick={() => {
                    getChargeAmount("MASTER");
                  }}
                  src={MasterCard}
                  size="xl"
                />
              </CButton>
              &nbsp;&nbsp;&nbsp;
              <CButton color="secondary" className="payment_wrapper">
                <CAvatar
                  className="payment_logo_wrapper"
                  onClick={() => {
                    getChargeAmount("AMEX");
                  }}
                  src={AmericanExpress}
                  size="xl"
                />
              </CButton>
            </div>
            <br></br>
            <div>
              <p>Mobile Banking</p>
              <CButton color="secondary" className="payment_wrapper">
                <CAvatar
                  className="payment_logo_wrapper"
                  onClick={() => {
                    getChargeAmount("BKASH");
                  }}
                  src={Bkash}
                  size="xl"
                />
              </CButton>
              &nbsp;&nbsp;&nbsp;
              <CButton color="secondary" className="payment_wrapper">
                <CAvatar
                  className="payment_logo_wrapper"
                  onClick={() => {
                    getChargeAmount("NAGAD");
                  }}
                  src={Nagad}
                  size="xl"
                />
              </CButton>
            </div>
          </CCol>
          <CCol md={4}>
            <CCard className="p-4">
              <CCardBody>
                <h5>Payment Details</h5>
                <hr></hr>
                <p>
                  Payable Amount: {paymentDetail && paymentDetail.order_amount}
                </p>
                <p>
                  Charge Amount: {chargeDetail && chargeDetail.charge_amount}
                </p>
                <hr></hr>
                <p>
                  Total Amount:{" "}
                  {paymentDetail &&
                    chargeDetail &&
                    paymentDetail.order_amount + chargeDetail.charge_amount}
                </p>
                <div className="text-center">
                  <CButton onClick={submitPayment} color="success">
                    Pay
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Payment;
