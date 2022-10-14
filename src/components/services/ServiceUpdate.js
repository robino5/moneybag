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

const ServiceAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [bankbranchList, setBankBranchList] = useState();
  const [catserviceList, setCatServiceList] = useState();

  const updateService = (e) => {
    const serviceDate = {
      service_name: e.service_name,
      bank_id:
        e.select_bank_name === ""
          ? location.state.bank_id
          : parseInt(e.select_bank_name),
      category_service_id:
        e.catagory_service === ""
          ? location.state.category_service_id
          : parseInt(e.catagory_service),
      end_point_url: e.call_back_url,
      call_back_url: e.call_back_url,
      note: e.note,
      is_active: e.status ? 1 : 0,
    };
    console.log(serviceDate);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}services/update/${location.state.id}`,
        serviceDate,
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
        navigate("/service");
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

  const getCatService = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}category-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setCatServiceList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getBankBranchList();
    getCatService();
  }, []);

  const getBankOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.bank_flag === 1) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  const getOption = (e) => {
    let options = [];
    e.forEach((element) => {
      if (element.is_group === 1) {
        options.push({ id: element.id, name: element.name });
      }
    });
    return options;
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <h6 className="text-center">Update Service</h6>
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateService)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Service Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.service_name}
                        {...register("service_name")}
                        placeholder="Service Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Bank name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        {...register("select_bank_name")}
                        aria-label="Default select example"
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
                      Service Category
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        type="number"
                        {...register("catagory_service")}
                      >
                        {catserviceList &&
                          getOption(catserviceList).map((catService, index) => (
                            <option
                              value={catService.id}
                              selected={
                                catService.id ===
                                location.state.category_service_id
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {catService.name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      End Point Url
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.end_point_url}
                        {...register("end_point_url")}
                        placeholder="End Point Url"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Call Back Url
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.call_back_url}
                        {...register("call_back_url")}
                        placeholder="Call Back Url"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Note
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.note}
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
                    <Link to="/service">
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

export default ServiceAdd;
