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
import { element } from "prop-types";

const MerchantStoreAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [merchantList, setmerchantList] = useState();
  const [marchantDetail, setMarchentDetail] = useState();
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [bankList, setBankList] = useState();
  const [marchantId, setMerchantId] = useState();
  const [merchantServiceList, SetMerchantServiceList] = useState();

  const getMerchantId = (e) => {
    setMerchantId(e.target.value);
  };
  console.log("service", merchantServiceList);

  const getMertchant = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}marchants/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setmerchantList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getMertchantDetailList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}marchant-details/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMarchentDetailsList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getMertchantServiceList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}merchant-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), SetMerchantServiceList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getBankList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getMertchantDetail = (e, id) => {
    let date = [];
    e &&
      e.map((element) => {
        console.log(element);
        if (element.merchant_no === parseInt(id)) {
          date.push({
            id: element.id,
            bank_no: element.bank_no,
            branch_no: element.branch_no,
            merchant_no: element.merchant_no,
          });
        }
      });
    return date;
  };

  const getMerchantName = (e) => {
    let merchatname;
    merchantList &&
      merchantList.map((element) => {
        if (element.id === e) {
          merchatname = element.first_name + " " + element.last_name;
        }
      });
    return merchatname;
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

  const selectMerchantService = (e) => {
    let data = [];
    e &&
      e.map((element, index) => {
        if (element.merchant_no == marchantId) {
          data.push({
            bank_no: element.element,
            service_no: element.service_no,
            charge_ammount: element.charge_ammount,
          });
        }
      });
    return data;
  };

  const saveMerchantStore = (e) => {
    const merchantStoreData = {
      merchant_no: parseInt(e.merchant_name),
      store_name: e.store_name,
      settlement_bank_no: parseInt(e.merchant_detail_name),
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}merchant-stores/`,
        merchantStoreData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Organization Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/merchant-store");
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

  console.log(selectMerchantService(merchantServiceList));

  useEffect(() => {
    getMertchant();
    getMertchantDetailList();
    getMertchantServiceList();
    getBankList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(saveMerchantStore)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Merchant Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("merchant_name", {
                          required: "Please select Merchant Name",
                        })}
                        onChange={(e) => {
                          setMarchentDetail(
                            getMertchantDetail(
                              marchantDetailList,
                              e.target.value
                            )
                          );
                          getMerchantId(e);
                        }}
                      >
                        <option>select Merchant Name</option>
                        {merchantList &&
                          merchantList.map((merchant, index) => (
                            <option value={merchant.id} key={index}>
                              {merchant.first_name + " " + merchant.last_name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Store Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("store_name", {
                          required: "Please select Merchant Name",
                        })}
                        placeholder="Store Name"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Settlement Account Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("merchant_detail_name", {
                          required: "Please select Merchant detail",
                        })}
                      >
                        <option>select Merchant Name</option>
                        {marchantDetail &&
                          marchantDetail.map((merchantDetail, index) => (
                            <option value={merchantDetail.id} key={index}>
                              {getMerchantName(merchantDetail.merchant_no) +
                                "(" +
                                getBankName(merchantDetail.bank_no) +
                                "-" +
                                getBankName(merchantDetail.branch_no) +
                                ")"}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={1}></CCol>
                    <CCol sm={3}>Bank Name</CCol>
                    <CCol sm={2}>Service Name</CCol>
                    <CCol sm={3}> Default Charges</CCol>
                    <CCol sm={3}>Override Charges</CCol>
                  </CRow>
                  {selectMerchantService(merchantServiceList) &&
                    selectMerchantService(merchantServiceList).map(
                      (element, index) => {
                        return (
                          <CRow>
                            <CCol sm={1}>
                              {" "}
                              <CFormCheck
                                label="Active"
                                {...register("status")}
                              />
                            </CCol>
                            <CCol sm={3}>
                              <p>{element.bank_no}</p>
                            </CCol>
                            <CCol sm={2}>{element.service_no}</CCol>
                            <CCol sm={3}>{element.charge_ammount}</CCol>
                            <CCol sm={3}>
                              <CFormInput
                                type="text"
                                {...register("overwrite_charge")}
                                placeholder="Override Charges"
                              />
                            </CCol>
                          </CRow>
                        );
                      }
                    )}

                  <div className="text-center ">
                    <Link to="/merchant-store">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
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

export default MerchantStoreAdd;
