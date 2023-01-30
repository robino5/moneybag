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
  const [txn, setTxnId] = useState("");
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
  const handleTxnId = (e) => {
    setTxnId(e.target.value);
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
      txn_id: txn,
      merchant_id: mercantID,
      period_from: `${periodFrom}T00:00:00`,
      period_to: `${periodTo}T23:59:59`,
      status: staus == "DISPUTED" ? "" : staus,
      disputed: staus == "DISPUTED" ? true : false,
      currency: currency,
      amount_from: amontFrom,
      amount_to: amontTo,
      order_by: orderby,
    };
    if (!orderAmount) {
      delete data.order_id;
    }
    if (!txn) {
      delete data.txn_id;
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
    if (!staus || staus == "ALL" || staus == "DISPUTED") {
      delete data.status;
    }
    if (staus != "DISPUTED") {
      delete data.disputed;
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
    let data = [{ value: "", label: "ALL" }];
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
    }
    if (value.dispute_status == "P") {
      return "DISPUTED";
    }
    if (value.dispute_status == "C") {
      return "CHARGEBACK";
    }
    if (value.dispute_status == "D") {
      return "DECLINE";
    }
    if (value.dispute_status == "R") {
      return "REVERSAL";
    }
  };

  const setTextColor = (e) => {
    if (e == "INCOMPLETE") {
      return "text-dark";
    } else if (e == "DECLINED") {
      return "text-danger";
    } else if (e == "APPROVED") {
      return "text-success";
    } else if (e == "REVERSED") {
      return "text-primary";
    } else if (e == "REFUNDED") {
      return "text-info";
    } else if (e == "CANCELLED") {
      return "text-muted";
    } else {
      return "text-warning";
    }
  };

  const column = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      width: "55px",
    },
    {
      name: "Order ID",
      selector: (row) => row.merchant_tran_id,
      minWidth: "135px;",
    },
    {
      name: "Transection ID",
      selector: (row) => row.txn_id,
      minWidth: "200px;",
    },
    {
      name: "Merchant Short Name",
      sortable: true,
      selector: (row) => row.short_name,
      minWidth: "70px;",
    },

    {
      name: "Creation date",
      grow: 2,
      selector: (row) =>
        DateTime.fromISO(row.gw_txn_timestamp, {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED),
      minWidth: "70px;",
    },
    {
      name: "Amount",
      selector: (row) => row.merchant_order_amount,
    },
    {
      name: "Refund Amount",
      selector: (row) =>
        row.refund_amount ? row.refund_amount : 0,
    },
    {
      name: "Payable Amount",
      selector: (row) =>
        row.refund_amount
          ? row.merchant_order_amount - row.refund_amount
          : row.merchant_order_amount,
    },
    {
      name: "Order Status",
      selector: (row) => (
        <strong
          className={
            row.dispute_status == "P"
              ? "text-warning"
              : setTextColor(row.gw_order_status)
          }
        >
          {row.dispute_status == "P" ? "DISPUTED" : row.gw_order_status}
        </strong>
      ),
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
                  <CFormLabel>Order ID</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="text"
                    onChange={handleOrderNumber}
                  />
                  <CFormLabel>Transaction ID</CFormLabel>
                  <CFormInput size="sm" type="text" onChange={handleTxnId} />
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
                    <option>ALL</option>
                    <option>APPROVED</option>
                    <option>DISPUTED</option>
                    <option>REVERSED</option>
                    <option>REFUNDED</option>
                    <option>DECLINED</option>
                    <option>CANCELLED</option>
                    <option>INCOMPLETE</option>
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
              title="Merchant Transaction"
              columns={column}
              data={statement}
              paginatio={50}
            />
          </CCol>
        </CRow>
        <div>
          <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Merchant Transaction Detail</CModalTitle>
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
