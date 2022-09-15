import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const UserAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();

  const saveUser = (e) => {
    const userData = {
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
      .post(`${process.env.REACT_APP_API_URL}v1/users/create-user`, userData, {
        headers,
      })
      .then((response) => {
        toast.success("User Created Successfull");
        console.log(response);
        navigate("/users");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.success("User Created Faild");
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveUser)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="username"
                        {...register("username", {
                          required: "Please provide Name",
                        })}
                        placeholder="Name"
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
                        {...register("userid", {
                          required: "Please provide User Name",
                        })}
                        placeholder="User Name"
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
                        {...register("password", {
                          required: "Please provide Password",
                        })}
                        placeholder="Password"
                      />
                      <span className="text-danger">
                        {errors.password?.message}
                      </span>
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
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/users">
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

export default UserAdd;
