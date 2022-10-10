import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Select from "react-select";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CFormCheck,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
  CButton,
} from "@coreui/react";
import { element } from "prop-types";

const SettelmentAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [bankbranchList, setBankBranchList] = useState();
  const [services, setService] = useState();
  const [serviceList, setServiceList] = useState();
  const [service, setServices] = useState();
  console.log(service);

  const saveSattelmentAccount = (e) => {
    const sattelementAccount = {
      bank_id: parseInt(e.select_bank_name),
      branch_id: parseInt(e.select_branch_name),
      service_name: JSON.stringify(e.select_service_name),
      account_name: e.account_name,
      account_id: e.account_id,
      note: e.note,
      is_active: e.status ? 1 : 0,
    };
    console.log(sattelementAccount);
    // const headers = {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // };
    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_URL}account-settlements/`,
    //     sattelementAccount,
    //     {
    //       headers,
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     swal({
    //       position: "top-end",
    //       text: "Store Created Successfull",
    //       icon: "success",
    //       button: false,
    //       timer: 1500,
    //     });
    //     navigate("/settelment");
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
  const getBankBranchList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankBranchList(responce.data);
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

  const getBankOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.bank_flag === 1 && element.is_active === 1) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  const getServiceOption = (e, id) => {
    let date = [];
    e &&
      e.map((element) => {
        console.log("element", id);
        if (element.bank_id === parseInt(id)) {
          date.push({ value: element.id, label: element.service_name });
        }
      });
    return date;
  };

  const getBranchOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (
          element.bank_flag === 0 &&
          element.is_active === 1 &&
          element.root_bank === 0
        ) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  useEffect(() => {
    getBankBranchList();
    getService();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveSattelmentAccount)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Bank Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_bank_name", {
                          required: "Please Select Bank",
                        })}
                        onChange={(e) => {
                          setService(
                            getServiceOption(serviceList, e.target.value)
                          );
                        }}
                      >
                        <option>select Bank</option>
                        {getBankOption(bankbranchList) &&
                          getBankOption(bankbranchList).map((bank, index) => (
                            <option value={bank.id} key={index}>
                              {bank.branch_name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Branch Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_branch_name", {
                          required: "Please Select Branch",
                        })}
                      >
                        <option>select Branch</option>
                        {getBranchOption(bankbranchList) &&
                          getBranchOption(bankbranchList).map((bank, index) => (
                            <option value={bank.id} key={index}>
                              {bank.branch_name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Service Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        multiple
                        {...register("select_service_name", {
                          required: "Please Select service",
                        })}
                      >
                        {services &&
                          services.map((service, index) => (
                            <option value={service.value} key={index}>
                              {service.label}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <Select
                        options={services}
                        isMulti
                        name="select_service_name"
                        {...register("select_service_name", {
                          required: "Please Select service",
                        })}
                      /> */}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("account_name", {
                          required: "Please provide Account Name",
                        })}
                        placeholder="Account Name"
                      />
                      <span className="text-danger">
                        {errors.account_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account id
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("account_id", {
                          required: "Please provide Account ID",
                        })}
                        placeholder="Account id"
                      />
                      <span className="text-danger">
                        {errors.account_id?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Note
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("note")}
                        placeholder="Note"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck label="Active" {...register("status")} />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/settelment">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" disabled={!isDirty} color="success">
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

export default SettelmentAdd;
