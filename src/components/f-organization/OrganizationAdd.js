import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
} from "@coreui/react";


const OrganizationAdd = () => {
  const { register, formState: { errors,isDirty }, handleSubmit,setValue } = useForm({ mode: "all", })
  const [val, setVal] = useState(0);

  const saveOrganization = (data) => {
    console.log(data)
    alert("done")
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveOrganization)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("orgname", { required: "Please provide Organization Name" })}
                        placeholder="Organization Name"
                      />
                      <span className="text-danger">{errors.orgname?.message}</span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Short Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("orgshortgame", { required: "Please provide Organization short Name" })}
                        placeholder="Organization Short Name"
                      />
                      <span className="text-danger">{errors.orgshortgame?.message}</span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormTextarea placeholder="Address"
                        {...register("orgaddress")}
                      ></CFormTextarea>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label"
                    >
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck label="Active" 
                        onChange={e => {
                          setValue("status", e.target.checked ? 1 : 0);
                          setVal(!val);
                        }} checked={val} />
                        
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/orgnization">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton disabled={!isDirty} type="submit" color="success">
                      Save
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer autoClose={1000} theme="colored" />
    </div>
  );
};

export default OrganizationAdd;
