import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const UserAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();

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
      .post(`${process.env.REACT_APP_API_URL}users/create-user`, userData, {
        headers,
      })
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "User Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/users");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal({
          position: "top-end",
          text: error.response.data.detail,
          icon: "error",
          button: false,
          timer: 1500,
        });
      });
  };

  const showPassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const showPassword2 = () => {
    var x = document.getElementById("password2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const getPasswordMatchingMess = () => {
    if (password2 && password2 != password1) {
      return "Password Mismatch";
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h6 className="text-center">Add User</h6>
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
                        id="password"
                        {...register("password", {
                          required: "Please provide Password",
                          minLength: {
                            value: 6,
                            message: "Password will be Minimum 6 Characters",
                          },
                          validate: (value) => {
                            return (
                              [/[A-Z]/,/[a-z]/, /[0-9]/, /[#?!@$%^&*-]/].every((pattern) =>
                                pattern.test(value)
                              ) || "Password is weak! Please Follow [A-Z],[a-z],[0-9],[#?!@$%^&*-]"
                            );
                          },
                        })}
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword1(e.target.value);
                        }}
                      />
                      <span className="text-danger">
                        {errors.password?.message}
                      </span>
                      <CFormCheck
                        name="status"
                        onClick={showPassword}
                        label="Show Password"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Confirm Password
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="password"
                        name="password"
                        id="password2"
                        {...register("confirm-password", {
                          minLength: {
                            value: 6,
                            message: "Password will be Minimum 6 Characters",
                          },
                        })}
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword2(e.target.value);
                        }}
                      />
                      <span className="text-danger">
                        {getPasswordMatchingMess()}
                      </span>
                      <CFormCheck
                        name="status"
                        onClick={showPassword2}
                        label="Show Password"
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
    </div>
  );
};

export default UserAdd;
