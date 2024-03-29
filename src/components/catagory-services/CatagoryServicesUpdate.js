import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import {
  CCard,
  CCardBody,
  CFormTextarea,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
  CButton,
  CFormCheck,
} from "@coreui/react";

const CatagoryServicesUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [catserviceList, setCatServiceList] = useState();

  useEffect(() => {
    getCatService();
  }, []);

  console.log(location.state);

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

  const updateCatService = (e) => {
    const catServiceData = {
      service_no: e.cat_service_id,
      name: e.cat_service_name,
      short_name: e.cat_short_name,
      remarks: e.cat_remarks,
      is_group: e.cat_group ? 1 : 0,
      is_parent: e.parent_category===''?location.state.is_parent:parseInt(e.parent_category),
      status: e.status ? 1 : 0,
    };
    console.log("test", catServiceData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}category-services/service/${location.state.id}`,
        catServiceData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Category Service Updated Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/category-services");
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
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateCatService)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Category Service ID
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.service_no}
                        {...register("cat_service_id")}
                        placeholder="Category Service ID"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Category Service Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.name}
                        {...register("cat_service_name", {
                          required: "Please provide Category Service Name",
                        })}
                        placeholder="Category Service Name"
                      />
                      <span className="text-danger">
                        {errors.cat_service_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Category Short name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        defaultValue={location.state.short_name}
                        {...register("cat_short_name", {
                          required: "Please provide Category Short Name",
                        })}
                        placeholder=" Category Short name"
                      />
                      <span className="text-danger">
                        {errors.cat_short_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Remarks
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormTextarea
                        defaultValue={location.state.remarks}
                        {...register("cat_remarks")}
                        placeholder="Remarks"
                      ></CFormTextarea>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Category
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        se
                        aria-label="Default select example"
                        type="number"
                        {...register("parent_category")}
                      >
                        {catserviceList &&
                          getOption(catserviceList).map((catService, index) => (
                            <option
                              value={catService.id}
                              selected={
                                catService.id === location.state.is_parent
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
                  <CRow className="">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Group Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        label="Is Group?"
                        defaultChecked={
                          location.state.is_group == 1 ? true : false
                        }
                        {...register("cat_group")}
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
                          location.state.status == 1 ? true : false
                        }
                        {...register("status")}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/category-services">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" color="info">
                      update
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

export default CatagoryServicesUpdate;
