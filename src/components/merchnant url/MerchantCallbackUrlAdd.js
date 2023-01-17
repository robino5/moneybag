import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const UserAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
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

  const saveUser = (e) => {
    const userData = {
      merchant_no: parseInt(e.merchant_name),
      callback_url: e.mer_callback_url,
      password: e.password,
    };
    console.log(userData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api-users/create-api-user`,
        userData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "User Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/merchant-callbackUrl");
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

  useEffect(() => {
    getMertchant();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h6 className="text-center">Add Merchant User</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveUser)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Merchant Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("merchant_name", {
                          required: "Please Select Merchant Name",
                        })}
                      >
                        <option value={""}>Select Merchant Name</option>
                        {merchantList &&
                          merchantList.map((merchant, index) => (
                            <option value={merchant.id} key={index}>
                              {merchant.business_name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.merchant_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Merchant Callback Url
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="userid"
                        {...register("mer_callback_url", {
                          required: "Please provide Merchant Callback Url",
                          pattern: {
                            value: /^(ftp|http|https|www):\/\/[^ "]+$/,
                            message: "Invalid Website",
                          },
                        })}
                        placeholder="User Name"
                      />
                      <span className="text-danger">
                        {errors.mer_callback_url?.message}
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
                  <div className="text-center ">
                    <Link to="/merchant-callbackUrl">
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
