import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm, useFieldArray } from "react-hook-form";
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
    control,
  } = useForm({ mode: "all" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
    name: "addServices",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [lookupList, setLooupList] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceType, setServiceType] = useState();
  // const [service, setService] = useState({});
  // const [updatedService, setUpdatedService] = useState({
  //   organization_no: service.organization_no,
  //   category_service_id: null,
  //   service_type: null,
  //   end_point_url: "",
  //   call_back_url: "",
  //   is_active: null,
  // });

  // const handlesercices = (e) => {
  //   na = e.target.name;
  //   value = e.target.value;
  //   setUpdatedService({ ...updatedService, [na]: value });
  //   console.log(e);
  // };

  const updateFintech = async (e) => {
    console.log(e);
    const fintechData = {
      org_id: location.state.org_id,
      name: e.fintechName,
      short_name: e.shortName,
      org_type:
        e.fintech_type === ""
          ? location.state.org_type
          : parseInt(e.fintech_type),
      country_no:
        e.country === "" ? location.state.country_no : parseInt(e.country),
      address_1: e.address_line_1,
      address_2: e.address_line_2,
      city: e.city,
      state_no: e.state === "" ? location.state.state_no : parseInt(e.state),
      postal_code: e.postal_code,
      swift_code: e.swift_code,
      status: e.status ? 1 : 0,
    };
    console.log("new", fintechData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}financial-organizations/update/${location.state.id}`,
        fintechData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
        swal({
          position: "top-end",
          text: error.response.data.detail,
          icon: "error",
          button: false,
          timer: 1500,
        });
      });

    if (e.addServices) {
      let data = [];
      e.addServices &&
        e.addServices.map((element) => {
          data.push({
            organization_no: location.state.id,
            category_service_id: parseInt(element.category_service_id),
            service_type: parseInt(element.service_type),
            end_point_url: "Test",
            call_back_url: "Test",
            rate: parseFloat(element.rate).toFixed(2),
            rate_type: element.rate_type,
            is_active: element.is_active ? 1 : 0,
          });
        });

      axios
        .post(`${process.env.REACT_APP_API_URL}services/`, data, {
          headers,
        })
        .then((response) => {
          console.log(response);
          getLookupList();
          getServiceList();
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
    }

    (await e.services) &&
      e.services.map((element) => {
        console.log("element", element);
        axios
          .post(
            `${process.env.REACT_APP_API_URL}services/update/${parseInt(
              element.id
            )}`,
            {
              organization_no: location.state.id,
              category_service_id: parseInt(element.category_service_id),
              service_type: parseInt(element.service_type),
              end_point_url: "Test",
              rate: parseFloat(element.rate).toFixed(2),
              rate_type: element.rate_type,
              call_back_url: "Test",
              is_active: element.is_active ? 1 : 0,
            },
            {
              headers,
            }
          )
          .then((response) => {
            console.log(response);

            swal({
              position: "top-end",
              text: "Fintect Update Successfull",
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
      });
  };

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
        if (error.response.status == 401) {
          navigate("/login");
        }
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
        if (error.response.status == 401) {
          navigate("/login");
        }
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
    let data = [];
    e &&
      e.map((element) => {
        if (element.organization_no === location.state.id) {
          data.push(element);
        }
      });
    return data;
  };

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

  const getServiceName = (e) => {
    let data;
    lookupList &&
      lookupList.map((element) => {
        if (element.id === e) {
          data = element.name;
        }
      });
    return data;
  };

  const addSercideRow = () => {
    if (fields.length > 0) {
      const currentSelected = [];

      for (let i = 0; i < fields.length - 1; i++) {
        if (
          fields[i].service_type !== undefined &&
          fields[i].service_type.match(numbers)
        ) {
          currentSelected.push(Number(fields[i].service_type));
        }
      }

      serviceList &&
        serviceList.map((service) => {
          currentSelected.push(Number(service.service_type));
        });
      console.log(currentSelected);
      if (currentSelected.includes(serviceType)) {
        swal({
          position: "top-end",
          text: "You Can't Select Duplicate Service",
          icon: "warning",
          button: false,
          timer: 1500,
        });
      } else {
        append({});
      }
    } else {
      append({});
    }
  };

  // const updateData = () => {
  //   const multipleValues = getValues(["call_back_url", "end_point_url"]);
  //   console.log("multipleValues", multipleValues);
  // };

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
                <CForm onSubmit={handleSubmit(updateFintech)}>
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
                            <option
                              value={country.id}
                              selected={
                                country.id === location.state.org_type
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
                      District
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
                    <CCol sm={3}>
                      <p>Service Category</p>
                    </CCol>
                    <CCol sm={3}>
                      <p>Service Name</p>
                    </CCol>
                    <CCol sm={2}>
                      <p>Rate</p>
                    </CCol>
                    <CCol sm={2}>
                      <p>Rate Type</p>
                    </CCol>
                    {/* <CCol sm={3}>
                      <p>End Point Url</p>
                    </CCol>
                    <CCol sm={3}>
                      <p>Call Back Url</p>
                    </CCol> */}
                    <CCol sm={1}>
                      <p>Status</p>
                    </CCol>
                    <CCol sm={1}></CCol>
                  </CRow>
                  <hr></hr>
                  {getServices(serviceList) &&
                    getServices(serviceList).map((element, index) => {
                      return (
                        <CRow className="mb-3">
                          <CCol sm={3}>
                            <CFormSelect
                              aria-label="Default select example"
                              type="number"
                              defaultValue={element.category_service_id}
                              {...register(
                                `services.${index}.category_service_id`
                              )}
                            >
                              {lookupList &&
                                getServiceCategoryOption(lookupList).map(
                                  (country, index) => (
                                    <option
                                      value={country.id}
                                      selected={
                                        country.id ===
                                        element.category_service_id
                                          ? "selected"
                                          : ""
                                      }
                                      key={index}
                                    >
                                      {country.name}
                                    </option>
                                  )
                                )}
                            </CFormSelect>
                          </CCol>
                          <CCol sm={3}>
                            <CFormSelect
                              aria-label="Default select example"
                              type="number"
                              defaultValue={element.service_type}
                              {...register(`services.${index}.service_type`)}
                            >
                              {lookupList &&
                                getServiceOption(lookupList).map(
                                  (country, index) => (
                                    <option
                                      value={country.id}
                                      selected={
                                        country.id === element.service_type
                                          ? "selected"
                                          : ""
                                      }
                                      key={index}
                                    >
                                      {country.name}
                                    </option>
                                  )
                                )}
                            </CFormSelect>
                          </CCol>
                          <CCol sm={2}>
                            <CFormInput
                              type="text"
                              defaultValue={element.rate}
                              {...register(`services.${index}.rate`)}
                              placeholder="Rate"
                            />
                          </CCol>
                          <CCol sm={2}>
                            <CFormSelect
                              aria-label="Default select example"
                              type="number"
                              defaultValue={element.rate_type}
                              {...register(`services.${index}.rate_type`)}
                            >
                              <option
                                selected={element.rate_type == "F"}
                                value={"F"}
                              >
                                Fixed
                              </option>
                              <option
                                selected={element.rate_type == "P"}
                                value={"P"}
                              >
                                Percentage{" "}
                              </option>
                            </CFormSelect>
                          </CCol>
                          {/* <CCol sm={3}>
                            <CFormInput
                              type="text"
                              defaultValue={element.end_point_url}
                              {...register(`services.${index}.end_point_url`)}
                              placeholder="End Point Url"
                            />
                          </CCol>
                          <CCol sm={3}>
                            <CFormInput
                              type="text"
                              defaultValue={element.call_back_url}
                              {...register(`services.${index}.call_back_url`)}
                              placeholder="Call Back Url"
                            />
                          </CCol> */}
                          <CCol sm={1}>
                            <CFormCheck
                              name="status"
                              label="Active"
                              defaultChecked={
                                element.is_active === 1 ? true : false
                              }
                              {...register(`services.${index}.is_active`)}
                            />
                          </CCol>
                          <CCol sm={1}>
                            <CFormInput
                              type="text"
                              defaultValue={element.id}
                              hidden
                              {...register(`services.${index}.id`)}
                              placeholder="End Point Url"
                            />
                          </CCol>
                        </CRow>
                      );
                    })}
                  {fields.map((service, index) => {
                    return (
                      <CRow className="mb-3" key={service.id}>
                        <CCol sm={3}>
                          <CFormSelect
                            aria-label="Default select example"
                            type="number"
                            {...register(
                              `addServices.${index}.category_service_id`
                            )}
                          >
                            <option>Service Category</option>
                            {lookupList &&
                              getServiceCategoryOption(lookupList).map(
                                (country, index) => (
                                  <option value={country.id} key={index}>
                                    {country.name}
                                  </option>
                                )
                              )}
                          </CFormSelect>
                        </CCol>
                        <CCol sm={3}>
                          <CFormSelect
                            aria-label="Default select example"
                            type="number"
                            {...register(`addServices.${index}.service_type`)}
                            onChange={(e) => {
                              setServiceType(parseInt(e.target.value));
                            }}
                          >
                            <option>Service Name</option>
                            {lookupList &&
                              getServiceOption(lookupList).map(
                                (country, index) => (
                                  <option value={country.id} key={index}>
                                    {country.name}
                                  </option>
                                )
                              )}
                          </CFormSelect>
                        </CCol>
                        <CCol sm={2}>
                          <CFormInput
                            type="text"
                            {...register(`addServices.${index}.rate`)}
                            placeholder="Rate"
                          />
                        </CCol>
                        <CCol sm={2}>
                          <CFormSelect
                            aria-label="Default select example"
                            type="number"
                            {...register(`addServices.${index}.rate_type`)}
                          >
                            <option>Select Rate Type</option>
                            <option value={"F"}>Fixed</option>
                            <option value={"P"}>Percentage </option>
                          </CFormSelect>
                        </CCol>
                        {/* <CCol sm={3}>
                          <CFormInput
                            type="text"
                            {...register(`addServices.${index}.end_point_url`)}
                            placeholder="End Point Url"
                          />
                        </CCol>
                        <CCol sm={3}>
                          <CFormInput
                            type="text"
                            {...register(`addServices.${index}.call_back_url`)}
                            placeholder="Call Back Url"
                          />
                        </CCol> */}
                        <CCol sm={1}>
                          <CFormCheck
                            name="status"
                            label="Active"
                            {...register(`addServices.${index}.is_active`)}
                          />
                        </CCol>
                        <CCol sm={1}>
                          <CButton
                            color="danger"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Remove
                          </CButton>
                        </CCol>
                      </CRow>
                    );
                  })}

                  <CRow>
                    <CCol sm={2}>
                      <CButton color="primary" onClick={addSercideRow}>
                        Add Service
                      </CButton>
                    </CCol>
                  </CRow>
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
