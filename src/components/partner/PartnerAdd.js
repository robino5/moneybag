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


const PartnerAdd = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Partner</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example">
                                                <option>Open this select menu</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Primary Email</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Primary Email" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Contact Email</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Contact Email" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Phone</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Phone" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Fax</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Fax" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Contact Person</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Contact Person" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Contact Person mobile</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Contact Person mobile" />
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/partner">
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

export default PartnerAdd
