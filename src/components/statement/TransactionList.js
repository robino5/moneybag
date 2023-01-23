import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import DisputeAdd from "../dispute/DisputeAdd";
import Nav from "../Nav";
import { StatementSidebar, AppFooter, StatementHeader } from "../index.js";
import { DateTime } from "luxon";
import Select from "react-select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Description from "./Description";
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
import logo from "../../assets/images/Logo";

const TransactionList = () => {
  const navigate = useNavigate();
  const [merchantList, setMerchantList] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
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
  const [dispute, setDispute] = useState();
  const [statement, setStatement] = useState();
  const [statementdetails, setStatementDetails] = useState();
  const [statementExcel, setStatementExcel] = useState();
  const [mercantID, setMerchantID] = useState();

  console.log("statement:", statementdetails);

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
        console.log(responce.data),
          setStatementDetails(responce.data),
          setStatementExcel(responce.date);
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
          element.merchant_order_amount +
            element.pgw_charge -
            element.refund_amount
        ).toFixed(2),
        Transaction_Status: element.gw_order_status,
      });
    });
    console.log("data", data);
    return data;
  };

  const openDespute = async (e) => {
    setDispute(e);
    setVisible(!visible);
  };

  const openDetails = async (e) => {
    setStatement(e);
    setVisible2(!visible2);
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
      status: staus,
      amount_from: amontFrom,
      amount_to: amontTo,
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
    if (!staus) {
      delete data.status;
    }
    if (!amontFrom) {
      delete data.amount_from;
    }
    if (!amontTo) {
      delete data.amount_to;
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
        setStatementDetails(response.data);
        setStatementExcel(response.data);
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

  const getMerchantDetail = (merhcnt) => {
    let data;
    merhcnt?.map((e) => {
      if (e.id == mercantID) {
        data = e;
      }
    });
    return data;
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

  const column = [
    {
      name: "Order ID",
      selector: (row) => row.merchant_tran_id,
      sortable: true,
      minWidth: "135px;",
    },
    {
      name: "Transaction ID",
      selector: (row) => row.txn_id,
      sortable: true,
      minWidth: "200px;",
    },
    {
      name: "Merchant Short Name",
      sortable: true,
      selector: (row) => row.short_name,
      minWidth: "70px;",
    },
    {
      name: "Transaction Date",
      selector: (row) =>
        DateTime.fromISO(row.created_at, { zone: "Asia/Dhaka" }).toLocaleString(
          DateTime.DATETIME_MED
        ),
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
      selector: (row) => row.bank_charge,
      sortable: true,
    },
    {
      name: "PGW Fee",
      selector: (row) => row.pgw_charge,
      sortable: true,
    },
    {
      name: "Refund Amount",
      selector: (row) => (row.refund_amount ? row.refund_amount : 0),
      sortable: true,
    },
    {
      name: "Payable Amount",
      selector: (row) =>
        parseFloat(
          row.merchant_order_amount + row.pgw_charge - row.refund_amount
        ).toFixed(2),
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
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mx-1"
            CColor="info"
            disabled={
              row.gw_order_status == "CANCELLED" ||
              row.gw_order_status == "INCOMPLETE"
                ? true
                : false
            }
            onClick={() => {
              openDespute(row);
            }}
          >
            Dispute
          </CButton>
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
      minWidth: "170px",
    },
  ];

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
      sumBankFee +=
        element.merchant_order_amount +
        element.pgw_charge -
        element.refund_amount;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };

  const getDateTime = (e) => {
    let date = DateTime.fromISO(e, {
      zone: "Asia/Dhaka",
    }).toLocaleString(DateTime.DATETIME_MED);

    return date;
  };

  const reportButtonStatus = () => {
    if (!mercantID || !periodFrom || !periodTo) {
      return true;
    } else {
      return false;
    }
  };

  const getTrnCount = (e, status) => {
    let count = 0;
    e?.map((element) => {
      if (element.gw_order_status == status) {
        count += 1;
      }
    });
    return count;
  };

  const gettrnAmount = (e, status) => {
    let sum = 0;
    e?.map((element) => {
      if (element.gw_order_status == status) {
        sum +=
          element.merchant_order_amount +
          element.pgw_charge -
          element.refund_amount;
      }
    });
    return parseFloat(sum).toFixed(2);
  };

  const dawonloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(8);
    var pageCount = doc.internal.getNumberOfPages();
    var pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
    console.log(doc.internal.getNumberOfPages());
      doc.addImage(logo, "JPEG", 80, 3);
      doc.text(
        `Mercnat Id:${getMerchantDetail(merchantList).merchant_id}`,
        15,
        25
      );
      doc.text(
        `Mercnat Name:${getMerchantDetail(merchantList).business_name}`,
        65,
        25
      );
      doc.text(
        `Mercnat Short Name:${getMerchantDetail(merchantList).short_name}`,
        140,
        25
      );
      doc.text(
        `Mercnat Address:${getMerchantDetail(merchantList).business_address1}`,
        15,
        32
      );
      doc.text(
        `Period:${getDateTime(periodFrom)} - ${getDateTime(periodTo)}`,
        68,
        37
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
        ...statementdetails.map((element) => [
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
          element.gw_order_status,
        ]),
        [
          {
            content: `Total-Amount =`,
            colSpan: 3,
            styles: {
              fillColor: [245, 203, 176],
            },
          },
          {
            content: getotalOrderAmount(statementdetails),
            colSpan: 1,
            styles: {
              fillColor: [245, 203, 176],
            },
          },
          {
            content: getotalBankFee(statementdetails),
            colSpan: 1,
            styles: {
              fillColor: [245, 203, 176],
            },
          },
          {
            content: getotalPgwFee(statementdetails),
            colSpan: 1,
            styles: {
              fillColor: [245, 203, 176],
            },
          },
          {
            content: getotalrefundAMount(statementdetails),
            colSpan: 1,
            styles: {
              fillColor: [245, 203, 176],
            },
          },
          {
            content: getotal(statementdetails),
            colSpan: 2,
            styles: {
              fillColor: [245, 203, 176],
            },
          },
        ],
        [
          {
            content: `Approved Transaction = ${getTrnCount(
              statementdetails,
              "APPROVED"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [187, 237, 192],
            },
          },
          {
            content: `Approved Amount = ${gettrnAmount(
              statementdetails,
              "APPROVED"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [187, 237, 192],
            },
          },
          {
            content: `Disputed Transaction = ${getTrnCount(
              statementdetails,
              "DISPUTED"
            )}`,
            colSpan: 3,
            styles: {
              fillColor: [246, 252, 192],
            },
          },
          {
            content: `Disputed Amount = ${gettrnAmount(
              statementdetails,
              "DISPUTED"
            )}`,
            colSpan: 3,
            styles: {
              fillColor: [246, 252, 192],
            },
          },
        ],
        [
          {
            content: `Cancelled Transaction = ${getTrnCount(
              statementdetails,
              "CANCELLED"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [250, 195, 195],
            },
          },
          {
            content: `Cancelled Amount = ${gettrnAmount(
              statementdetails,
              "CANCELLED"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [250, 195, 195],
            },
          },
          {
            content: `Declined Transaction = ${getTrnCount(
              statementdetails,
              "DECLINED"
            )}`,
            colSpan: 3,
            styles: {
              fillColor: [250, 195, 195],
            },
          },
          {
            content: `Declined Amount = ${gettrnAmount(
              statementdetails,
              "DECLINED"
            )}`,
            colSpan: 3,
            styles: {
              fillColor: [250, 195, 195],
            },
          },
        ],
        [
          {
            content: `Reversed Transaction = ${getTrnCount(
              statementdetails,
              "REVERSED"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [199, 220, 242],
            },
          },
          {
            content: `Reversed Amount = ${gettrnAmount(
              statementdetails,
              "REVERSED"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [199, 220, 242],
            },
          },
          {
            content: `Refunded Transaction = ${getTrnCount(
              statementdetails,
              "REFUNDED"
            )}`,
            colSpan: 3,
            styles: {
              fillColor: [210, 247, 246],
            },
          },
          {
            content: `Refunded Amount = ${gettrnAmount(
              statementdetails,
              "REFUNDED"
            )}`,
            colSpan: 3,
            styles: {
              fillColor: [210, 247, 246],
            },
          },
        ],
        [
          {
            content: `Incomplete Transaction = ${getTrnCount(
              statementdetails,
              "INCOMPLETE"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [243, 220, 245],
            },
          },
          {
            content: `Incomplete Amount = ${gettrnAmount(
              statementdetails,
              "INCOMPLETE"
            )}`,
            colSpan: 2,
            styles: {
              fillColor: [243, 220, 245],
            },
          },
        ],
      ],
      showHead: "everyPage",
      styles: { fontSize: 6 },
      margin: { top: 40 },
    });
    for (var i = 0; i < pageCount; i++) {
      doc.setPage(i);
      doc.addImage(logo, "JPEG", 80, 3);
      doc.text(
        `Mercnat Id:${getMerchantDetail(merchantList).merchant_id}`,
        15,
        25
      );
      doc.text(
        `Mercnat Name:${getMerchantDetail(merchantList).business_name}`,
        65,
        25
      );
      doc.text(
        `Mercnat Short Name:${getMerchantDetail(merchantList).short_name}`,
        140,
        25
      );
      doc.text(
        `Mercnat Address:${getMerchantDetail(merchantList).business_address1}`,
        15,
        32
      );
      doc.text(
        `Period:${getDateTime(periodFrom)} - ${getDateTime(periodTo)}`,
        68,
        37
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

    doc.save(`transation${Date()}.pdf`);
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
                  <CFormLabel className="mt-2">Amount from</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="text"
                    onChange={handleAmountFrom}
                  />
                  <CFormLabel className="mt-2">Amount To</CFormLabel>
                  <CFormInput size="sm" type="text" onChange={handleAmountTo} />
                  <CFormLabel className="mt-2">Status</CFormLabel>
                  <CFormSelect size="sm" onChange={handleStatus}>
                    <option value={""}>Select One</option>
                    <option>APPROVED</option>
                    <option>DISPUTED</option>
                    <option>REVERSED</option>
                    <option>REFUNDED</option>
                    <option>DECLINED</option>
                    <option>CANCELLED</option>
                  </CFormSelect>
                  {/* <CFormLabel className="mt-2">Currency</CFormLabel>
                <CFormSelect size="sm" onChange={handleCurrency}>
                  <option>ALL</option>
                  <option>BDT</option>
                </CFormSelect> */}
                  {/* <CFormLabel className="mt-2">Order by</CFormLabel> */}
                  {/* <CFormSelect size="sm" onChange={handleOrderBy}>
                  <option>ASC</option>
                  <option>DESC</option>
                </CFormSelect> */}
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
              title="Transaction List"
              data={statementdetails}
              columns={column}
              paginatio={50}
              actions={
                <div>
                  <CButton
                    className="btn btn-secondary mx-1"
                    color="primary"
                    disabled={reportButtonStatus()}
                    onClick={dawonloadReport}
                  >
                    <CIcon icon={cilPrint} />
                  </CButton>

                  <CSVLink
                    data={setDateForEcecl(statementdetails)}
                    className="btn btn-secondary"
                    filename={`transation${Date()}`}
                  >
                    <CIcon icon={cilDescription} />
                  </CSVLink>
                </div>
              }
            />
          </CCol>
        </CRow>
        <div>
          <CModal
            visible={visible}
            onClose={() => {
              setVisible(false), getStatementList();
            }}
            size="lg"
          >
            <CModalHeader
              onClose={() => {
                setVisible(false), getStatementList();
              }}
            >
              <CModalTitle>Dispute</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <DisputeAdd data={dispute} />
            </CModalBody>
          </CModal>
        </div>
        <div>
          <CModal
            visible={visible2}
            onClose={() => setVisible2(false)}
            size="lg"
          >
            <CModalHeader onClose={() => setVisible2(false)}>
              <CModalTitle>Transaction Details</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <Description data={statement} />
            </CModalBody>
          </CModal>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default TransactionList;
