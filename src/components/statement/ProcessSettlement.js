import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Description from "./Description";
import { DateTime } from "luxon";
import swal from "sweetalert";
import Nav from "../Nav";
import { StatementSidebar, AppFooter, StatementHeader } from "../index.js";
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

const ProcessSettlement = () => {
  const navigate = useNavigate();
  const [merchantList, setMerchantList] = useState();
  const [visible, setVisible] = useState(false);
  // const [orderAmount, setOrderAmount] = useState("");
  const [merchnatName, setMerchantName] = useState("");
  const [periodFrom, setPeriodFrom] = useState("");
  // const [periodTo, setPeriodTo] = useState("");
  // const [staus, setStatus] = useState("");
  // const [currency, setCurrency] = useState("");
  // const [amontFrom, setAmountFrom] = useState("");
  // const [amontTo, setAmountTo] = useState("");
  // const [orderby, setOrderBy] = useState("");
  const [statement, setStatement] = useState();
  const [statementdetails, setStatementDetails] = useState();
  const [approvedAmount, setApprovedAmount] = useState(0);

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

  const getMerchantName = (e) => {
    let name;
    merchantList?.map((mercant) => {
      if (mercant.marchant_id == e) {
        name = mercant.short_name;
      }
    });
    return name;
  };

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
      merchant_name: merchnatName,
      gw_txn_date: periodFrom,
      settlement_query: true,
    };

    if (!merchnatName) {
      delete data.merchant_name;
    }
    if (!periodFrom) {
      delete data.gw_txn_date;
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
        getApprovedSumAmount(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // console.log(data);
  };

  const onCancel = () => {
    navigate("/deshbord");
  };

  const getApprovedSumAmount = (e) => {
    let sum = 0;
    e &&
      e.map((element) => {
        sum += element.merchant_order_amount;
      });
    setApprovedAmount(sum);
  };

  const saveApprovedTransection = () => {
    let data = [];
    statement &&
      statement.map((element) => {
        data.push(element);
      });

    console.log(data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}settlements/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setApprovedAmount(0);
        getStatementList();
        swal({
          position: "top-end",
          text: "Approved Transection Save Successfull",
          icon: "success",
          button: false,
          timer: 1500,
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

  const column = [
    {
      name: "Order ID",
      selector: (row) => row.merchant_tran_id,
      sortable: true,
    },
    {
      name: "TXN ID",
      selector: (row) => row.txn_id,
      sortable: true,
    },
    {
      name: "Merchant Name",
      sortable: true,
      selector: (row) => row.merchant_name,
    },

    {
      name: "Transaction Date",
      selector: (row) =>
        DateTime.fromISO(row.created_at, { zone: "Asia/Dhaka" }).toLocaleString(
          DateTime.DATETIME_MED
        ),
      sortable: true,
    },
    {
      name: "Order Amount",
      selector: (row) => parseFloat(row.merchant_order_amount).toFixed(2),
      sortable: true,
    },
    {
      name: "Bank Fee",
      selector: (row) => parseFloat(row.merchant_charge_amount).toFixed(2),
      sortable: true,
    },
    {
      name: "PGW Fee",
      selector: (row) => 0.0,
      sortable: true,
    },
    {
      name: "Refund Amount",
      selector: (row) => 0.0,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) =>
        parseFloat(
          row.merchant_order_amount + row.merchant_charge_amount
        ).toFixed(2),
      sortable: true,
    },
    {
      name: "Transaction Status",
      selector: (row) => row.gw_order_status,
      sortable: true,
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
                  {/* <CFormLabel>Order Number</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  onChange={handleOrderNumber}
                /> */}
                  <CFormLabel>Merchant Name</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="text"
                    onChange={handleMerchnatName}
                  />
                  <CFormLabel className="mt-2">Settlement Date</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="date"
                    onChange={handlePeriodFrom}
                  />
                  <CButton
                    className="mt-2 mx-2"
                    color="primary"
                    onClick={searchStatemet}
                  >
                    Search
                  </CButton>
                  <CButton
                    className="mt-2"
                    color="warning"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Reset
                  </CButton>
                  <br></br>
                  {/* <CFormLabel className="mt-2">Period To</CFormLabel>
                <CFormInput size="sm" type="date" onChange={handlePeriodTo} />
                <CFormLabel className="mt-2">Status</CFormLabel>
                <CFormSelect size="sm" onChange={handleStatus}>
                  <option>APPROVED</option>
                  <option>PENDING</option>
                  <option>REJECTED</option>
                  <option>CANCELED</option>
                </CFormSelect> */}
                  {/* <CFormLabel className="mt-2">Currency</CFormLabel>
                <CFormSelect size="sm" onChange={handleCurrency}>
                  <option>ALL</option>
                  <option>BDT</option>
                </CFormSelect> */}
                  <CFormLabel className="mt-2">Settelement Amount</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="text"
                    disabled={true}
                    value={parseFloat(approvedAmount).toFixed(2)}
                  />
                  {/* <CFormLabel className="mt-2">Amount To</CFormLabel>
                <CFormInput size="sm" type="text" onChange={handleAmountTo} />
                <CFormLabel className="mt-2">Order by</CFormLabel>
                <CFormSelect size="sm" onChange={handleOrderBy}>
                  <option>ASC</option>
                  <option>DESC</option>
                </CFormSelect> */}
                  <CButton
                    className="mt-2"
                    color="info"
                    disabled={approvedAmount <= 0 ? true : false}
                    onClick={saveApprovedTransection}
                  >
                    Process
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
              title="Process Settlement"
              columns={column}
              data={statement}
              pagination={20}
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

export default ProcessSettlement;
