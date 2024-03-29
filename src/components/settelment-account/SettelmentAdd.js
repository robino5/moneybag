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

const SettelmentAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [organizationList, setOrganizationList] = useState();
  const [bankbranchList, setBankBranchList] = useState();
  const [services, setService] = useState();
  const [lookupList, setLooupList] = useState();
  const [serviceList, setServiceList] = useState();
  const [service, setServices] = useState();
  const [bankId, setBankId] = useState();
  const [branchId, setBranchId] = useState();

  console.log("bank", bankId);

  const multipleInsert = (e) => {
    setServices(Array.isArray(e) ? e.map((value) => value.value) : []);
  };

  console.log(services);

  const saveSattelmentAccount = (e) => {
    const sattelementAccount = {
      org_no: parseInt(e.select_fintech),
      bank_id: parseInt(e.select_bank_name),
      branch_id: parseInt(e.select_branch_name),
      service_name: "tet",
      swift_code: e.swift_code,
      routing: e.routing_no,
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
        `${process.env.REACT_APP_API_URL}account-settlements/`,
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
        if (error.response.status == 401) {
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
        if (error.response.status == 401) {
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
        if (error.response.status == 401) {
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
        if (error.response.status == 401) {
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

  const getRoutingNumber = (e) => {
    let routing;
    e?.map((branch) => {
      if (branch.id == branchId) {
        routing = branch.routing_no;
      }
    });
    return routing;
  };

  const getSwiftCode = (e) => {
    let swift_code;
    e?.map((branch) => {
      if (branch.id == branchId) {
        swift_code = branch.swift_code;
      }
    });
    return swift_code;
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
              <h6 className="text-center">Add Settlement Bank</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveSattelmentAccount)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Fintech Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_fintech", {
                          required: "Please Select Fintech",
                        })}
                        onChange={(e) => {
                          setService(
                            getServiceOption(serviceList, e.target.value)
                          );
                        }}
                      >
                        <option value={""}>Select Fintech</option>
                        {getOrganizationOption(organizationList) &&
                          getOrganizationOption(organizationList).map(
                            (org, index) => (
                              <option value={org.id} key={index}>
                                {org.name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.select_fintech?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Settelment Bank
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_bank_name", {
                          required: "Please Select Settelment Bank",
                        })}
                        onChange={(e) => {
                          setBankId(e.target.value);
                        }}
                      >
                        <option value={""}>Select Settelment Bank</option>
                        {getBankOption(bankbranchList) &&
                          getBankOption(bankbranchList).map((bank, index) => (
                            <option value={bank.id} key={index}>
                              {bank.branch_name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.select_bank_name?.message}
                      </span>
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
                        onChange={(e) => {
                          setBranchId(e.target.value);
                        }}
                      >
                        <option value={""}>Select Branch</option>
                        {getBranchOption(bankbranchList) &&
                          getBranchOption(bankbranchList).map((bank, index) => (
                            <option value={bank.id} key={index}>
                              {bank.branch_name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.select_branch_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Routing No.
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        disabled="true"
                        value={getRoutingNumber(bankbranchList)}
                        {...register("routing_no")}
                        placeholder="Routing No."
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Swift code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        disabled="true"
                        value={getSwiftCode(bankbranchList)}
                        placeholder="Swift code"
                        {...register("swift_code")}
                      />
                    </CCol>
                  </CRow>
                  {/* <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Service Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("select_service_name", {
                          required: "Please Select service",
                        })}
                      >
                        {services &&
                          services.map((service, index) => (
                            <option value={service.value} key={index}>
                               <CFormCheck  {...register("status")} />
                              {service.label}
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
                      Account Number
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("account_id", {
                          required: "Please provide Account Number",
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Please Provide Number",
                          },
                        })}
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

export default SettelmentAdd;
