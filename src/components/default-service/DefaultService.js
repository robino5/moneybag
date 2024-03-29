import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilPlus, cilPen } from "@coreui/icons";
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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from "@coreui/react";
import { findAllByText } from "@testing-library/react";

const DefaultService = () => {
  const {
    register,
    getFieldState,
    formState: { errors, isDirty, dirtyFields },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [defaultServiceList, setDefaultServiceList] = useState();
  const [organizationList, setOrganizationList] = useState();
  // const [serviceList, setServiceList] = useState();
  const [lookupList, setLooupList] = useState();
  const [defaultService, setdefaultService] = useState();
  const [fintechId, setFintechId] = useState();
  const [status, setStatus] = useState();
  console.log(defaultServiceList);

  const isCheck = true;

  const getDefaultServiceList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}default-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setDefaultServiceList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
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

  console.log("dirty", dirtyFields);

  const saveDefaultService = (e) => {
    const data = [];
    data.push({
      service_no: parseInt(e.service_name),
      bank_no: parseInt(e.bank_name),
      is_active: e.status ? 1 : 0,
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}default-services/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        getDefaultServiceList();
        reset();
        swal({
          position: "top-end",
          text: "Default Service Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
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

  const setDefaultcheck = (e) => {
    if (e === 1) {
      return true;
    } else if (e === 0) {
      return false;
    }
  };

  // setDefaultcheck(defaultService && defaultService.is_active);
  // console.log(isCheck);

  const updateDefaultService = (e) => {
    console.log(e);
  };

  const getServiceOption = (e) => {
    let Date = [];
    e?.forEach((element) => {
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

  const setServicesOptions = (services) => {
    const currentSelected = [];

    defaultServiceList?.map((services) => {
      currentSelected.push(services.service_no);
    });

    let data = [];
    for (let i = 0; i < services.length; i++) {
      console.log("CCC: ", currentSelected);
      if (!currentSelected.includes(services[i].id)) {
        data.push(services[i]);
      }
    }
    return data;
  };

  const updateDefaulService = (e) => {
    let active_status = status ? 1 : 0;
    let data = {
      service_no: e.service_no,
      bank_no: fintechId ? parseInt(fintechId) : e.bank_no,
      is_active: status != undefined ? active_status : e.is_active,
    };
    console.log("data", data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}default-services/update/${e.id}`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Default Service Update Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        setFintechId();
        setStatus();
        getDefaultServiceList();
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

  console.log("push value:", defaultService);

  useEffect(() => {
    getDefaultServiceList();
    getOrganization();
    getLookupList();
  }, []);

  const comumn = [
    {
      name: "Service Name",
      sortable: true,
      selector: (row) => setServiceName(row.service_no),
      minWidth: "150px",
    },
    {
      name: "Bank Name",
      selector: (row) => setBankName(row.bank_no),
      minWidth: "200px",
    },
    {
      name: "Status",
      selector: (row) => (row.is_active == 1 ? "Active" : "Inactive"),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              setdefaultService(row);
            }}
          >
            Update
          </CButton>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <h4 className="text-center">Assign Default Service for Moneybag</h4>
            <CCard className="p-4">
              <CCardBody>
                <CForm
                  hidden={defaultService != null ? true : false}
                  onSubmit={handleSubmit(saveDefaultService)}
                >
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <CFormSelect
                        {...register("service_name", {
                          required: "Please Select Service",
                        })}
                        aria-label="Default select example"
                      >
                        <option value={""}>Select Service</option>
                        {lookupList &&
                          setServicesOptions(getServiceOption(lookupList)).map(
                            (servie, index) => (
                              <option value={servie.id} key={index}>
                                {servie.name}
                              </option>
                            )
                          )}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.service_name?.message}
                      </span>
                    </CCol>
                    <CCol sm={5}>
                      <CFormSelect
                        {...register("bank_name", {
                          required: "Please Select Fintech",
                        })}
                        aria-label="Default select example"
                      >
                        <option value={""}>Select Fintech</option>
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
                    <CCol sm={2}>
                      <CFormCheck label="Active" {...register("status")} />
                    </CCol>
                    <CCol sm={1}>
                      <CButton
                        className="btn-sm"
                        disabled={!isDirty}
                        type="submit"
                        color="success"
                      >
                        Save
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                {/* <CForm
                  hidden={defaultService == null ? true : false}
                  onSubmit={handleSubmit(updateDefaultService)}
                >
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <CFormSelect
                        {...register("service_no")}
                        aria-label="Default select example"
                      >
                        {lookupList &&
                          getServiceOption(lookupList).map((servie, index) => (
                            <option
                              value={servie.id}
                              selected={
                                defaultService &&
                                defaultService.service_no === servie.id
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {servie.name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                    <CCol sm={5}>
                      <CFormSelect
                        {...register("bank_no")}
                        aria-label="Default select example"
                      >
                        {organizationList &&
                          organizationList.map((organization, index) => (
                            <option
                              value={organization.id}
                              selected={
                                defaultService &&
                                defaultService.bank_no === organization.id
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
                    <CCol sm={2}>
                      <CFormCheck
                        label="Active"
                        defaultChecked={setDefaultcheck(
                          defaultService?.is_active
                        )}
                        {...register("active")}
                      />
                    </CCol>
                    <CCol sm={1}>
                      <CButton color="info" className="btn-sm" type="submit">
                        <CIcon icon={cilPen} />
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm> */}
                {/* <DataTable
                  title="Default Service List"
                  columns={comumn}
                  data={defaultServiceList}
                  pagination
                  expandableCol
                /> */}
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Fintech</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {defaultServiceList?.map((service, index) => (
                      <CTableRow>
                        <CTableDataCell>
                          {setServiceName(service.service_no)}
                        </CTableDataCell>
                        <CTableDataCell>
                          {" "}
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) => {
                              setFintechId(e.target.value);
                            }}
                          >
                            {organizationList &&
                              organizationList.map((organization, index) => (
                                <option
                                  value={organization.id}
                                  selected={
                                    service.bank_no == organization.id
                                      ? "selected"
                                      : ""
                                  }
                                  key={index}
                                >
                                  {organization.name}
                                </option>
                              ))}
                          </CFormSelect>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CCol sm={2}>
                            <CFormCheck
                              label="Active"
                              defaultChecked={
                                service.is_active == 1 ? true : false
                              }
                              onChange={(e) => {
                                setStatus(e.target.checked);
                              }}
                            />
                          </CCol>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            className="btn-sm"
                            color="info"
                            onClick={() => {
                              updateDefaulService(service);
                            }}
                          >
                            Update
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>

                {/* {defaultService &&
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
                  <Link to="/default-service">
                    <CButton color="danger" className="mx-3">
                      Cancle
                    </CButton>
                  </Link>
                  <CButton onClick={saveDefaultServices} color="success">
                    Save
                  </CButton>
                </div> */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default DefaultService;
