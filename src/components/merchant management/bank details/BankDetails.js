import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
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
} from "@coreui/react";

const BankDetails = ({ clickNext }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [pageSetup, setPageSetup] = useState(0);
  const [marchantDetail, setMarchentDetailsList] = useState();
  const [lookupList, setLooupList] = useState();
  const [bankbranchList, setBankBranchList] = useState();

  const saveBusinessDetails = (e) => {
    const businessDetailData = {
      merchant_no: localStorage.getItem("merchant_no"),
      currency_no: parseInt(e.currency),
      bank_no: parseInt(e.bank_name),
      branch_no: parseInt(e.branch_name),
      routing_no: e.routing_no,
      account_name: e.account_name,
      account_no: e.account_number,
    };
    console.log(businessDetailData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}marchant-details/`,
        businessDetailData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Store Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        localStorage.setItem("isBankDetailDate", 1);
        reset();
        getMertchantList();
        setPageSetup(0);
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

  const getMertchantList = async () => {
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
      });
  };

  const getLookupList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}lookups/detail-list`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setLooupList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
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
      });
  };

  const getcurrencyOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 5001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const getBankOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.bank_flag === 1 && element.is_active === 1) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  const getBranchOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.bank_flag === 0 && element.is_active === 1) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  const getMercnatdetails = (e) => {
    let data = [];
    e?.map((element) => {
      if (element.merchant_no == localStorage.getItem("merchant_no")) {
        data.push(element);
      }
    });
    return data;
  };

  const setBankName = (e) => {
    let bankName;
    bankbranchList &&
      bankbranchList.map((bankBranch) => {
        if (bankBranch.id === e.bank_no) {
          bankName = bankBranch.branch_name;
        }
      });
    return bankName;
  };

  const setBranchName = (e) => {
    let bankName;
    bankbranchList &&
      bankbranchList.map((bankBranch) => {
        if (bankBranch.id === e.branch_no) {
          bankName = bankBranch.branch_name;
        }
      });
    return bankName;
  };

  const setCurrenct = (e) => {
    let currency;
    lookupList &&
      lookupList.map((lookup) => {
        if (lookup.id === e.currency_no) {
          currency = lookup.name;
        }
      });
    return currency;
  };

  useEffect(() => {
    const getAllDate = async () => {
      await getMertchantList();
      await getLookupList();
      await getBankBranchList();
    };
    getAllDate();
  }, []);

  const comumn = [
    {
      name: "Currency",
      selector: (row) => setCurrenct(row),
      maxWidth: "80px",
    },
    {
      name: "Bank Name",
      selector: (row) => setBankName(row),
    },
    {
      name: "Branch Name",
      selector: (row) => setBranchName(row),
    },
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    {
      name: "Account Nmmber",
      selector: (row) => row.account_no,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          {/* <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            // onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton> */}
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/update-bank-details", {
                state: row,
              });
            }}
          >
            Update
          </CButton>
        </div>
      ),
    },
  ];
  const handlePageSetup = () => {
    setPageSetup(1);
  };

  return (
    <div>
      <div hidden={pageSetup !== 0 ? true : false}>
        <div className="justify-content-centert mb-2">
          <CButton color="primary" onClick={handlePageSetup}>
            Add New
          </CButton>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              columns={comumn}
              data={getMercnatdetails(marchantDetail)}
              pagination
            />
          </CCol>
        </CRow>
        <div className="text-center">
          <CButton
            onClick={() => {
              clickNext(1);
            }}
          >
            Next
          </CButton>
        </div>
      </div>
      <div hidden={pageSetup !== 1 ? true : false}>
        <CForm onSubmit={handleSubmit(saveBusinessDetails)}>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              Currency
            </CFormLabel>
            <CCol sm={8}>
              <CFormSelect
                aria-label="Default select example"
                {...register("currency")}
                type="number"
              >
                <option>Select Currency</option>
                {lookupList &&
                  getcurrencyOption(lookupList).map((currency, index) => (
                    <option value={currency.id} key={index}>
                      {currency.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              Bank Name
            </CFormLabel>
            <CCol sm={8}>
              <CFormSelect
                aria-label="Default select example"
                {...register("bank_name", {
                  required: "Please select Industry",
                })}
              >
                <option>select Bank</option>
                {getBankOption(bankbranchList) &&
                  getBankOption(bankbranchList).map((bank, index) => (
                    <option value={bank.id} key={index}>
                      {bank.branch_name}
                    </option>
                  ))}
              </CFormSelect>
              <span className="text-danger">{errors.bank_name?.message}</span>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              Branch Name
            </CFormLabel>
            <CCol sm={8}>
              <CFormSelect
                aria-label="Default select example"
                {...register("branch_name", {
                  required: "Please select Industry",
                })}
              >
                <option>select Branch</option>
                {getBranchOption(bankbranchList) &&
                  getBranchOption(bankbranchList).map((bank, index) => (
                    <option value={bank.id} key={index}>
                      {bank.branch_name}
                    </option>
                  ))}
              </CFormSelect>
              <span className="text-danger">{errors.first_name?.message}</span>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              Transit/Routing No:
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput
                type="text"
                {...register("routing_no")}
                placeholder="Transit/Routing No:"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              Account Name
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput
                type="text"
                {...register("account_name", {
                  required: "Please select Industry",
                })}
                placeholder="Account Name"
              />
              <span className="text-danger">
                {errors.account_name?.message}
              </span>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              Account Number
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput
                type="text"
                {...register("account_number", {
                  required: "Please select Industry",
                })}
                placeholder="Account Number"
              />
              <span className="text-danger">
                {errors.account_number?.message}
              </span>
            </CCol>
          </CRow>
          <div className="text-center ">
            <CButton color="success" type="submit" className="mx-3">
              Save
            </CButton>
            {/* <CButton
              color="primary"
              onClick={() =>
                clickNext(1)
              }
            >
              Next
            </CButton> */}
          </div>
        </CForm>
      </div>
    </div>
  );
};

export default BankDetails;
