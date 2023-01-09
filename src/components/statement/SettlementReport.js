import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Description from "./Description";
import Nav from "../Nav";
import { DateTime } from "luxon";
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

const SettlementReport = () => {
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
  const [Settlements, setSettlements] = useState();
  const [statementdetails, setStatementDetails] = useState();
  console.log("setelmsnt", Settlements);

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
      .get(`${process.env.REACT_APP_API_URL}settlements/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setSettlements(responce.data);
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
      merchent_name: merchnatName,
      period_from: periodFrom,
      period_to: periodTo,
    };
    if (!merchnatName) {
      delete data.merchent_name;
    }
    if (!periodFrom) {
      delete data.period_from;
    }
    if (!periodTo) {
      delete data.period_to;
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
        `${process.env.REACT_APP_API_URL}settlements?${encodeDataToURL(data)}`,
        { headers }
      )
      .then((response) => {
        console.log(response);
        setSettlements(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // console.log(data);
  };

  const onCancel = () => {
    navigate("/deshbord");
  };

  const column = [
    {
      name: "Settlement From",
      selector: (row) =>
        DateTime.fromISO(row.settlement_from, {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED),
    },
    {
      name: "settlement_to",
      selector: (row) =>
        DateTime.fromISO(row.settlement_to, {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED),
    },
    {
      name: "Collection Amount",
      selector: (row) => row.gttl_order_amount,
    },
    {
      name: "Bank Fee",
      selector: (row) => row.gttl_bank_fee,
    },
    {
      name: "PGW Fee",
      selector: (row) => row.gttl_pgw_fee,
    },
    {
      name: "Settlement Amount",
      selector: (row) => row.gttl_total_amount,
    },
    {
      name: "Settlement Date",
      grow: 2,
      selector: (row) =>
        DateTime.fromISO(row.settlement_date, {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED),
    },
    {
      name: "Employee ID",
      selector: (row) => row.created_by,
    },
  ];

  useEffect(() => {
    getMerchantList();
    getStatementList();
  }, []);

  return (
    <div className="">
      <Nav />
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
                <p>Settelement Date</p>
                <CFormLabel className="mt-2">Period from</CFormLabel>
                <CFormInput size="sm" type="date" onChange={handlePeriodFrom} />
                <CFormLabel className="mt-2">Period To</CFormLabel>
                <CFormInput size="sm" type="date" onChange={handlePeriodTo} />
                {/* <CFormLabel className="mt-2">Status</CFormLabel>
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
                {/* <CFormLabel className="mt-2">Amount from</CFormLabel>
                <CFormInput size="sm" type="text" onChange={handleAmountFrom} />
                <CFormLabel className="mt-2">Amount To</CFormLabel>
                <CFormInput size="sm" type="text" onChange={handleAmountTo} />
                <CFormLabel className="mt-2">Order by</CFormLabel>
                <CFormSelect size="sm" onChange={handleOrderBy}>
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
            title="Settlement Report"
            columns={column}
            data={Settlements}
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
    </div>
  );
};

export default SettlementReport;
