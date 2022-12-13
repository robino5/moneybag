import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import swal from "sweetalert";
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
  const location = useLocation();
  const [organizationList, setOrganizationList] = useState();
  const [bankbranchList, setBankBranchList] = useState();
  const [lookupList, setLooupList] = useState();
  const [services, setService] = useState();
  const [serviceList, setServiceList] = useState();
  const [service, setServices] = useState();
  const [bankId, setBankId] = useState();

  const multipleInsert = (e) => {
    setServices(Array.isArray(e) ? e.map((value) => value.value) : []);
  };

  const defaultService = (e) => {
    let data = [];
    e &&
      e.forEach((element) => {
        if (location.state.service_name.match(element.id)) {
          data.push(element.id);
        }
      });
    return data;
  };

  console.log("d", defaultService(serviceList));

  const updateSattelmentAccount = (e) => {
    const sattelementAccount = {
      org_no:
        e.select_fintech === ""
          ? location.state.org_no
          : parseInt(e.select_fintech),
      bank_id:
        e.select_bank_name === ""
          ? location.state.bank_id
          : parseInt(e.select_bank_name),
      branch_id:
        e.select_branch_name === ""
          ? location.state.branch_id
          : parseInt(e.select_branch_name),
      service_name: "test",
      account_name: e.account_name,
      account_id: e.account_id,
      note: e.note,
      is_active: e.status ? 1 : 0,
    };
    console.log(sattelementAccount);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}account-settlements/update/${location.state.id}`,
        sattelementAccount,
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
        navigate("/settelment");
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
        if(error.response.status==401){
          navigate("/login");
        }
      });
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
        if(error.response.status==401){
          navigate("/login");
        }
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
        if(error.response.status==401){
          navigate("/login");
        }
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
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };

  const getOrganizationOption = (e) => {
    let data = [];
    e &&
      e.map((element) => {
        if (element.status === 1) {
          data.push({ id: element.id, name: element.name });
        }
      });
    return data;
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
    let data = [];
    e &&
      e.map((element) => {
        if (element.organization_no == id && element.is_active === 1) {
          lookupList &&
            lookupList.map((lookup) => {
              if (lookup.id === element.service_type) {
                data.push({ value: element.id, label: lookup.name });
              }
            });
        }
      });
    return data;
  };

  const getBranchOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (
          element.bank_flag === 0 &&
          element.is_active === 1 &&
          element.root_bank == bankId
        ) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  useEffect(() => {
    getOrganization();
    getBankBranchList();
    getService();
    getLookupList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h6 className="text-center">Update Settlement Bnak</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateSattelmentAccount)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Fintech Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_fintech")}
                        onChange={(e) => {
                          setService(
                            getServiceOption(serviceList, e.target.value)
                          );
                        }}
                      >
                        <option>select Bank</option>
                        {getOrganizationOption(organizationList) &&
                          getOrganizationOption(organizationList).map(
                            (org, index) => (
                              <option
                                value={org.id}
                                selected={
                                  org.id === location.state.org_no
                                    ? "selected"
                                    : ""
                                }
                                key={index}
                              >
                                {org.name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Settelment Bank
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_bank_name")}
                        onChange={(e) => {
                          setBankId(e.target.value);
                        }}
                      >
                        {getBankOption(bankbranchList) &&
                          getBankOption(bankbranchList).map((bank, index) => (
                            <option
                              value={bank.id}
                              selected={
                                bank.id === location.state.bank_id
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
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
                        {...register("select_branch_name")}
                      >
                        {getBranchOption(bankbranchList) &&
                          getBranchOption(bankbranchList).map(
                            (branch, index) => (
                              <option
                                value={branch.id}
                                selected={
                                  branch.id === location.state.branch_id
                                    ? "selected"
                                    : ""
                                }
                                key={index}
                              >
                                {branch.branch_name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  {/* <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Service Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_service_name")}
                      >
                        {services &&
                          services.map((service, index) => (
                            <option value={service.id} key={index}>
                              {service.service_name}
                            </option>
                          ))}
                      </CFormSelect>
                      <Select
                        options={services}
                        isMulti
                        name="select_service_name"
                        onChange={multipleInsert}
                      />
                    </CCol>
                  </CRow> */}
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("account_name")}
                        defaultValue={location.state.account_name}
                        placeholder="Account Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Account Number
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("account_id", {
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Please Provide Number",
                          },
                        })}
                        defaultValue={location.state.account_id}
                        placeholder="Account Number"
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
                        defaultValue={location.state.note}
                        placeholder="Note"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        label="Active"
                        defaultChecked={
                          location.state.is_active == 1 ? true : false
                        }
                        {...register("status")}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/settelment">
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

export default SettelmentAdd;
