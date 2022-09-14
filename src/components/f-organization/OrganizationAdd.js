import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [validated, setValidated] = useState(false)
    const saveOrganization = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
        }
        setValidated(true)
        console.log(validated)
        if (validated) {
            toast.warn("Wow so easy!")
        }

    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm noValidate
                                    validated={validated}>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text"
                                                placeholder="Organization Name"
                                                feedbackInvalid="Please provide a valid zip."
                                                required />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Short Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text"
                                                feedbackInvalid="Please provide Organization Name"
                                                placeholder="Organization Short Name"
                                                required />
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
                                            <CFormCheck label="Active" />
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/orgnization">
                                            <CButton color="danger" className="mx-3" >Cancle</CButton>
                                        </Link>
                                        <CButton type="submit" color="success" onClick={saveOrganization} >Save</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
            <ToastContainer autoClose={1000} theme="colored" />
        </div>

    )
}

export default OrganizationAdd
