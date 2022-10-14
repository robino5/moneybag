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

  const saveBusinessDetails = (e) => {
    const Data = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      email: localStorage.getItem("email"),
      address1: localStorage.getItem("address1"),
      address2: localStorage.getItem("address2"),
      city: localStorage.getItem("city"),
      state: localStorage.getItem("state"),
      postal_code: localStorage.getItem("postal_code"),
      nid_number: localStorage.getItem("nid_number"),
      country_no: localStorage.getItem("country_no"),
      business_type: localStorage.getItem("business_type"),
      business_name: localStorage.getItem("business_name"),
      business_address1: localStorage.getItem("business_address1"),
      business_address2: localStorage.getItem("business_address2"),
      business_city: localStorage.getItem("business_city"),
      business_state: localStorage.getItem("business_state"),
      business_postal_code: localStorage.getItem("business_postal_code"),
      industry_no: e.industry,
      website: e.bussiness_website,
      product_desc: e.Product_desc,
    };
    console.log(Data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}marchants/`, Data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Save Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        reset();
        localStorage.setItem("isSubmitBusiness", 1);
        localStorage.removeItem("first_name");
        localStorage.removeItem("last_name");
        localStorage.removeItem("email");
        localStorage.removeItem("address1");
        localStorage.removeItem("address2");
        localStorage.removeItem("city");
        localStorage.removeItem("state");
        localStorage.removeItem("postal_code");
        localStorage.removeItem("nid_number");
        localStorage.removeItem("country_no");
        localStorage.removeItem("business_type");
        localStorage.removeItem("business_name");
        localStorage.removeItem("business_address1");
        localStorage.removeItem("business_address2"),
          localStorage.removeItem("business_city");
        localStorage.removeItem("business_state");
        localStorage.removeItem("business_postal_code");
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

  useEffect(() => {
    getLookupList();
    localStorage.setItem("isSubmitBusiness", 0);
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <div className="text-center">
          <h2>Personal Details</h2>
        </div>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveBusinessDetails)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Industry
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("industry", {
                          required: "Please select Industry",
                        })}
                        type="number"
                      >
                        <option>Select State</option>
                        {lookupList &&
                          getIndustryOption(lookupList).map(
                            (country, index) => (
                              <option value={country.id} key={index}>
                                {country.name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.industry?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Business website
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("bussiness_website")}
                        placeholder="Business website"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Product description
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormTextarea
                        type="text"
                        {...register("Product_desc")}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <CButton type="submit" color="success" className="mx-3">
                      Save
                    </CButton>
                    <CButton color="primary" onClick={() => clickNext(1)}>
                      Next
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

export default BusinessDetails;
