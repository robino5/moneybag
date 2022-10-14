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
  CFormCheck,
  CButton,
} from "@coreui/react";

const FintechAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [lookupList, setLooupList] = useState();

  const saveFintech = (e) => {
    const fintechData = {
      name: e.fintechName,
      short_name: e.shortName,
      country_no: parseInt(e.country),
      address_1: e.address_line_1,
      address_2: e.address_line_2,
      city: e.city,
      state_no: parseInt(e.state),
      postal_code: e.postal_code,
      swift_code: e.swift_code,
      general_banking: e.general_banking ? 1 : 0,
      card_service: e.card_service ? 1 : 0,
      internet_banking: e.internet_banking ? 1 : 0,
      mfs: e.mfs ? 1 : 0,
      dfs: e.dfs ? 1 : 0,
      qr_code: e.qr_code ? 1 : 0,
    };
    console.log(fintechData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}financial-organizations/`,
        fintechData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Organization Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/fintech");
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

  const getCountryOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 1001 && element.is_active === 1) {
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

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h6 className="text-center">Add Fintech</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveFintech)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Fintech Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("fintechName", {
                          required: "Please provide Fintech Name",
                        })}
                        placeholder="Fintech Name"
                      />
                      <span className="text-danger">
                        {errors.fintechName?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Short Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("shortName", {
                          required: "Please provide Short Name",
                        })}
                        placeholder=" Short Name"
                      />
                      <span className="text-danger">
                        {errors.shortName?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Country
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        type="number"
                        {...register("country")}
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
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("address_line_1")}
                        placeholder="Address Line 1"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("address_line_2")}
                        placeholder="Address Line 2"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      City
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("city")}
                        placeholder="City"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      State
                    </CFormLabel>
                    <CCol sm={9}>
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
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Postal Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("postal_code")}
                        placeholder="Postal Code"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Swift Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("swift_code")}
                        placeholder="Swift Code"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Service category
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("general_banking")}
                        label="General Banking"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("card_service")}
                        label="Card Service"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("internet_banking")}
                        label="Internet Banking"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck {...register("mfs")} label="MFS" />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck {...register("dfs")} label="DFS" />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck {...register("otc")} label="OTC" />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck {...register("qr_code")} label="QR Code" />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/fintech">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" color="success">
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

export default FintechAdd;
