import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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

const UserUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setuername] = useState(location.state.user_name);
  const [userid, setuerid] = useState(location.state.user_id);
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState(location.state.is_active);

  console.log();
  const handleUserName = (e) => {
    const username = e.target.value;
    setuername(username);
  };

  const handleUserId = (e) => {
    const userid = e.target.value;
    setuerid(userid);
  };

  const handlPassword = (e) => {
    const password = e.target.value;
    setpassword(password);
  };

  const handleStatus = (e) => {
    e.target.checked ? setstatus(1) : setstatus(0);
  };

  const saveUser = (e) => {
    const userData = {
      id: location.state.id,
      user_id: userid,
      user_name: username,
      is_active: status,
      user_pwd: password,
    };
    console.log(userData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}v1/users/update-user`, userData, {
        headers,
      })
      .then((response) => {
        console.log(response), toast.success("User Updated Successfull");
        return navigate("/users");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("User Updated Faild");
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="username"
                        placeholder="Name"
                        value={username}
                        onChange={handleUserName}
                      />
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
                        value={userid}
                        placeholder="User Name"
                        onChange={handleUserId}
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
                        placeholder="Password"
                        onChange={handlPassword}
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
                        onChange={handleStatus}
                        defaultChecked={status == 1 ? true : false}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/users">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton color="success" onClick={saveUser}>
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

export default UserUpdate;
