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

const BankUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const [bankbranchList, setBankBranchList] = useState();

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

  const updateBankBranch = (e) => {
    const bankBranchstoreDate = {
      branch_name: e.bank_branch_name,
      alias: e.alias,
      root_bank: location.state.root_bank,
      address1: e.address1,
      address2: e.address2,
      city: e.city,
      swift_code: e.swift_code,
      phone1: e.phone1,
      phone2: e.phone2,
      email: e.email,
      routing_no: e.routing_no,
      web: e.website,
      note: e.note,
      is_active: e.status ? 1 : 0,
      bank_flag: 1,
    };
    console.log("asdfa", bankBranchstoreDate);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}banks/update/${location.state.id}`,
        bankBranchstoreDate,
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
        navigate("/bank");
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

  useEffect(() => {
    getBankBranchList();
  }, []);

  const getBankOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.bank_flag === 1) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h6 className="text-center">Update Bank</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateBankBranch)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Bank Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.branch_name}
                        {...register("bank_branch_name")}
                        placeholder="Bank Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Alias
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.alias}
                        {...register("alias")}
                        placeholder="Alias"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address-1
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.address1}
                        {...register("address1")}
                        placeholder="Address-1"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address-2
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.address2}
                        {...register("address2")}
                        placeholder="Address-2"
                      />
                      <span className="text-danger">
                        {errors.branch_code?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      City
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.city}
                        {...register("city")}
                        placeholder="City"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Swift Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.swift_code}
                        {...register("swift_code")}
                        placeholder="Swift Code"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Phone-1
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.phone1}
                        {...register("phone1")}
                        placeholder="Phone-1"
                      />
                      <span className="text-danger">
                        {errors.phone1?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Phone-2
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.phone2}
                        {...register("phone2")}
                        placeholder="Phone-2"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      E-mail
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.email}
                        {...register("email")}
                        placeholder="E-mail"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Routing No.
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.routing_no}
                        {...register("routing_no")}
                        placeholder="Routing No."
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Website
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.web}
                        {...register("website")}
                        placeholder="Website"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Note
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.note}
                        {...register("note")}
                        placeholder="Note"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        label="Active"
                        defaultChecked={
                          location.state.is_active == 1 ? true : false
                        }
                        {...register("status")}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/bank">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" color="info">
                      Update
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

export default BankUpdate;
