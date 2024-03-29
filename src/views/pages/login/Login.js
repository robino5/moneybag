import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import axios from "axios";
import swal from "sweetalert";
import logo from "src/assets/images/logo.png";
import ForgetPassword from "./ForgetPassword";

const Login = () => {
  const navigate = useNavigate();
  const [username, setuername] = useState("");
  const [password, setpassword] = useState("");
  const [visible, setVisible] = useState();

  const handleUser = (e) => {
    const username = e.target.value;
    setuername(username);
  };
  const handlePassword = (e) => {
    const password = e.target.value;
    setpassword(password);
  };
  const submitUser = (e) => {
    e.preventDefault();
    // const data = {username : username, password : password};
    var data = new FormData();
    data.append("username", username);
    data.append("password", password);
    axios
      .post(`${process.env.REACT_APP_API_URL}auth/token`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        swal({
          position: "top-end",
          text: "Login Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        return navigate("/dashboard");
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

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Sign In</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        onChange={handleUser}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={handlePassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          onClick={submitUser}
                        >
                          Sign In
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          onClick={() => {
                            setVisible(true);
                          }}
                          className="px-0"
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-color  py-3"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <div className="text-center">
                      <CImage className="login-image-wrapper" src={logo} />
                    </div>
                    <h2>Welcome To</h2>
                    <h4>Moneybag Admin Portal</h4>
                    <h5>Secure Payment Anytime</h5>
                    <Link to="/register">
                      {/* <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton> */}
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <div>
        <CModal
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Forget Password</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <ForgetPassword />
          </CModalBody>
        </CModal>
      </div>
    </div>
  );
};

export default Login;
