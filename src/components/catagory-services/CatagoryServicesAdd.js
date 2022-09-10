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


const CatagoryServicesAdd = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Category</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example">
                                                <option>Open this select menu</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Category Service</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text" placeholder="Visa/Master Card" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Remarks</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormTextarea placeholder="Note" ></CFormTextarea>
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/category-services">
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

export default CatagoryServicesAdd
