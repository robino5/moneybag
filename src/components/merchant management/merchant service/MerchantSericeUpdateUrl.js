import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
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

const MerchantSericeUpdateUrl = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  useEffect(() => {
    navigate("/merchant-service/update-merchant-service", {
      state: location.state,
    });
  }, []);

  return (
    <div className=" d-flex flex-row">
      <h1>asdfadsf</h1>
    </div>
  );
};

export default MerchantSericeUpdateUrl;
