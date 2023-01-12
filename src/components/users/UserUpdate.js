import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
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

const UserUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();

  const updateUser = (e) => {
    const userData = {
      id: location.state.id,
      user_id: e.userid,
      user_name: e.username,
      is_active: e.status ? 1 : 0,
      user_pwd: e.password,
    };
    console.log(userData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}users/update-user`, userData, {
        headers,
      })
      .then((response) => {
        console.log(response);
        swal({
          text: "User Updated Successfull",
          icon: "success",
          position: "top-end",
          button: false,
          timer: 1500,
        });
        return navigate("/users");
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
              <h6 className="text-center">Update User</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateUser)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="username"
                        placeholder="Name"
                        defaultValue={location.state.user_name}
                        {...register("username", {
                          required: "Please provide Name",
                        })}
                      />
                      <span className="text-danger">
                        {errors.username?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      User Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="userid"
                        readOnly
                        defaultValue={location.state.user_id}
                        {...register("userid", {
                          required: "Please provide User Name",
                        })}
                      />
                      <span className="text-danger">
                        {errors.userid?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Password
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="password"
                        name="password"
                        {...register("password")}
                        placeholder="Password"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        name="status"
                        label="Active"
                        {...register("status")}
                        defaultChecked={
                          location.state.is_active == 1 ? true : false
                        }
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/users">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton color="info" type="submit">
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

export default UserUpdate;
