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
    CFormCheck,
    CButton,
} from '@coreui/react'


const OrganizationAdd = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Organization Name" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Short Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Organization Short Name" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Address</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormTextarea placeholder="Address" ></CFormTextarea>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Status</CFormLabel>
                                        <CCol sm={9}>
                                        <CFormCheck  label="Active"/>
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                    <Link to="/orgnization">
                                    <CButton color="danger" className="mx-3" >Cancle</CButton>
                                    </Link>
                                    <CButton color="success" >Save</CButton>
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

export default OrganizationAdd
