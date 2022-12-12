import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import {
  CCard,
  CCardBody,
  CFormCheck,
  CFormSelect,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CFormTextarea,
} from "@coreui/react";

const BusinessDetails = ({ clickNext }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const [lookupList, setLooupList] = useState();
  const [businessType, setBusinessType] = useState();
  console.log(businessType);

  const getCetagoryCode = (e) => {
    if (e == 4001001) {
      return 8299;
    } else if (e == 4001002) {
      return 8398;
    } else if (e == 4001003) {
      return 7801;
    } else if (e == 4001003) {
      return 7801;
    } else if (e == 4001004) {
      return 7801;
    } else if (e == 4001005) {
      return 5137;
    } else if (e == 4001006) {
      return 9802;
    } else if (e == 4001007) {
      return 9985;
    } else if (e == 4001008) {
      return 3531;
    } else if (e == 4001009) {
      return 8099;
    } else if (e == 4001010) {
      return 9985;
    } else if (e == 4001007) {
      return 9997;
    }
  };
  const saveBusinessDetails = (e) => {
    if (e) {
      swal({
        position: "top-end",
        text: "Category Service Created Successfull",
        icon: "success",
        button: false,
        timer: 1500,
      });
      localStorage.setItem("merchant_id", e.merchant_id);
      localStorage.setItem("business_type", parseInt(e.type_of_business));
      localStorage.setItem("indeustry", e.industry);
      localStorage.setItem("category_code", getCetagoryCode(businessType));
      localStorage.setItem("description", e.Product_desc);
      localStorage.setItem("status", e.status ? 1 : 0);
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
  };

  // const Data = {
  //   first_name: localStorage.getItem("first_name"),
  //   last_name: localStorage.getItem("last_name"),
  //   email: localStorage.getItem("email"),
  //   address1: localStorage.getItem("address1"),
  //   address2: localStorage.getItem("address2"),
  //   city: localStorage.getItem("city"),
  //   state: parseInt(localStorage.getItem("state")),
  //   postal_code: localStorage.getItem("postal_code"),
  //   nid_number: localStorage.getItem("nid_number"),
  //   country_no: parseInt(localStorage.getItem("country_no")),
  //   business_type: parseInt(localStorage.getItem("business_type")),
  //   business_name: localStorage.getItem("business_name"),
  //   bin: localStorage.getItem("business_no"),
  //   business_address1: localStorage.getItem("business_address1"),
  //   business_address2: localStorage.getItem("business_address2"),
  //   business_city: localStorage.getItem("business_city"),
  //   business_state: parseInt(localStorage.getItem("business_state")),
  //   business_postal_code: localStorage.getItem("business_postal_code"),
  //   marchant_id: e.merchant_id,
  //   industry_no: parseInt(e.industry),
  //   category_code: e.cat_code,
  //   website: e.bussiness_website,
  //   product_desc: e.Product_desc,
  //   is_active: e.status ? 1 : 0,
  //   upload_file: localStorage.getItem("file"),
  //   merchant_pic: localStorage.getItem("merchant_pic"),
  // };

  // console.log(Data)

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

  const getIndustryOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 4001 && element.is_active === 1) {
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

  useEffect(() => {
    getLookupList();
    localStorage.setItem("isSubmitBusiness", 0);
  }, []);

  return (
    <div>
      <CForm onSubmit={handleSubmit(saveBusinessDetails)}>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
          Merchant ID
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("merchant_id", {
                required: "Please select Merchant ID",
              })}
              placeholder="Merchant cetagory Id"
            />
            <span className="text-danger">{errors.merchant_id?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Legal Identity of Company
          </CFormLabel>
          <CCol sm={8}>
            <CFormSelect
              aria-label="Default select example"
              type="number"
              {...register("type_of_business")}
            >
              <option>Select One</option>
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
          <CFormLabel className="col-sm-4 col-form-label">
            Industry/Business Type
          </CFormLabel>
          <CCol sm={8}>
            <CFormSelect
              aria-label="Default select example"
              {...register("industry", {
                required: "Please select Industry",
              })}
              type="number"
              onChange={(e) => {
                setBusinessType(e.target.value);
              }}
            >
              <option>Select Industry/Business</option>
              {lookupList &&
                getIndustryOption(lookupList).map((country, index) => (
                  <option value={country.id} key={index}>
                    {country.name}
                  </option>
                ))}
            </CFormSelect>
            <span className="text-danger">{errors.industry?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Merchant Category Code
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              value={getCetagoryCode(businessType)}
              {...register("cat_code")}
              placeholder="Merchant Category Code"
            />
            <span className="text-danger">{errors.cat_code?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Product description
          </CFormLabel>
          <CCol sm={8}>
            <CFormTextarea type="text" {...register("Product_desc")} />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">Status</CFormLabel>
          <CCol sm={8}>
            <CFormCheck label="Active" {...register("status")} />
          </CCol>
        </CRow>
        <div className="text-center ">
          <CButton type="submit" color="success" className="mx-3">
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

export default BusinessDetails;
