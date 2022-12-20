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
  CModal,
} from "@coreui/react";

const MerchantServiceUpdateModal = (props) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [bankList, setBankList] = useState();
  const [lookupList, setLooupList] = useState();

  const getBankList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankList(responce.data);
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

  const getBankName = (e) => {
    let bank_name;
    bankList &&
      bankList.map((element) => {
        if (element.id === e) {
          bank_name = element.branch_name;
        }
      });
    return bank_name;
  };

  const getBankOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.bank_flag === 1 && element.is_active) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  const getServiceOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 6001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const updateMerchantService = (e) => {
    console.log(e);
    const mercharDate = {
      merchant_no: props.data.merchant_no,
      bank_no: props.data.bank_no,
      service_no: props.data.service_no,
      service_charge_type:
        e.service_charge_type == ""
          ? props.data.service_charge_type
          : e.service_charge_type,
      charge_ammount:
        e.percentage == "" ? props.data.charge_ammount : e.percentage,
      is_active: e.status ? 1 : 0,
    };

    console.log("dd", mercharDate);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}merchant-services/update/${props.data.id}`,
        mercharDate,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        reset();
        handleCloseModal();
        swal({
          text: "Updated Successfull",
          icon: "success",
          position: "top-end",
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
          text: error.response.data.detail,
          icon: "error",
          position: "top-end",
          button: false,
          timer: 1500,
        });
      });
  };

  const handleCloseModal = () => {
    navigate("/merchant-service-id", {
      state: props.data.merchant_no,
    });
    // window.location.reload();
  };

  useEffect(() => {
    const getAllData = async () => {
      await getBankList();
      await getLookupList();
    };
    getAllData();
  }, []);

  console.log("Props:", props.data);
  return (
    <div className=" d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <h6 className="text-center">Update Merchant Service</h6>
            <br></br>
            <CForm onSubmit={handleSubmit(updateMerchantService)}>
              <CRow className="mb-3">
                <CFormLabel className="col-sm-3 col-form-label">
                  Bank name
                </CFormLabel>
                <CCol sm={9}>
                  <CFormSelect
                    aria-label="Default select example"
                    disabled={true}
                  >
                    <option>select Bank</option>
                    {getBankOption(bankList) &&
                      getBankOption(bankList).map((bank, index) => (
                        <option
                          value={bank.id}
                          selected={
                            bank.id == props.data.bank_no ? "selected" : ""
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
                  Services
                </CFormLabel>
                <CCol sm={9}>
                  <CFormSelect
                    aria-label="Default select example"
                    disabled={true}
                  >
                    <option>select Service</option>
                    {lookupList &&
                      getServiceOption(lookupList).map((service, index) => (
                        <option
                          value={service.id}
                          selected={
                            service.id == props.data.service_no
                              ? "selected"
                              : ""
                          }
                          key={index}
                        >
                          {service.name}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel className="col-sm-3 col-form-label">
                  Rate
                </CFormLabel>
                <CCol sm={9}>
                  <CFormInput
                    type="text"
                    defaultValue={props.data.charge_ammount}
                    {...register("percentage")}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel className="col-sm-3 col-form-label">
                  Rate Type
                </CFormLabel>
                <CCol sm={9}>
                  <CFormSelect
                    aria-label="Default select example"
                    {...register("service_charge_type")}
                  >
                    <option>Select Rate type</option>
                    <option
                      selected={props.data.service_charge_type == "F"}
                      value={"F"}
                    >
                      Fixed
                    </option>
                    <option
                      selected={props.data.service_charge_type == "P"}
                      value={"P"}
                    >
                      Percentage{" "}
                    </option>
                    {/* <option value={"S"}>Slab </option> */}
                    {/* <option value={"C"}>Combination </option> */}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel className="col-sm-3 col-form-label">
                  Status
                </CFormLabel>
                <CCol sm={9}>
                  <CFormCheck
                    label="Active"
                    {...register("status")}
                    defaultChecked={props.data.is_active == 1 ? true : false}
                  />
                </CCol>
              </CRow>
              <div className="text-center ">
                <CButton type="submit" color="info">
                  Update
                </CButton>
                <CButton
                  color="danger"
                  onClick={handleCloseModal}
                  className="mx-2"
                >
                  Cancle
                </CButton>
              </div>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MerchantServiceUpdateModal;
