import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  CFormTextarea,
} from "@coreui/react";

const AddBankDetails = ({ clickNext }) => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <div className="text-center">
          <h2>Personal Details</h2>
        </div>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Currency
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect aria-label="Default select example">
                        <option>select Country</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Currency
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect aria-label="Default select example">
                        <option>select Country</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Bank Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect aria-label="Default select example">
                        <option>select Country</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Branch Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Business website" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Account Name" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Number
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Account Number" />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <CButton color="success" className="mx-3">
                      Save
                    </CButton>
                    <CButton color="primary" onClick={() => clickNext(1)}>
                      Next
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

export default AddBankDetails;
