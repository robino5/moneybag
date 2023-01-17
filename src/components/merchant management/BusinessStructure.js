import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm, useFieldArray } from "react-hook-form";
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
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();

  const saveBusinessStructure = (e) => {
    if (e) {
      swal({
        position: "top-end",
        text: "Category Service Created Successfull",
        icon: "success",
        button: false,
        timer: 1500,
      });
      localStorage.setItem("business_structure", 1);
      localStorage.setItem("business_name", e.business_name);
      localStorage.setItem("business_short_name", e.business_short_name);
      localStorage.setItem("bin", e.business_no);
      localStorage.setItem("business_address1", e.b_address_line_1);
      localStorage.setItem("business_address2", e.b_address_line_2);
      localStorage.setItem("business_city", e.b_city);
      localStorage.setItem("business_website", e.bussiness_website);
      localStorage.setItem("business_state", parseInt(e.b_state));
      localStorage.setItem("business_postal_code", e.b_postel_code);
      localStorage.setItem("business_Phone", parseInt(e.b_phone));
      localStorage.setItem("business_email", e.b_email);
      localStorage.setItem("file1", file1);
      if (file2) {
        localStorage.setItem("file2", file2);
      }

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
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getFileLebel = (e) => {
    if (e == 2001001) {
      return "School Registration Certificate by Board:";
    } else if (e == 2001002 || e == 2001006) {
      return "Incorporation Certificate";
    } else {
      return "Trade License";
    }
  };

  // const getCountryOption = (e) => {
  //   let Date = [];
  //   e.forEach((element) => {
  //     if (element.lov_id === 1001 && element.is_active === 1) {
  //       Date.push({ id: element.id, name: element.name });
  //     }
  //   });
  //   return Date;
  // };

  const getStateOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 3001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const uploadFile1 = (e) => {
    var data = new FormData();
    data.append("file", e.target.files[0]);

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
          console.log(response), setFile1(response.data.fileName);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          if (error.response.status == 401) {
            navigate("/login");
          }
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

  const uploadFile2 = (e) => {
    var data = new FormData();
    data.append("file", e.target.files[0]);

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
          console.log(response), setFile2(response.data.fileName);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          if (error.response.status == 401) {
            navigate("/login");
          }
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

  const openFile = (e) => {
    window.open(`${process.env.REACT_APP_API_URL}uploads/uploads/get/${e}`);
  };

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div>
      <CForm onSubmit={handleSubmit(saveBusinessStructure)}>
        {/* <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Merchant ID
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("merchant_id", {
                required: "Please select Merchant ID",
              })}
              placeholder="Merchant ID"
            />
            <span className="text-danger">{errors.merchant_id?.message}</span>
          </CCol>
        </CRow> */}
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
            Business Short Name
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("business_short_name", {
                required: "Please provide Business Short Name",
                pattern: {
                  value: /^[a-zA-Z]*$/,
                  message: "No Space allowed",
                },
                minLength: {
                  value: 4,
                  message: "Short name will be Minimum 4 Characters",
                },
              })}
              placeholder="Business Short Name"
            />
            <span className="text-danger">
              {errors.business_short_name?.message}
            </span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            {localStorage.getItem("business_type") == 2001001
              ? "EIIN No."
              : "BIN No."}
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("business_no", {
                required: "Please provide Business no",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Please Provide Number",
                },
              })}
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
              {...register("b_address_line_1", {
                required: "Please provide Address",
              })}
              placeholder="Address Line 1"
            />
            <span className="text-danger">
              {errors.b_address_line_1?.message}
            </span>
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
            Phone Number
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_phone", {
                required: "Please provide Phone number",
                minLength: {
                  value: 10,
                  message: "Invalid Phone Number",
                },
                maxLength: {
                  value: 11,
                  message: "Invalid Phone Number",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Invalid Phone Number",
                },
              })}
              placeholder="Phone Number"
            />
            <span className="text-danger">{errors.b_phone?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Email
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_email", {
                required: "Please provide E-mail",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
            />
            <span className="text-danger">{errors.b_email?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Business website
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("bussiness_website", {
                pattern: {
                  value:
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                  message: "Invalid Website",
                },
              })}
              placeholder="Business website"
            />
            <span className="text-danger">
              {errors.bussiness_website?.message}
            </span>
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
            <span className="text-danger">{errors.b_city?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            District
          </CFormLabel>
          <CCol sm={8}>
            <CFormSelect
              aria-label="Default select example"
              {...register("b_state", {
                required: "Please Select Your State",
              })}
              type="number"
            >
              <option value={""}>Select District</option>
              {lookupList &&
                getStateOption(lookupList).map((country, index) => (
                  <option value={country.id} key={index}>
                    {country.name}
                  </option>
                ))}
            </CFormSelect>
            <span className="text-danger">{errors.b_state?.message}</span>
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
            {getFileLebel(localStorage.getItem("business_type"))}
          </CFormLabel>
          <CCol sm={7}>
            <CFormInput type="file" onChange={uploadFile1} />
          </CCol>
          <CCol md={1}>
            <CButton
              color="secondary"
              onClick={() => {
                openFile(file1);
              }}
            >
              <CIcon icon={cilLowVision}></CIcon>
            </CButton>
          </CCol>
        </CRow>
        <div
          hidden={
            localStorage.getItem("business_type") == 2001001 ? true : false
          }
        >
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              TIN Certificate
            </CFormLabel>
            <CCol sm={7}>
              <CFormInput type="file" onChange={uploadFile2} />
            </CCol>
            <CCol md={1}>
              <CButton
                color="secondary"
                onClick={() => {
                  openFile(file2);
                }}
              >
                <CIcon icon={cilLowVision}></CIcon>
              </CButton>
            </CCol>
          </CRow>
        </div>

        <CRow></CRow>
        <div className="text-center ">
          <Link to="/merchant">
            <CButton color="danger">Cancle</CButton>
          </Link>
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
