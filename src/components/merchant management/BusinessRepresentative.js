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
} from "@coreui/react";

const BusinessRepresentative = ({ clickNext }) => {
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
                      Legal Name Of Person
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="First Name" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Last Name" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Email Address
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Email Address" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Date of Birth
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="date" placeholder=" Date of Birth" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Address Line 2" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Address Line 2" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      City
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="City" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      State
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect aria-label="Default select example">
                        <option>select State</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Postal Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Postal Code" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      National Id
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Postal Code" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      National Id
                    </CFormLabel>
                    <CCol sm={9}>
                      <p>
                        We use this information to verify your identity. If you
                        leave this feld blank, we’ll email you instructions to
                        submit another form of ID.
                      </p>
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

export default BusinessRepresentative;
