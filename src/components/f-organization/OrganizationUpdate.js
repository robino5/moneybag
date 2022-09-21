import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
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

const OrganizationUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();

  const updateOrganization = (e) => {
    const organizationData = {
      name: e.orgname,
      short_name: e.orgshortgame,
      status: e.status ? 1 : 0,
      address: e.orgaddress,
    };
    console.log(organizationData);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}financial-organizations/update/${location.state.id}`,
        organizationData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          text: "Organization Updated Successfull",
          icon: "success",
          position: "top-end",
          button: false,
          timer: 1500,
        });
        navigate("/orgnization");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal({
          text: error.response.data.detail,
          icon: "error",
          position: "top-end",
          button: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateOrganization)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("orgname", {
                          required: "Please provide Organization Name",
                        })}
                        placeholder="Organization Name"
                        defaultValue={location.state.name}
                      />
                      <span className="text-danger">
                        {errors.orgname?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Short Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("orgshortgame", {
                          required: "Please provide Organization short Name",
                        })}
                        placeholder="Organization Short Name"
                        defaultValue={location.state.short_name}
                      />
                      <span className="text-danger">
                        {errors.orgshortgame?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormTextarea
                        placeholder="Address"
                        {...register("orgaddress")}
                        defaultValue={location.state.address}
                      ></CFormTextarea>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        label="Active"
                        {...register("status")}
                        defaultChecked={
                          location.state.status == 1 ? true : false
                        }
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/orgnization">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" color="info">
                      Update
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

export default OrganizationUpdate;
