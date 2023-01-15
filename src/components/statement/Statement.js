import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Description from "./Description";
import { DateTime } from "luxon";
import Nav from "../Nav";
import { StatementSidebar, AppFooter, StatementHeader } from "../index.js";
import Select from "react-select";
import {
  CCard,
  CCardBody,
  CFormSelect,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalTitle,
  CModalHeader,
} from "@coreui/react";
import { render } from "@testing-library/react";

const Statement = () => {
  const navigate = useNavigate();
  const [merchantList, setMerchantList] = useState();
  const [visible, setVisible] = useState(false);
  const [orderAmount, setOrderAmount] = useState("");
  const [merchnatName, setMerchantName] = useState("");
  const [periodFrom, setPeriodFrom] = useState("");
  const [periodTo, setPeriodTo] = useState("");
  const [staus, setStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const [amontFrom, setAmountFrom] = useState("");
  const [amontTo, setAmountTo] = useState("");
  const [orderby, setOrderBy] = useState("");
  const [statement, setStatement] = useState();
  const [statementdetails, setStatementDetails] = useState();
  const [mercantID, setMerchantID] = useState();

  const getMerchantList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}marchants/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMerchantList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getStatementList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}txn-statements/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setStatement(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  // const getMerchantName = (e) => {
  //   let name;
  //   merchantList?.map((mercant) => {
  //     if (mercant.marchant_id == e) {
  //       name = mercant.business_name;  
  //     }
  //   });
  //   return name;
  // };

  // const getSerial = (e) => {
  //   setSerial(serial + e);
  //   return serial;
  // };

  const openDetails = async (e) => {
    setStatementDetails(e);
    setVisible(!visible);
  };

  const handleOrderNumber = (e) => {
    setOrderAmount(e.target.value);
  };
  const handleMerchantID = (e) => {
    console.log(e);
    setMerchantID(e.value);
  };
  const handleMerchnatName = (e) => {
    setMerchantName(e.target.value);
  };
  const handlePeriodFrom = (e) => {
    setPeriodFrom(e.target.value);
  };
  const handlePeriodTo = (e) => {
    setPeriodTo(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };
  const handleAmountFrom = (e) => {
    setAmountFrom(e.target.value);
  };
  const handleAmountTo = (e) => {
    setAmountTo(e.target.value);
  };
  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  //   console.log(orderAmount);
  //   console.log(periodTo);

  const searchStatemet = (e) => {
    e.preventDefault();

    const data = {
      order_id: orderAmount,
      merchant_id: mercantID,
      period_from: `${periodFrom}T00:00:00`,
      period_to: `${periodTo}T23:59:59`,
      status: staus,
      currency: currency,
      amount_from: amontFrom,
      amount_to: amontTo,
      order_by: orderby,
    };
    if (!orderAmount) {
      delete data.order_id;
    }
    if (!mercantID) {
      delete data.merchant_id;
    }
    if (!periodFrom) {
      delete data.period_from;
    }
    if (!periodTo) {
      delete data.period_to;
    }
    if (!staus) {
      delete data.status;
    }
    if (!currency || currency == "ALL") {
      delete data.currency;
    }
    if (!amontFrom) {
      delete data.amount_from;
    }
    if (!amontTo) {
      delete data.amount_to;
    }
    if (!orderby) {
      delete data.order_by;
    }

    const encodeDataToURL = (data) => {
      return Object.keys(data)
        .map((value) => `${value}=${encodeURIComponent(data[value])}`)
        .join("&");
    };
    console.log(encodeDataToURL(data));

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}txn-statements?${encodeDataToURL(
          data
        )}`,
        { headers }
      )
      .then((response) => {
        console.log(response);
        setStatement(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // console.log(data);
  };

  const onCancel = () => {
    navigate("/deshbord");
  };

  const getmerchantoptions = (merchantList) => {
    let data = [];
    merchantList?.map((merchant) => {
      if (merchant.is_active == 1) {
        data.push({ value: merchant.id, label: merchant.business_name });
      }
    });
    return data;
  };

  const getTransactionStatus = (value) => {
    if (value.dispute_status == "N") {
      return value.gw_order_status;
    }  if ((value.dispute_status == "P")) {
      return "DISPUTED";
    }  if ((value.dispute_status == "C")) {
      return "CHARGEBACK";
    }  if ((value.dispute_status == "D")) {
      return "DECLINE";
    }  if ((value.dispute_status == "R")) {
      return "REVERSAL";
    }
  };

  const setTextColor=(e)=>{
    if(e=="DISPUTED"){
      return "text-primary"
    }
    else if(e=="DECLINE"){
      return "text-danger"
    }
    else{
      return "text-dark"
    }
 }

  const column = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      maxWidth: "15px",
    },
    {
      name: "Order ID",
      selector: (row) => row.merchant_tran_id,
    },
    {
      name: "Transection ID",
      selector: (row) => row.txn_id,
    },
    {
      name: "Merchant Name",
      sortable: true,
      grow: 2,
      selector: (row) => row.merchant_name,
    },

    {
      name: "Creation date",
      grow: 2,
      selector: (row) =>
        DateTime.fromISO(row.created_at, { zone: "Asia/Dhaka" }).toLocaleString(
          DateTime.DATETIME_MED
        ),
    },
    {
      name: "Amount",
      selector: (row) => row.merchant_order_amount,
    },
    {
      name: "Refund Amount",
      selector: (row) => row.refund_amount-row.pgw_charge,
    },
    {
      name: "Final Amountt",
      selector: (row) => row.merchant_order_amount - (row.refund_amount-row.pgw_charge),
    },
    {
      name: "Order Status",
      selector: (row) =><span className={setTextColor(getTransactionStatus(row))}>{getTransactionStatus(row)}</span>,
    },
    {
      name: "Description",
      selector: (row) => row.merchant_description,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mx-1"
            CColor="info"
            onClick={() => {
              openDetails(row);
            }}
          >
            Detail
          </CButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getMerchantList();
    getStatementList();
  }, []);

  return (
    <div className="">
      <StatementSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <StatementHeader />
        <CRow>
          <CCol md={3}>
            <CCard>
              <CCardBody>
                <CForm>
                  <CFormLabel>Order Number</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="text"
                    onChange={handleOrderNumber}
                  />
                  <CFormLabel>Merchant Name</CFormLabel>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={getmerchantoptions(merchantList)}
                    onChange={handleMerchantID}
                  />
                  {/* <CFormInput
                    size="sm"
                    type="text"
                    onChange={handleMerchnatName}
                  /> */}
                  <CFormLabel className="mt-2">Period from</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="date"
                    onChange={handlePeriodFrom}
                  />
                  <CFormLabel className="mt-2">Period To</CFormLabel>
                  <CFormInput size="sm" type="date" onChange={handlePeriodTo} />
                  <CFormLabel className="mt-2">Status</CFormLabel>
                  <CFormSelect size="sm" onChange={handleStatus}>
                    <option>APPROVED</option>
                    <option>PENDING</option>
                    <option>REJECTED</option>
                    <option>CANCELED</option>
                  </CFormSelect>
                  <CFormLabel className="mt-2">Currency</CFormLabel>
                  <CFormSelect size="sm" onChange={handleCurrency}>
                    <option>ALL</option>
                    <option>BDT</option>
                  </CFormSelect>
                  <CFormLabel className="mt-2">Amount from</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="text"
                    onChange={handleAmountFrom}
                  />
                  <CFormLabel className="mt-2">Amount To</CFormLabel>
                  <CFormInput size="sm" type="text" onChange={handleAmountTo} />
                  <CFormLabel className="mt-2">Order by</CFormLabel>
                  <CFormSelect size="sm" onChange={handleOrderBy}>
                    <option>ASC</option>
                    <option>DESC</option>
                  </CFormSelect>
                  <CButton
                    className="mt-2"
                    color="primary"
                    onClick={searchStatemet}
                  >
                    Search
                  </CButton>
                  <CButton
                    className="mt-2 mx-2"
                    color="danger"
                    onClick={onCancel}
                  >
                    Cancel
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={9}>
            <DataTable
              title="Transection List"
              columns={column}
              data={statement}
              paginatio={20}
            />
          </CCol>
        </CRow>
        <div>
          <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Transection Details</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <Description data={statementdetails} />
            </CModalBody>
          </CModal>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Statement;
