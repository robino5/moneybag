import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

import {
  CCard,
  CCardBody,
  CFormSelect,
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
  const [merchantList, setmerchantList] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();

  const getMertchant = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}marchants/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setmerchantList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const updateUser = (e) => {
    const userData = {
      user_id: e.userid,
      is_active: e.status ? 1 : 0,
    };
    if (e.password) {
      updateMrPassword(e.password);
    }

    console.log(userData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}mruser-auth/update-user/${location.state.id}`,
        userData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          text: "Merchant User Updated Successfull",
          icon: "success",
          position: "top-end",
          button: false,
          timer: 1500,
        });
        return navigate("/merchant-users");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
        swal({
          text: error.response.data.detail,
          icon: "error",
          position: "top-end",
          button: false,
          timer: 1500,
        });
      });
  };

  const updateMrPassword = (e) => {
    let password = {
      pwd: e,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}users/update-pwd/${location.state.id}`,
        password,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
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

  useEffect(() => {
    getMertchant();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h6 className="text-center">Update Merchant User</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateUser)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Merchant Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        disabled="true"
                        {...register("merchant_name")}
                      >
                        {merchantList &&
                          merchantList.map((merchant, index) => (
                            <option
                              value={merchant.id}
                              selected={
                                merchant.id === location.state.merchant_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {merchant.business_name}
                            </option>
                          ))}
                      </CFormSelect>
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
                        defaultValue={location.state.user_id}
                        {...register("userid")}
                      />
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
                        defaultChecked={
                          location.state.is_active == 1 ? true : false
                        }
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/merchant-users">
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
