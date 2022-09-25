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
    CFormCheck,
    CButton,
  } from "@coreui/react";

  const ServiceAdd = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Fintech Name</CFormLabel>
                                        <CCol sm={9}>
                                        <CFormSelect aria-label="Default select example">
                                                <option>select Fintech</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Service Category</CFormLabel>
                                        <CCol sm={9}>
                                        <CFormSelect aria-label="Default select example">
                                                <option>select Service</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Service Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Service Name" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">End Point Url</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="End Point Url" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Callback Url</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Callback Url" />
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/service">
                                            <CButton color="danger" className="mx-3" >Cancle</CButton>
                                        </Link>
                                        <CButton color="info" >Update</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
    
  }

  export default ServiceAdd;
  