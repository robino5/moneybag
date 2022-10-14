import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
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
  CFormCheck,
  CButton,
} from "@coreui/react";

const BankDetailsUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [bankbranchList, setBankBranchList] = useState();
  const [lookupList, setLooupList] = useState();

  console.log(location.state);

  const updateBusinessDetails = (e) => {
    const businessDetailData = {
      currency_no:
        e.currency === "" ? location.state.currency_no : parseInt(e.currency),
      bank_no:
        e.bank_name === "" ? location.state.bank_no : parseInt(e.bank_name),
      branch_no:
        e.branch_name === ""
          ? location.state.branch_no
          : parseInt(e.branch_name),
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
        `${process.env.REACT_APP_API_URL}marchant-details/update/${location.state.id}`,
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
        navigate("/merchant_management", {
          state: 4,
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

  const getLookupList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
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

  const getBankBranchList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
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
        if (
          element.bank_flag === 0 &&
          element.is_active === 1 &&
          element.root_bank === 0
        ) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
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

  useEffect(() => {
    getLookupList();
    getBankBranchList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateBusinessDetails)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Currency
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("currency")}
                        type="number"
                      >
                        {lookupList &&
                          getcurrencyOption(lookupList).map(
                            (currency, index) => (
                              <option
                                value={currency.id}
                                selected={
                                  currency.id === location.state.currency_no
                                    ? "selected"
                                    : ""
                                }
                                key={index}
                              >
                                {currency.name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Bank Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("bank_name")}
                      >
                        {getBankOption(bankbranchList) &&
                          getBankOption(bankbranchList).map((bank, index) => (
                            <option
                              value={bank.id}
                              selected={
                                bank.id === location.state.bank_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {bank.branch_name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Branch Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("branch_name")}
                      >
                        {getBranchOption(bankbranchList) &&
                          getBranchOption(bankbranchList).map((bank, index) => (
                            <option
                              value={bank.id}
                              selected={
                                bank.id === location.state.branch_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {bank.branch_name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Transit/Routing No:
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.routing_no}
                        {...register("routing_no")}
                        placeholder="Transit/Routing No:"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.account_name}
                        {...register("account_name")}
                        placeholder="Account Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Number
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.account_no}
                        {...register("account_number")}
                        placeholder="Account Number"
                      />
                      <span className="text-danger">
                        {errors.account_number?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <CButton color="info" type="submit" className="mx-3">
                      Update
                    </CButton>
                    {/* <CButton color="primary" onClick={() => clickNext(1)}>
                      Next
                    </CButton> */}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default BankDetailsUpdate;
