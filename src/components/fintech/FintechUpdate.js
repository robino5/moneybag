import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const FintechUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [lookupList, setLooupList] = useState();
  console.log(location.state);

  const updateFintech = (e) => {
    const fintechData = {
      name: e.fintechName,
      short_name: e.shortName,
      country_no:
        e.country === "" ? location.state.country_no : parseInt(e.country),
      address_1: e.address_line_1,
      address_2: e.address_line_2,
      city: e.city,
      state_no: e.state === "" ? location.state.state_no : parseInt(e.state),
      postal_code: e.postal_code,
      swift_code: e.swift_code,
      general_banking: e.general_banking ? 1 : 0,
      card_service: e.card_service ? 1 : 0,
      internet_banking: e.internet_banking ? 1 : 0,
      mfs: e.mfs ? 1 : 0,
      dfs: e.dfs ? 1 : 0,
      qr_code: e.qr_code ? 1 : 0,
    };
    console.log("new", fintechData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}financial-organizations/update/${location.state.id}`,
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
              <h6 className="text-center">Update Fintech</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateFintech)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Fintech Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.name}
                        {...register("fintechName")}
                        placeholder="Fintech Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Short Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.short_name}
                        {...register("shortName")}
                        placeholder=" Short Name"
                      />
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
                        {lookupList &&
                          getCountryOption(lookupList).map((country, index) => (
                            <option
                              value={country.id}
                              selected={
                                country.id === location.state.country_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
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
                        defaultValue={location.state.address_1}
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
                        defaultValue={location.state.address_2}
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
                        defaultValue={location.state.city}
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
                        {lookupList &&
                          getStateOption(lookupList).map((country, index) => (
                            <option
                              value={country.id}
                              selected={
                                country.id === location.state.state_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
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
                        defaultValue={location.state.postal_code}
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
                        defaultValue={location.state.swift_code}
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
                        defaultChecked={
                          location.state.general_banking == 1 ? true : false
                        }
                        label="General Banking"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("card_service")}
                        defaultChecked={
                          location.state.card_service == 1 ? true : false
                        }
                        label="Card Service"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("internet_banking")}
                        defaultChecked={
                          location.state.internet_banking == 1 ? true : false
                        }
                        label="Internet Banking"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("mfs")}
                        defaultChecked={location.state.mfs == 1 ? true : false}
                        label="MFS"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("dfs")}
                        defaultChecked={location.state.dfs == 1 ? true : false}
                        label="DFS"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("otc")}
                        defaultChecked={
                          location.state.qr_code == 1 ? true : false
                        }
                        label="OTC"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-3 col-form-label"></CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        {...register("qr_code")}
                        defaultChecked={
                          location.state.status == 1 ? true : false
                        }
                        label="QR Code"
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/fintech">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" color="info">
                      Update
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

export default FintechUpdate;
