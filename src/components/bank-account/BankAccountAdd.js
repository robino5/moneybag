import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const BankAccountAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const [organizationList, setOrganizationList] = useState();
  const [storeList, setStoreList] = useState();
  const navigate = useNavigate();

  const saveBankAccount = (e) => {
    const bankAccountDate = {
      bank_id: e.bank_account_id,
      organization_id: parseInt(e.bank_account_organization),
      store_id: parseInt(e.bank_account_store),
      account_name: e.account_name,
      account_no: e.account_no,
      branch_name: e.branch_name,
      account_type: parseInt(e.account_type),
      swift_code: e.swift_code,
      route_no: e.route_number,
      is_active: e.status ? 1 : 0,
    };
    console.log(bankAccountDate);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}bank-accounts/`, bankAccountDate, {
        headers,
      })
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Bank Account Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/bank-account");
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

  const getOrganization = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}financial-organizations/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setOrganizationList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getStoreList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}stores/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setStoreList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getOrganization();
    getStoreList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveBankAccount)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Bank Account ID
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("bank_account_id")}
                        placeholder="Bank Account ID"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Organization
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        {...register("bank_account_organization", {
                          required: "Please Select  organization",
                        })}
                        aria-label="Default select example"
                      >
                        <option>Select Organization</option>
                        {organizationList &&
                          organizationList.map((organization, index) => (
                            <option value={organization.id} key={index}>
                              {organization.name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.bank_account_organization?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Store
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        {...register("bank_account_store", {
                          required: "Please Select  Store",
                        })}
                        aria-label="Default select example"
                      >
                        <option>Select Store</option>
                        {storeList &&
                          storeList.map((store, index) => (
                            <option value={store.id} key={index}>
                              {store.store_name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.bank_account_store?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("account_name", {
                          required: "Please provide Account Name",
                        })}
                        placeholder="Account Name"
                      />
                      <span className="text-danger">
                        {errors.account_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account No.
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("account_no", {
                          required: "Please provide  Account No.",
                        })}
                        placeholder=" Account No."
                      />
                      <span className="text-danger">
                        {errors.account_no?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Branch Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("branch_name")}
                        placeholder="Branch Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Type
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        {...register("account_type")}
                        aria-label="Default select example"
                      >
                        <option>Select Store</option>
                        <option value={1}>Saving Account</option>
                        <option value={2}>Current Account</option>
                        <option value={3}>Join Account</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Swift Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("swift_code")}
                        placeholder="Swift Code"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Route Number
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("route_number")}
                        placeholder=" Route Number"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck label="Active" {...register("status")} />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/bank-account">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton disabled={!isDirty} type="submit" color="success">
                      Save
                    </CButton>
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

export default BankAccountAdd;
