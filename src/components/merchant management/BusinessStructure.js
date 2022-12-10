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
      clickNext(1);
    } else {
      swal({
        position: "top-end",
        text: "Faild",
        icon: "error",
        button: false,
        timer: 1500,
      });
    }

    // const data = {
    //   first_name: localStorage.getItem("first_name"),
    //   last_name: localStorage.getItem("last_name"),
    //   email: localStorage.getItem("email"),
    //   address1: localStorage.getItem("address1"),
    //   address2: localStorage.getItem("address2"),
    //   city: localStorage.getItem("city"),
    //   state: parseInt(localStorage.getItem("state")),
    //   postal_code: localStorage.getItem("postal_code"),
    //   nid_number: localStorage.getItem("nid_number"),
    //   date_of_birth: localStorage.getItem("dob"),
    //   marchant_id: localStorage.getItem("merchant_id"),
    //   industry_no: localStorage.getItem("indeustry"),
    //   category_code: localStorage.getItem("category_code"),
    //   website: localStorage.getItem("business_website"),
    //   product_desc: localStorage.getItem("description"),
    //   is_active: parseInt(localStorage.getItem("status")),
    //   country_no: parseInt(e.Reg_business_address),
    //   business_type: parseInt(e.type_of_business),
    //   business_name: e.business_name,
    //   bin: e.business_no,
    //   business_address1: e.b_address_line_1,
    //   business_address2: e.b_address_line_2,
    //   business_city: e.b_city,
    //   business_state: parseInt(e.b_state),
    //   business_postal_code: e.b_postel_code,
    //   merchant_pic: localStorage.getItem("merchant_pic"),
    // };

    // console.log(data);

    // const headers = {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // };
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}marchants/`, data, {
    //     headers,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     saveFiles(response.data.id)
    //     localStorage.setItem("merchant_id", response.data.id);
    //     swal({
    //       position: "top-end",
    //       text: "Save Successfull",
    //       icon: "success",
    //       button: false,
    //       timer: 1500,
    //     });
    //     reset();
    //     localStorage.setItem("isSubmitBusiness", 1);
    //     localStorage.removeItem("first_name");
    //     localStorage.removeItem("last_name");
    //     localStorage.removeItem("email");
    //     localStorage.removeItem("address1");
    //     localStorage.removeItem("address2");
    //     localStorage.removeItem("city");
    //     localStorage.removeItem("state");
    //     localStorage.removeItem("postal_code");
    //     localStorage.removeItem("nid_number");
    //     localStorage.removeItem("dob");
    //     localStorage.removeItem("merchant_id");
    //     localStorage.removeItem("indeustry");
    //     localStorage.removeItem("category_code");
    //     localStorage.removeItem("business_website");
    //     localStorage.removeItem("description"),
    //       localStorage.removeItem("status"),
    //       localStorage.removeItem("merchant_pic");
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //     swal({
    //       position: "top-end",
    //       text: error.response.data.detail,
    //       icon: "error",
    //       button: false,
    //       timer: 1500,
    //     });
    //   });
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

  const getFileLebel = (e) => {
    if (e == 2001001) {
      return "EIIN File:";
    } else if (e == 2001002 || e == 2001006) {
      return "N Corporation File";
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
            Business Name
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("business_short_name", {
                required: "Please provide Business Short Name",
              })}
              placeholder="Business Short Name"
            />
            <span className="text-danger">{errors.business_name?.message}</span>
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
              })}
              placeholder="Business no"
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
            Phone Number
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_phone", {
                required: "Please provide Phone number",
              })}
              placeholder="Phone Number"
            />
            <span className="text-danger">{errors.city?.message}</span>
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
                required: "Please provide Email",
              })}
              placeholder="Email"
            />
            <span className="text-danger">{errors.city?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Business website
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("bussiness_website")}
              placeholder="Business website"
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
              <option>Select District</option>
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
          <CButton color="success" type="submit" className="mx-3">
            Save
          </CButton>
          {/* <CButton color="primary" onClick={() => clickNext(1)}>
            Next
          </CButton> */}
        </div>
      </CForm>
    </div>
  );
};

export default BusinessStructure;
