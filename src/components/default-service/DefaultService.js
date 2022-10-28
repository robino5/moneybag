import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilPlus, cilMinus } from "@coreui/icons";
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

const DefaultService = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [organizationList, setOrganizationList] = useState();
  const [serviceList, setServiceList] = useState();
  const [defaultService, setdefaultService] = useState([]);

  const getOrganization = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}financial-organizations/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setOrganizationList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getService = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
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

  const saveDefaultServices = () => {
    console.log("save", defaultService);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}default-services/`,
        defaultService,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Store Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        setdefaultService([]);
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

  const addDefaultService = (e) => {
    console.log(e.service_name);

    defaultService.push({
      service_no: parseInt(e.service_name),
      bank_no: parseInt(e.bank_name),
    });
  };

  const removeDefaultService = (i) => {
    let data = [...defaultService];
    data.splice(i, 1);
    setdefaultService(data);
  };

  const setBankName = (id) => {
    let name;
    organizationList &&
      organizationList.map((element) => {
        if (element.id === id) {
          name = element.name;
        }
      });
    return name;
  };

  const setServiceName = (id) => {
    let name;
    serviceList &&
      serviceList.map((element) => {
        if (element.id === id) {
          name = element.service_name;
        }
      });
    return name;
  };

  console.log("push value:", defaultService);

  useEffect(() => {
    getOrganization();
    getService();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <h4 className="text-center">Assign Default Service for Moneybag</h4>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(addDefaultService)}>
                  <CRow className="mb-3">
                    <CCol sm={5}>
                      <CFormSelect
                        {...register("service_name", {
                          required: "Please Select Service",
                        })}
                        aria-label="Default select example"
                      >
                        <option>Select Service</option>
                        {serviceList &&
                          serviceList.map((servie, index) => (
                            <option value={servie.id} key={index}>
                              {servie.service_name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.service_name?.message}
                      </span>
                    </CCol>
                    <CCol sm={5}>
                      <CFormSelect
                        {...register("bank_name", {
                          required: "Please Select Bank",
                        })}
                        aria-label="Default select example"
                      >
                        <option>Select Bank</option>
                        {organizationList &&
                          organizationList.map((organization, index) => (
                            <option value={organization.id} key={index}>
                              {organization.name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.bank_name?.message}
                      </span>
                    </CCol>
                    <CCol sm={1}>
                      <CButton
                        className="btn-sm"
                        disabled={!isDirty}
                        type="submit"
                      >
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                {defaultService &&
                  defaultService.map((defaultservice, index) => {
                    return (
                      <div>
                        <CRow className="mb-3">
                          <CCol sm={5}>
                            <p>{setServiceName(defaultservice.service_no)}</p>
                          </CCol>
                          <CCol sm={5}>
                            <p>{setBankName(defaultservice.bank_no)}</p>
                          </CCol>
                          <CCol sm={2}>
                            <CButton
                              className="btn-sm"
                              color="danger"
                              onClick={(e) => {
                                removeDefaultService(index);
                              }}
                            >
                              <CIcon icon={cilMinus} />
                            </CButton>
                          </CCol>
                        </CRow>
                      </div>
                    );
                  })}

                <div className="text-center ">
                  <Link to="/dashboard">
                    <CButton color="danger" className="mx-3">
                      Cancle
                    </CButton>
                  </Link>
                  <CButton onClick={saveDefaultServices} color="success">
                    Save
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default DefaultService;
