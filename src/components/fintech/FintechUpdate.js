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

  const FintechUpdate = () => {
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
                                        <CFormInput type="text" placeholder="Fintech Name" />
                                            
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Country</CFormLabel>
                                        <CCol sm={9}>
                                        <CFormSelect aria-label="Default select example">
                                                <option>select Country</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Address</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Address Line 1" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Address Line 2" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">City</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="City" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">State</CFormLabel>
                                        <CCol sm={9}>
                                        <CFormSelect aria-label="Default select example">
                                                <option>select State</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Postal Code</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Postal Code" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Swift Code</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Swift Code" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Service category</CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck label="General Banking"  />
                                        </CCol>
                                        <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck label="Card Service"  />
                                        </CCol>
                                        <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck label="Internet Banking"  />
                                        </CCol>
                                        <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck label="MFS"  />
                                        </CCol>
                                        <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck label="DFS"  />
                                        </CCol>
                                        <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck label="OTC"  />
                                        </CCol>
                                        <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck label="QR Code"  />
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/fintech">
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

  export default FintechUpdate;
  