import React from 'react'
import { Link } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CFormTextarea,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CFormSelect,
    CButton,
} from '@coreui/react'


const SettelmentUpdate = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Bank Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example">
                                                <option>Open this select menu</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Branch Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example">
                                                <option>Open this select menu</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Service Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example">
                                                <option>Open this select menu</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Account Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Primary Email" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Account Number</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Contact Email" />
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/settelment">
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

export default SettelmentUpdate
