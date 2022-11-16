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

const BusinessStructure = ({ clickNext }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const [lookupList, setLooupList] = useState();
  const [file, setFile] = useState("");

  const saveBusinessStructure = (e) => {
    if (e) {
      swal({
        position: "top-end",
        text: "Category Service Created Successfull",
        icon: "success",
        button: false,
        timer: 1500,
      });
      localStorage.setItem("country_no", parseInt(e.Reg_business_address));
      localStorage.setItem("business_type", parseInt(e.type_of_business));
      localStorage.setItem("business_name", e.business_name);
      localStorage.setItem("business_no", e.business_no);
      localStorage.setItem("business_address1", e.b_address_line_1);
      localStorage.setItem("business_address2", e.b_address_line_2);
      localStorage.setItem("business_city", e.b_city);
      localStorage.setItem("business_state", parseInt(e.b_state));
      localStorage.setItem("business_postal_code", e.b_postel_code);
      localStorage.setItem("file", file);
      reset();
    } else {
      swal({
        position: "top-end",
        text: "faild",
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

  const getCountryOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 1001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const getBusinessOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 2001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
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
    document.getElementById("preview-button").disabled = true;

    if (e.target.files[0].size > 5e6) {
      swal({
        position: "top-end",
        text: "Your File is too Large! Please provide the file below 5MB.",
        icon: "warning",
        button: false,
        timer: 3000,
      });
      e.target.value = null;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}uploads/upload`, data)
        .then((response) => {
          console.log(response), setFile(response.data.fileName);
          document.getElementById("preview-button").disabled = false;
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
    window.open(`${process.env.REACT_APP_API_URL}uploads/uploads/get/${file}`);
  };

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div>
      <CForm onSubmit={handleSubmit(saveBusinessStructure)}>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Registered business address
          </CFormLabel>
          <CCol sm={8}>
            <CFormSelect
              aria-label="Default select example"
              type="number"
              {...register("Reg_business_address")}
            >
              <option>Select Country</option>
              {lookupList &&
                getCountryOption(lookupList).map((country, index) => (
                  <option value={country.id} key={index}>
                    {country.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Type of business
          </CFormLabel>
          <CCol sm={8}>
            <CFormSelect
              aria-label="Default select example"
              type="number"
              {...register("type_of_business")}
            >
              <option>Type of Business</option>
              {lookupList &&
                getBusinessOption(lookupList).map((country, index) => (
                  <option value={country.id} key={index}>
                    {country.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Business Name
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("business_name", {
                required: "Please provide Business Name",
              })}
              placeholder="Business Name"
            />
            <span className="text-danger">{errors.business_name?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Business No.
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("business_no", {
                required: "Please provide Business no",
              })}
              placeholder="Business Name"
            />
            <span className="text-danger">{errors.business_no?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Address
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_address_line_1")}
              placeholder="Address Line 1"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_address_line_2")}
              placeholder="Address Line 2"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            City
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_city", {
                required: "Please provide City",
              })}
              placeholder="City"
            />
            <span className="text-danger">{errors.city?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            State
          </CFormLabel>
          <CCol sm={8}>
            <CFormSelect
              aria-label="Default select example"
              {...register("b_state", {
                required: "Please Select Your State",
              })}
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
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Postal Code
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_postel_code")}
              placeholder="Postal Code"
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

export default BusinessStructure;
