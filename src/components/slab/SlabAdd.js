import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

const SlabAdd = (props) => {
  console.log(props.data);
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();

  const SaveSlabCharge = (e) => {
    console.log(e);
    let data = [];

    data.push({
      mrservice_no: props.data,
      from_slab_amount: parseInt(e.from_slab_amount),
      to_slab_amount: parseInt(e.to_slab_amount),
      charge_ammount: parseInt(e.charge_ammount),
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}merchant-slabs/`, data, {
        headers,
      })
      .then((response) => {
        console.log("servive", response);
        swal({
          position: "top-end",
          text: "Slab charge Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/add-merchant-service");
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

  return (
    <div className=" d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(SaveSlabCharge)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      From Slab Amount
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="username"
                        {...register("from_slab_amount")}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      To Slab Amount
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="username"
                        {...register("to_slab_amount")}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Charge Amount
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="username"
                        {...register("charge_ammount")}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <CButton disabled={!isDirty} type="submit" color="success">
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

export default SlabAdd;
