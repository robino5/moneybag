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
  const [serviceList, setServiceList] = useState();
  const [service, setService] = useState({});

  console.log("loaction", service);

  // const updateFintech = (e) => {
  //   const fintechData = {
  //     name: e.fintechName,
  //     short_name: e.shortName,
  //     country_no:
  //       e.country === "" ? location.state.country_no : parseInt(e.country),
  //     address_1: e.address_line_1,
  //     address_2: e.address_line_2,
  //     city: e.city,
  //     state_no: e.state === "" ? location.state.state_no : parseInt(e.state),
  //     postal_code: e.postal_code,
  //     swift_code: e.swift_code,
  //     general_banking: e.general_banking ? 1 : 0,
  //     card_service: e.card_service ? 1 : 0,
  //     internet_banking: e.internet_banking ? 1 : 0,
  //     mfs: e.mfs ? 1 : 0,
  //     dfs: e.dfs ? 1 : 0,
  //     qr_code: e.qr_code ? 1 : 0,
  //   };
  //   console.log("new", fintechData);
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   };
  //   axios
  //     .put(
  //       `${process.env.REACT_APP_API_URL}financial-organizations/update/${location.state.id}`,
  //       fintechData,
  //       {
  //         headers,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       swal({
  //         position: "top-end",
  //         text: "Organization Created Successfull",
  //         icon: "success",
  //         button: false,
  //         timer: 1500,
  //       });
  //       navigate("/fintech");
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //       swal({
  //         position: "top-end",
  //         text: error.response.data.detail,
  //         icon: "error",
  //         button: false,
  //         timer: 1500,
  //       });
  //     });
  // };

  const getLookupList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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

  const getServiceList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setServiceList(responce.data);
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

  const getServices = (e) => {
    let data = []
    e && e.map((element) => {
      if (element.organization_no === location.state.id) {
        data.push(element)
      }
    })
    return data
  }

  const getfintechType = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 8001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };



  const getServiceOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 6001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const getServiceCategoryOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 7001 && element.is_active === 1) {
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

  const getServiceName=(e)=>{
    let data;
    lookupList&&lookupList.map((element)=>{
          if(element.id===e){
            data=element.name
          }
    })
    return data;
  }

  useEffect(() => {
    getLookupList();
    getServiceList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <h6 className="text-center">Add Fintech</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit()}>
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
                        defaultValue={location.state.name}
                        placeholder="Fintech Name"
                      />
                      <span className="text-danger">
                        {errors.fintechName?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Fintech Type
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        type="number"
                        {...register("fintech_type")}
                      >
                        {lookupList &&
                          getfintechType(lookupList).map((country, index) => (
                            <option value={country.id}
                              selected={
                                country.id === location.state.org_type
                                  ? "selected"
                                  : ""
                              }
                              key={index}>
                              {country.name}
                            </option>
                          ))}
                      </CFormSelect>
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
                        defaultValue={location.state.short_name}
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
                        {lookupList &&
                          getCountryOption(lookupList).map((country, index) => (
                            <option value={country.id}
                              selected={
                                country.id === location.state.country_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}>
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
                        defaultValue={location.state.address_1}
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
                        defaultValue={location.state.address_2}
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
                        defaultValue={location.state.city}
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
                            <option value={country.id}
                              selected={
                                country.id === location.state.state_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}>
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
                        defaultValue={location.state.postal_code}
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
                        defaultValue={location.state.swift_code}
                        placeholder="Swift Code"
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
                        defaultChecked={
                          location.state.status == 1 ? true : false
                        }
                        {...register("status")}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="">
                    <CCol sm={2}>
                      <p>Service Name</p>
                    </CCol>
                    <CCol sm={2}>
                      <p>Service Category</p>
                    </CCol>
                    <CCol sm={3}>
                      <p>End Point Url</p>
                    </CCol>
                    <CCol sm={3}>
                      <p>Call Back Url</p>
                    </CCol>
                    <CCol sm={1}>
                      <p>Active?</p>
                    </CCol>
                    <CCol sm={1}></CCol>
                  </CRow>
                  <hr></hr>
                  <CRow className="mb-3">
                    <CCol sm={2}>
                      <CFormSelect
                        aria-label="Default select example"
                        type="number"
                        {...register("service_type")}
                      >
                        {lookupList &&
                          getServiceOption(lookupList).map(
                            (country, index) => (
                              <option value={country.id} 
                              selected={
                                country.id === service.service_type
                                  ? "selected"
                                  : ""
                              }
                              key={index}>
                                {country.name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                    </CCol>
                    <CCol sm={2}>
                      <CFormSelect
                        aria-label="Default select example"
                        type="number"
                        {...register("category_service_id"
                        )}
                      >
                        <option>Service Category</option>
                        {lookupList &&
                          getServiceCategoryOption(lookupList).map(
                            (country, index) => (
                              <option value={country.id} 
                              selected={
                                country.id === service.category_service_id
                                  ? "selected"
                                  : ""
                              }
                              key={index}>
                                {country.name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("end_point_url")}
                        defaultValue={service.end_point_url}
                        placeholder="End Point Url"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("call_back_url")}
                        defaultValue={service.call_back_url}
                        placeholder="Call Back Url"
                      />
                    </CCol>
                    <CCol sm={1}>
                      <CFormCheck
                        name="status"
                        label="Active"
                        defaultChecked={
                          service.is_active === 1 ? true : false
                        }
                        {...register("is_active")}
                      />
                    </CCol>
                    <CCol sm={1}>
                      <CButton
                        color="danger"
                      >
                        Remove
                      </CButton>
                    </CCol>
                  </CRow>
                  <hr></hr>
                  {getServices(serviceList) && getServices(serviceList).map((element) => {
                    return (
                      <CRow className="">
                        <CCol sm={2}>
                          <p>{getServiceName(element.service_type)}</p>
                        </CCol>
                        <CCol sm={2}>
                          <p>{getServiceName(element.category_service_id)}</p>
                        </CCol>
                        <CCol sm={3}>
                          <p>{element.end_point_url}</p>
                        </CCol>
                        <CCol sm={3}>
                          <p>{element.call_back_url}</p>
                        </CCol>
                        <CCol sm={1}>
                          <p>{element.is_active === 1 ? "Active" : "Inactive"}</p>
                        </CCol>
                        <CCol sm={1}>
                          <CButton color="info"
                          onClick={()=>{setService(element)}}
                          >
                            Edit
                          </CButton>
                        </CCol>
                      </CRow>
                    )

                  })}
                  {/* <CRow className="mb-3">
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
                  </CRow> */}
                  <div className="text-center ">
                    <Link to="/fintech">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" color="success">
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
