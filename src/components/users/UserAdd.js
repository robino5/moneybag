import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const UserAdd = () => {
  const navigate = useNavigate();
  const [username, setuername] = useState("");
  const [userid, setuerid] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState(0);

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
      .post(`${process.env.REACT_APP_API_URL}v1/users/create-user`, userData, {
        headers,
      })
      .then((response) => {
        console.log(response), alert("Created");
        return navigate("/users");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("fail");
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
    </div>
  );
};

export default UserAdd;
