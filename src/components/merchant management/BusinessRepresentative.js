import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import { cilLowVision } from "@coreui/icons";
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
  CButton,
} from "@coreui/react";

const BusinessRepresentative = ({ clickNext }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const [lookupList, setLooupList] = useState();
  const [image, setImage] = useState("");

  console.log("image", image);

  const saveBusinessRepresentative = (e) => {
    if (e) {
      swal({
        position: "top-end",
        text: "Category Service Created Successfull",
        icon: "success",
        button: false,
        timer: 1500,
      });
      localStorage.setItem("first_name", e.first_name);
      localStorage.setItem("last_name", e.last_name);
      localStorage.setItem("email", e.email);
      localStorage.setItem("dob", e.dob);
      localStorage.setItem("address1", e.address_line_1);
      localStorage.setItem("address2", e.address_line_2);
      localStorage.setItem("city", e.city);
      localStorage.setItem("state", e.state);
      localStorage.setItem("postal_code", parseInt(e.postal_code));
      localStorage.setItem("nid_number", e.national_id);
      localStorage.setItem("file", image);
      reset();
    } else {
      swal({
        position: "top-end",
        text: "Faild",
        icon: "error",
        button: false,
        timer: 1500,
      });
    }
  };

  const getLookupList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}lookups/detail-list`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setLooupList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getStateOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 3001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const uploadFile = (e) => {
    var data = new FormData();
    data.append("file", e.target.files[0]);
    document.getElementById("preview-button").disabled=true

    if(e.target.files[0].size >5e6){
      swal({
        position: "top-end",
        text: "Your File is too Large! Please provide the file below 5MB.",
        icon: "warning",
        button: false,
        timer: 3000,
      });
          e.target.value=null;
    }else{
      axios
      .post(`${process.env.REACT_APP_API_URL}uploads/upload`, data)
      .then((response) => {
        console.log(response), setImage(response.data.fileName); document.getElementById("preview-button").disabled=false
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal({
          position: "top-end",
          text: "File Upload Failed",
          icon: "error",
          button: false,
          timer: 1500,
        });
      });
    }
  };

  const openFile = () => {
    window.open(`${process.env.REACT_APP_API_URL}uploads/uploads/get/${image}`);
  };

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div>
      <CForm onSubmit={handleSubmit(saveBusinessRepresentative)}>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Legal Name Of Person
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("first_name", {
                required: "Please provide Business Name",
              })}
              placeholder="First Name"
            />
            <span className="text-danger">{errors.first_name?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("last_name", {
                required: "Please provide Business Name",
              })}
              placeholder="Last Name"
            />
            <span className="text-danger">{errors.last_name?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Email Address
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("email")}
              placeholder="Email Address"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Date of Birth
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="date"
              {...register("dob")}
              placeholder=" Date of Birth"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">Address</CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("address_line_1", {
                required: "Please provide Address line 1",
              })}
              placeholder="Address Line 1"
            />
            <span className="text-danger">
              {errors.address_line_1?.message}
            </span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("address_line_2")}
              placeholder="Address Line 2"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">City</CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("city", {
                required: "Please provide City",
              })}
              placeholder="City"
            />
            <span className="text-danger">{errors.city?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">State</CFormLabel>
          <CCol sm={8}>
            <CFormSelect
              aria-label="Default select example"
              {...register("state")}
              type="number"
            >
              <option>Select State</option>
              {lookupList &&
                getStateOption(lookupList).map((country, index) => (
                  <option value={country.id} key={index}>
                    {country.name}
                  </option>
                ))}
            </CFormSelect>
            <span className="text-danger">{errors.state?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Postal Code
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("postal_code", {
                required: "Please Select Postal Code",
              })}
              placeholder="Postal Code"
            />
            <span className="text-danger">{errors.postal_code?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            National Id
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("national_id")}
              placeholder="Nationnal Id"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            File Upload
          </CFormLabel>
          <CCol sm={7}>
            <CFormInput type="file" onChange={uploadFile} />
          </CCol>
          <CCol sm={1}>
            <CButton id="preview-button" onClick={openFile}>
              <CIcon className="text-light" icon={cilLowVision} />
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
          <CCol sm={8}>
            <p>
              We use this information to verify your identity. If you leave this
              feld blank, we’ll email you instructions to submit another form of
              ID.
            </p>
          </CCol>
        </CRow>
        <div className="text-center ">
          <CButton color="success" type="submit" className="mx-3">
            Save
          </CButton>
          <CButton color="primary" onClick={() => clickNext(1)}>
            Next
          </CButton>
        </div>
      </CForm>
    </div>
  );
};

export default BusinessRepresentative;
