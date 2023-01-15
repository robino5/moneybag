import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Description from "./Description";
import { DateTime } from "luxon";
import swal from "sweetalert";
import Nav from "../Nav";
import { StatementSidebar, AppFooter, StatementHeader } from "../index.js";
import Select from "react-select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
  const [mercantID, setMerchantID] = useState();
  const [settlementDate, setSettlementDate] = useState();
  const currentDate = DateTime.now().minus({ days: 1 });

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

  console.log(currentDate.toISO().split("T")[0]);

  const getMerchantName = (e) => {
    let name;
    merchantList?.map((mercant) => {
      if (mercant.merchant_id == e) {
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
  const handleMerchantID = (e) => {
    console.log(e);
    setMerchantID(e.value);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}settlements/fetch-last-settlement-date/${e.value}`,
        { headers }
      )
      .then((response) => {
        console.log(response);
        setSettlementDate(response.data.lastSettlementDate);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
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
      merchant_id: mercantID,
      gw_txn_date: periodFrom,
      settlement_query: true,
    };

    if (!mercantID) {
      delete data.merchant_id;
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
        if (error.response.status == 401) {
          navigate("/login");
        }
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
        if (error.response.status == 401) {
          navigate("/login");
        }
        swal({
          position: "top-end",
          text: error.response.data.detail,
          icon: "error",
          button: false,
          timer: 1500,
        });
      });
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

  const getMerchantDetail = (merhcnt) => {
    let data;
    merhcnt?.map((e) => {
      if (e.id == mercantID) {
        data = e;
      }
    });
    return data;
  };

  const getotalOrderAmount = (e) => {
    let sumOrderAmount = 0;
    e.map((element) => {
      sumOrderAmount += element.merchant_order_amount;
    });
    return sumOrderAmount;
  };

  const getotalBankFee = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.bank_charge;
    });
    return sumBankFee;
  };

  const getotalPgwFee = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.pgw_charge;
    });
    return sumBankFee;
  };
  const getotalrefundAMount = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.refund_amount;
    });
    return sumBankFee;
  };
  const getotal = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee +=
        element.merchant_order_amount +
        element.pgw_charge -
        element.refund_amount;
    });
    return sumBankFee;
  };

  const getTransactionStatus = (value) => {
    if (value.dispute_status == "N") {
      return value.gw_order_status;
    } else if ((value.dispute_status == "P")) {
      return "DISPUTED";
    } else if ((value.dispute_status == "C")) {
      return "CHARGEBACK";
    } else if ((value.dispute_status == "D")) {
      return "DECLINE";
    } else if ((value.dispute_status == "R")) {
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
      name: "Order ID",
      selector: (row) => row.merchant_tran_id,
      sortable: true,
    },
    {
      name: "Trn ID",
      selector: (row) => row.txn_id,
      sortable: true,
    },
    {
      name: "Merchant Short Name",
      sortable: true,
      selector: (row) => getMerchantName(row.merchant_id),
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
      selector: (row) => parseFloat(row.bank_charge).toFixed(2),
      sortable: true,
    },
    {
      name: "PGW Fee",
      selector: (row) => parseFloat(row.pgw_charge).toFixed(2),
      sortable: true,
    },
    {
      name: "Refund Amount",
      selector: (row) => parseFloat(row.refund_amount).toFixed(2),
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) =>
        parseFloat(
          row.merchant_order_amount + row.pgw_charge - row.refund_amount
        ).toFixed(2),
      sortable: true,
    },
    {
      name: "Transaction Status",
      selector: (row) => <span className={setTextColor(getTransactionStatus(row))}>{getTransactionStatus(row)}</span>,
      sortable: true,
    },
  ];

  const dawonloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(8);
    doc.text(
      `Mercnat Id:${getMerchantDetail(merchantList).merchant_id}`,
      15,
      8
    );
    doc.text(
      `Mercnat Name:${getMerchantDetail(merchantList).business_name}`,
      65,
      8
    );
    doc.text(
      `Mercnat Short Name:${getMerchantDetail(merchantList).short_name}`,
      140,
      8
    );
    doc.text(
      `Mercnat Address:${getMerchantDetail(merchantList).business_address1}`,
      15,
      12
    );
    var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    doc.text(
      `Print Date & Time:${DateTime.fromISO(DateTime.now(), {
        zone: "Asia/Dhaka",
      }).toLocaleString(DateTime.DATETIME_MED)}`,
      15,
      pageHeight - 10
    );
    doc.text(
      `Print by:${localStorage.getItem("username")}`,
      100,
      pageHeight - 10
    );
    doc.text(`Powered By Moneybag`, 165, pageHeight - 10);
    doc.autoTable({
      columns: [
        { header: "Order ID", dataKey: "merchant_tran_id" },
        { header: "Transaction ID", dataKey: "txn_id" },
        {
          header: "Transaction Date",
          dataKey: "created_at",
        },
        { header: "Order Amount", dataKey: "merchant_order_amount" },
        { header: "Bank Fee", dataKey: "bank_charge" },
        { header: "PGW Fee", dataKey: "pgw_charge" },
        { header: "Refund Amount", dataKey: "refund_amount" },
        { header: "Total Amount", dataKey: "merchant_charge_amount" },
        { header: "Transaction Status", dataKey: "gw_order_status" },
      ],
      body: [
        ...statement.map((element) => [
          element.merchant_tran_id,
          element.txn_id,
          DateTime.fromISO(element.created_at, {
            zone: "Asia/Dhaka",
          }).toLocaleString(DateTime.DATETIME_MED),
          element.merchant_order_amount,
          element.bank_charge,
          element.pgw_charge,
          element.refund_amount,
          element.merchant_order_amount +
            element.pgw_charge -
            element.refund_amount,
          getTransactionStatus(element),
        ]),
        [
          {
            content: `Total-Amount =                                                                                                         ${getotalOrderAmount(
              statement
            )}                        ${getotalBankFee(
              statement
            )}                  ${getotalPgwFee(
              statement
            )}                   ${getotalrefundAMount(
              statement
            )}                        ${getotal(statement)}`,
            colSpan: 9,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
        ],
      ],
      // didDrawPage: function (data) {
      //   let rows = data.table.body;
      //   rows.push({
      //     content: "Total = " + 67890,
      //     colSpan: 2,
      //   });
      // },
      showHead: "everyPage",
      styles: { fontSize: 6 },
    });
    doc.save("process_settlement.pdf");
  };

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
                  <CFormLabel className="mt-2">Last Settlement Date</CFormLabel>
                  <CFormInput
                    size="sm"
                    disabled={true}
                    type="date"
                    value={settlementDate ? settlementDate : ""}
                  />

                  <CFormLabel className="mt-2">Settlement Date</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="date"
                    min={settlementDate}
                    max={currentDate.toISO().split("T")[0]}
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
              actions={
                <CButton
                  className="btn btn-sm"
                  color="primary"
                  disabled={!mercantID ? true : false}
                  onClick={dawonloadReport}
                >
                  Print
                </CButton>
              }
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
