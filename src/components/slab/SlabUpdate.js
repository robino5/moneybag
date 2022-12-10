import React, { useState, useEffect } from "react";
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

const SlabUpdate = (props) => {
  console.log(props.data);
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [slabService, setSlabService] = useState();

  const getSlabServiceList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}merchant-slabs/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), slabServicedata(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const slabServicedata = (e) => {
    let data;
    e?.map((slab) => {
      if (slab.mrservice_no == props.data) {
        data = slab;
        console.log(slab);
      }
    });
    setSlabService(data);
  };

  console.log("slabs", slabService);

  const updateSlabCharge = (e) => {
    console.log("element", e);

    const data = {
      mrservice_no: props.data,
      from_slab_amount: parseInt(
        e.from_slab_amount == ""
          ? slabService?.from_slab_amount
          : e.from_slab_amount
      ),
      to_slab_amount: parseInt(
        e.to_slab_amount == "" ? slabService?.to_slab_amount : e.to_slab_amount
      ),
      charge_ammount: parseInt(
        e.charge_ammount == "" ? slabService?.charge_ammount : e.charge_ammount
      ),
    };
    console.log(data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}merchant-slabs/update/${slabService?.id}`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        console.log("servive", response);
        swal({
          position: "top-end",
          text: "Slab charge Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
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

  useEffect(() => {
    const getAllData = async () => {
      await getSlabServiceList();
    };
    getAllData();
  }, []);

  return (
    <div className=" d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateSlabCharge)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      From Slab Amount
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        name="username"
                        defaultValue={slabService?.from_slab_amount}
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
                        defaultValue={slabService?.to_slab_amount}
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
                        defaultValue={slabService?.charge_ammount}
                        {...register("charge_ammount")}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
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

export default SlabUpdate;
