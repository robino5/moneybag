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
import { CSVLink } from "react-csv";
import CIcon from "@coreui/icons-react";
import { cilDescription, cilPrint } from "@coreui/icons";
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
import logo from "../../assets/images/Logo";

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
  const [mercantDetails, setMarchentDetailsList] = useState();
  const [bankbranchList, setBankBranchList] = useState();
  const currentDate = DateTime.now().minus({ days: 2 });
  const ddd = DateTime.fromISO(settlementDate).plus({ days: 1 });

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

  const getMertchantSettlementAccountList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}marchant-details/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMarchentDetailsList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getBankBranchList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankBranchList(responce.data);
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
        sum += element.merchant_order_amount - element.refund_amount;
      });
    setApprovedAmount(sum);
  };

  const saveApprovedTransection = () => {
    let data = [];
    console.log("te", statement);
    statement &&
      statement.map((element) => {
        data.push(element);
      });

    console.log("data", data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}settlements/?settlementDate=${periodFrom}`,
        data,
        {
          headers,
        }
      )
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
    let data = [{ value: "", label: "ALL" }];
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
    return parseFloat(sumOrderAmount).toFixed(2);
  };

  const getotalBankFee = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.bank_charge;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };

  const getotalPgwFee = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.pgw_charge;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };
  const getotalrefundAMount = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.refund_amount;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };
  const getotal = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.merchant_order_amount - element.refund_amount;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };

  const getTransactionStatus = (value) => {
    if (value.dispute_status == "N") {
      return value.gw_order_status;
    } else if (value.dispute_status == "P") {
      return "DISPUTED";
    } else if (value.dispute_status == "C") {
      return "CHARGEBACK";
    } else if (value.dispute_status == "D") {
      return "DECLINE";
    } else if (value.dispute_status == "R") {
      return "REVERSAL";
    }
  };

  const setTextColor = (e) => {
    if (e == "DISPUTED") {
      return "text-warning";
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
      return "text-dark";
    }
  };

  const getDateTime = (e) => {
    let date = DateTime.fromISO(e, {
      zone: "Asia/Dhaka",
    }).toLocaleString(DateTime.DATETIME_MED);

    return date;
  };

  // const getDateTimeObj = (e) => {
  //   console.log(e);
  //   let month;
  //   let date = new Date(e);
  //   console.log(typeof date.getMonth());
  //   if (date.getMonth() < 9) {
  //     month = "0" + (date.getMonth() + 1);
  //   } else {
  //     month = date.getMonth() + 1;
  //   }
  //   console.log(`${date.getFullYear()}-${month}-${date.getDate() + 1}`);
  //   return `${date.getFullYear()}-${month}-${date.getDate() + 1}`;
  // };

  const getDateTimeObj = (e) => {
    let date = DateTime.fromISO(e).plus({ days: 1 });
    return date;
  };

  const getMerchantSettlementDetail = (merhcntdetail) => {
    let data;
    merhcntdetail?.map((e) => {
      if (e.merchant_no == mercantID) {
        data = e;
      }
    });
    return data;
  };

  const getBankBranchName = (bankBranck) => {
    let name;
    bankbranchList?.map((element) => {
      if (element.id == bankBranck) {
        name = element.branch_name;
      }
    });
    return name;
  };

  const setDateForEcecl = (e) => {
    let data = [];
    e?.map((element) => {
      data.push({
        Order_ID: element.merchant_tran_id,
        Transaction_ID: element.txn_id,
        Merchant_id: element.merchant_id,
        Merchant_Name: element.merchant_name,
        mercant_short_name: element.short_name,
        Transaction_date: DateTime.fromISO(element.created_at, {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED),
        Order_Amount: parseFloat(element.merchant_order_amount).toFixed(2),
        Bank_fee: element.bank_charge,
        Pgw_fee: element.pgw_charge,
        Refund_Amount: element.refund_amount ? element.refund_amount : 0,
        Payable_Amount: parseFloat(
          element.merchant_order_amount - element.refund_amount
        ).toFixed(2),
        Transaction_Status: element.gw_order_status,
      });
    });
    console.log("data", data);
    return data;
  };

  const reportButtonStatus = () => {
    if (!mercantID || !periodFrom) {
      return true;
    } else {
      return false;
    }
  };

  const column = [
    {
      name: "Order ID",
      selector: (row) => row.merchant_tran_id,
      sortable: true,
      minWidth: "135px;",
    },
    {
      name: "Trn ID",
      selector: (row) => row.txn_id,
      sortable: true,
      minWidth: "200px;",
    },
    {
      name: "Merchant Short Name",
      sortable: true,
      selector: (row) => getMerchantName(row.merchant_id),
      minWidth: "70px;",
    },

    {
      name: "Transaction Date",
      selector: (row) =>
        DateTime.fromISO(row.gw_txn_timestamp, {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED),
      sortable: true,
      minWidth: "70px;",
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
      selector: (row) =>
        row.refund_amount ? parseFloat(row.refund_amount).toFixed(2) : 0,
      sortable: true,
    },
    {
      name: "Payable Amount",
      selector: (row) =>
        parseFloat(row.merchant_order_amount - row.refund_amount).toFixed(2),
      sortable: true,
    },
    {
      name: "Transaction Status",
      selector: (row) => (
        <strong className={setTextColor(row.gw_order_status)}>
          {row.gw_order_status}
        </strong>
      ),
      sortable: true,
    },
  ];

  const dawonloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(8);
    var pageCount = doc.internal.getNumberOfPages();
    var pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
    console.log(doc.internal.getNumberOfPages());
    doc.addImage(logo, "JPEG", 80, 3);
    doc.text(
      `Merchant Id:${getMerchantDetail(merchantList).merchant_id}`,
      15,
      25
    );
    doc.text(
      `Merchant Name:${getMerchantDetail(merchantList).business_name}`,
      65,
      25
    );
    doc.text(
      `Merchant Short Name:${getMerchantDetail(merchantList).short_name}`,
      140,
      25
    );
    doc.text(
      `Settlement Bank:${getBankBranchName(
        getMerchantSettlementDetail(mercantDetails).bank_no
      )}`,
      15,
      30
    );
    doc.text(
      `Settlement Branch:${getBankBranchName(
        getMerchantSettlementDetail(mercantDetails).branch_no
      )}`,
      75,
      30
    );
    doc.text(
      `Settlement Account:${
        getMerchantSettlementDetail(mercantDetails).account_no
      }`,
      140,
      30
    );
    doc.text(
      `Merchant Address:${getMerchantDetail(merchantList).business_address1}`,
      15,
      35
    );
    doc.text(
      `Period:${getDateTime(
        settlementDate ? settlementDate : ""
      )} - ${getDateTime(periodFrom)}`,
      68,
      40
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
    doc.text("page: " + pageCurrent + " of " + pageCount, 175, pageHeight - 5);
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
        { header: "Payable Amount", dataKey: "merchant_charge_amount" },
        { header: "Transaction Status", dataKey: "gw_order_status" },
      ],
      body: [
        ...statement.map((element) => [
          element.merchant_tran_id,
          element.txn_id,
          DateTime.fromISO(element.gw_txn_timestamp, {
            zone: "Asia/Dhaka",
          }).toLocaleString(DateTime.DATETIME_MED),
          element.merchant_order_amount,
          element.bank_charge,
          element.pgw_charge,
          element.refund_amount,
          element.merchant_order_amount - element.refund_amount,
          element.gw_order_status,
        ]),
        [
          {
            content: `Total-Amount =`,
            colSpan: 3,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalOrderAmount(statement),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalBankFee(statement),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalPgwFee(statement),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalrefundAMount(statement),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotal(statement),
            colSpan: 2,
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
      margin: { top: 43 },
    });

    for (var i = 0; i < pageCount; i++) {
      doc.setPage(i);
      doc.addImage(logo, "JPEG", 80, 3);
      doc.text(
        `Merchant Id:${getMerchantDetail(merchantList).merchant_id}`,
        15,
        25
      );
      doc.text(
        `Merchant Name:${getMerchantDetail(merchantList).business_name}`,
        65,
        25
      );
      doc.text(
        `Merchant Short Name:${getMerchantDetail(merchantList).short_name}`,
        140,
        25
      );
      doc.text(
        `Settlement Bank:${getBankBranchName(
          getMerchantSettlementDetail(mercantDetails).bank_no
        )}`,
        15,
        30
      );
      doc.text(
        `Settlement Branch:${getBankBranchName(
          getMerchantSettlementDetail(mercantDetails).branch_no
        )}`,
        75,
        30
      );
      doc.text(
        `Settlement Account:${
          getMerchantSettlementDetail(mercantDetails).account_no
        }`,
        140,
        30
      );
      doc.text(
        `Merchant Address:${getMerchantDetail(merchantList).business_address1}`,
        15,
        35
      );
      doc.text(
        `Period:${getDateTime(
          settlementDate ? settlementDate : ""
        )} - ${getDateTime(periodFrom)}`,
        68,
        40
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
      doc.text(
        "page: " + pageCurrent + " of " + pageCount,
        175,
        pageHeight - 5
      );
    }
    console.log(pageCount);
    doc.save(`process_settlement${Date()}.pdf`);
  };

  useEffect(() => {
    const getAllData = async () => {
      await getMerchantList();
      await getStatementList();
      await getMertchantSettlementAccountList();
      await getBankBranchList();
    };
    getAllData();
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
                    min={
                      settlementDate
                        ? getDateTimeObj(settlementDate).toISO().slice(0, 10)
                        : ""
                    }
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
                    disabled={approvedAmount == 0 ? true : false}
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
              title="Settlement"
              columns={column}
              data={statement}
              pagination={50}
              actions={
                <div>
                  <CButton
                    className="btn mx-1 btn-secondary"
                    disabled={reportButtonStatus()}
                    onClick={dawonloadReport}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>
                  <CSVLink
                    data={setDateForEcecl(statement)}
                    className="btn btn-secondary"
                    filename={`process_settlement${Date()}`}
                  >
                    <CIcon icon={cilDescription} />
                  </CSVLink>
                </div>
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
