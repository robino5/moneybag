import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";

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

const DefaultServiceUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [organizationList, setOrganizationList] = useState();
  // const [serviceList, setServiceList] = useState();
  const [lookupList, setLooupList] = useState();

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

  //   const saveDefaultServices = () => {
  //     console.log("save", defaultService);
  //     const headers = {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     };
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}default-services/`,
  //         defaultService,
  //         {
  //           headers,
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         swal({
  //           position: "top-end",
  //           text: "Store Created Successfull",
  //           icon: "success",
  //           button: false,
  //           timer: 1500,
  //         });
  //         setdefaultService([]);
  //       })
  //       .catch((error) => {
  //         console.error("There was an error!", error);
  //         swal({
  //           position: "top-end",
  //           text: error.response.data.detail,
  //           icon: "error",
  //           button: false,
  //           timer: 1500,
  //         });
  //       });
  //   };

  const getServiceOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 6001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
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
    lookupList &&
      lookupList.map((element) => {
        if (element.id === id) {
          name = element.name;
        }
      });
    return name;
  };

  const updateDefaultService = (e) => {
    const defaultService = {
      service_no:
        e.service_name === ""
          ? location.state.service_no
          : parseInt(e.service_name),
      bank_no:
        e.bank_name === "" ? location.state.bank_no : parseInt(e.bank_name),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}default-services/update/${location.state.id}`,
        defaultService,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          text: "Updated Successfull",
          icon: "success",
          position: "top-end",
          button: false,
          timer: 1500,
        });
        navigate("/default-service");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal({
          text: error.response.data.detail,
          icon: "error",
          position: "top-end",
          button: false,
          timer: 1500,
        });
      });
  };

  useEffect(() => {
    getOrganization();
    getLookupList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <h4 className="text-center">Update Default Service for Moneybag</h4>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateDefaultService)}>
                  <CRow className="mb-3">
                    <CCol sm={5}>
                      <CFormSelect
                        {...register("service_name")}
                        aria-label="Default select example"
                      >
                        {lookupList &&
                          getServiceOption(lookupList).map((servie, index) => (
                            <option
                              value={servie.id}
                              selected={
                                servie.id === location.state.service_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {servie.name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.service_name?.message}
                      </span>
                    </CCol>
                    <CCol sm={5}>
                      <CFormSelect
                        {...register("bank_name")}
                        aria-label="Default select example"
                      >
                        {organizationList &&
                          organizationList.map((organization, index) => (
                            <option
                              value={organization.id}
                              selected={
                                organization.id === location.state.bank_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {organization.name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/default-service">
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

export default DefaultServiceUpdate;
