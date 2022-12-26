import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  CListGroup,
} from "@coreui/react";
import { element } from "prop-types";

const FintechAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const navigate = useNavigate();
  const [lookupList, setLooupList] = useState();
  // const [services, setservices] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [serviceData, serviceListDate] = useState([]);
  const [fintechType, setFintecType] = useState([]);
  const [serviceCategory, setServiceCategory] = useState();
  const [serviceType, setServiceType] = useState();
  const [rateType, setRateType] = useState();
  const [rate, setRate] = useState();
  const [status, setStatus] = useState();
  // serviceID = [6001001,]

  // const isServiceAlreadyExists = () => {
  //   serviceID.forEach(service => {

  //   })
  // }

  // const setservic = (e) => {
  //   serviceID.push(e.target.value);
  // };

  // const filterService = (e) => {
  //   let data = [];
  //   console.log(serviceCategory, e);
  //   serviceCategory?.map((categoryservice) => {
  //     if (categoryservice == 7001002) {
  //       e.map((service) => {
  //         if (
  //           service.id == 6001001 ||
  //           service.id == 6001002 ||
  //           service.id == 6001003 ||
  //           service.id == 6001004
  //         ) {
  //           data.push(service);
  //         }
  //       });
  //     } else if (categoryservice == 7001004) {
  //       e.map((service) => {
  //         if (service.id == 6001005 || service.id == 6001006) {
  //           data.push(service);
  //         }
  //       });
  //     }
  //   });

  //   return data;
  // };

  console.log(fields);

  const saveFintech = (e) => {
    console.log("element");
    const fintechData = {
      name: e.fintechName,
      org_type: parseInt(e.fintech_type),
      fintech_type: parseInt(e.fintech_type),
      short_name: e.shortName,
      country_no: parseInt(e.country),
      address_1: e.address_line_1,
      address_2: e.address_line_2,
      city: e.city,
      state_no: parseInt(e.state),
      postal_code: e.postal_code,
      swift_code: e.swift_code,
      status: e.status ? 1 : 0,
      // general_banking: e.general_banking ? 1 : 0,
      // card_service: e.card_service ? 1 : 0,
      // internet_banking: e.internet_banking ? 1 : 0,
      // mfs: e.mfs ? 1 : 0,
      // dfs: e.dfs ? 1 : 0,
      // qr_code: e.qr_code ? 1 : 0,
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
        console.log(response), saveService(response.data.id, e.services);
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

  const saveService = (id, services) => {
    let data = [];
    services &&
      services.map((element) => {
        data.push({
          organization_no: id,
          category_service_id: parseInt(element.category_service_id),
          service_type: parseInt(element.service_type),
          end_point_url: "Test",
          call_back_url: "Test",
          rate: parseInt(element.rate),
          rate_type: element.rate_type,
          is_active: element.is_active ? 1 : 0,
        });
      });
    console.log("services", data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}services/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Fintech Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/fintech");
      })
      .catch((error) => {
        console.error("There was an error!", error.response.status);
        if (error.response.status == 401) {
          navigate("/login");
        }
        swal({
          position: "top-end",
          text: error.response.status,
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

  var numbers = /^[0-9]+$/;

  const setServicesOptions = (services) => {
    const currentSelected = [];

    fields?.map((field) => {
      if (
        field.service_type !== undefined &&
        field.service_type.match(numbers)
      ) {
        currentSelected.push(Number(field.service_type));
      }
    });

    let data = [];
    for (let i = 0; i < services.length; i++) {
      console.log("CCC: ", currentSelected);
      if (!currentSelected.includes(services[i].id)) {
        data.push(services[i]);
      }
    }
    console.log("DATA", data, currentSelected);
    return data;
  };

  const getServiceOption = (e) => {
    let data = [];
    e.forEach((element) => {
      if (element.lov_id === 6001 && element.is_active === 1) {
        data.push({ id: element.id, name: element.name });
      }
    });
    return data;
  };

  const getServiceCategoryName = (e) => {
    let name;
    lookupList?.map((element) => {
      if (element.id == e) {
        name = element.name;
      }
    });
    return name;
  };

  // const getFIlterService=(e)=>{
  //   let data=[];
  //   if(fields.length>0){
  //       e?.map((service)=>{
  //         fields.map((id)=>{
  //           if(service.id!=id.service_type){
  //             console.log(service);
  //             data.push(service)
  //           }
  //         })
  //       })
  //       return data
  //   }else{
  //     return e
  //   }
  // }

  // fields?.map((e) => {
  //   if (e.service_type != element.id) {
  //     Date.push({ id: element.id, name: element.name });
  //   }
  // });

  const getServiceCategoryOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 7001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
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

  const getStateOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 3001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  // const addServices = () => {
  //   services.push(
  //     {
  //       category_service_id: serviceCategory,
  //       service_type: serviceType,
  //       end_point_url: "test",
  //       call_back_url: "test",
  //       rate_type: rateType,
  //       rate: rate,
  //       is_active: status?1:0
  //     }
  //   )
  //   console.log("services:",services)
  // }

  // const removeService=(e)=>{
  //    console.log(services)

  //    const data=services.splice(e,1)
  //    console.log(services)
  //    setservices(services)
  //    console.log("data",data)
  //   //  setservices(data)

  // }

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
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
                      Fintech Type
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        type="number"
                        {...register("fintech_type", {
                          required: "Please Select The Fintech Type",
                        })}
                        onChange={(e) => {
                          setFintecType(e.target.value);
                        }}
                      >
                        <option value={""}>Fintech Type</option>
                        {lookupList &&
                          getfintechType(lookupList).map((country, index) => (
                            <option value={country.id} key={index}>
                              {country.name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.fintech_type?.message}
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
                          required: "Please Provide Fintech Short Name",
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
                        {...register("country", {
                          required: "Please Select Your Country",
                        })}
                      >
                        <option value={""}>Select Country</option>
                        {lookupList &&
                          getCountryOption(lookupList).map((country, index) => (
                            <option value={country.id} key={index}>
                              {country.name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.country?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("address_line_1", {
                          required: "Please Provide Your Address",
                        })}
                        placeholder="Address Line 1"
                      />
                      <span className="text-danger">
                        {errors.address_line_1?.message}
                      </span>
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
                        {...register("city", {
                          required: "Please Provide Your City",
                        })}
                        placeholder="City"
                      />
                      <span className="text-danger">
                        {errors.city?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      District
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("state", {
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
                      <span className="text-danger">
                        {errors.state?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Postal Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("postal_code", {
                          required: "Please Provide Your Postal Code",
                        })}
                        placeholder="Postal Code"
                      />
                      <span className="text-danger">
                        {errors.postal_code?.message}
                      </span>
                    </CCol>
                  </CRow>
                  {/* <div hidden={fintechType != 8001001 ? true : false}>
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
                  </div> */}

                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        name="status"
                        label="Active"
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
                      <p>Rate Type</p>
                    </CCol>
                    <CCol sm={2}>
                      <p>Rate</p>
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
                  </CRow>
                  {fields.map((service, index) => {
                    return (
                      <CRow className="mb-3" key={service.id}>
                        <CCol sm={3}>
                          <CFormSelect
                            aria-label="Default select example"
                            type="number"
                            {...register(
                              `services.${index}.category_service_id`
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
                            {...register(`services.${index}.service_type`)}
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
                            {...register(`services.${index}.rate`)}
                            placeholder="Rate"
                          />
                        </CCol>
                        <CCol sm={2}>
                          <CFormSelect
                            aria-label="Default select example"
                            type="number"
                            {...register(`services.${index}.rate_type`)}
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
                            {...register(`services.${index}.is_active`)}
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
                      <CButton
                        color="primary"
                        onClick={() => {
                          append({});
                        }}
                      >
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
