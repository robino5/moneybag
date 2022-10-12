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

const BusinessDetails = ({ clickNext }) => {
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
                      Industry
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect aria-label="Default select example">
                        <option>select Country</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Business website
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput type="text" placeholder="Business website" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Product description
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormTextarea type="text" />
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

export default BusinessDetails;
