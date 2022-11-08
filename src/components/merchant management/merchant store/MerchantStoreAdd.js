import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
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
    control,
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const { fields } = useFieldArray({
    control,
    name: "test",
  });
  const navigate = useNavigate();
  const [merchantList, setmerchantList] = useState();
  const [marchantDetail, setMarchentDetail] = useState();
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [bankList, setBankList] = useState();
  const [lookupList, setLookupList] = useState();
  const [marchantId, setMerchantId] = useState();
  const [merchantServiceList, SetMerchantServiceList] = useState();

  const getMerchantId = (e) => {
    setMerchantId(e.target.value);
  };
  console.log("service", merchantServiceList);

  const getMertchant = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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

  const getMertchantDetailList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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

  const getMertchantServiceList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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
        console.log(responce.data), setLookupList(responce.data);
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

  const getServiceName = (e) => {
    let service_name;
    lookupList &&
      lookupList.map((element) => {
        if (element.id === e) {
          service_name = element.name;
        }
      });
    return service_name;
  };

  const selectMerchantService = (e) => {
    let data = [];
    e &&
      e.map((element, index) => {
        if (element.merchant_no == marchantId) {
          data.push({
            id: element.id,
            bank_no: element.bank_no,
            service_no: element.service_no,
            charge_ammount: element.charge_ammount,
          });
        }
      });
    return data;
  };

  const saveMerchantStore = (e) => {
    console.log("element:", e);
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
        saveMerchantStoreDetail(e.test, response.data.id);

        swal({
          position: "top-end",
          text: "Organization Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        // navigate("/merchant-store");
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

  const saveMerchantStoreDetail = (detail, store_id) => {
    let data = [];
    detail &&
      detail.map((element, index) => {
        if (element.isChack) {
          data.push({
            store_no: store_id,
            mrservice_no: parseInt(element.id),
            override_charge: parseFloat(element.value),
          });
        }
      });
    console.log("date:", data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}merchant-store-details/`, data, {
        headers,
      })
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

  useEffect(() => {
    const getAllData = async () => {
      await getMertchant();
      await getMertchantDetailList();
      await getMertchantServiceList();
      await getBankList();
      await getLookupList();
    };
    getAllData();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <h6 className="text-center">Add Merchant Store</h6>
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
                  <hr></hr>
                  {selectMerchantService(merchantServiceList) &&
                    selectMerchantService(merchantServiceList).map(
                      (element, index) => {
                        return (
                          <CRow className="mb-2">
                            <CCol sm={1}>
                              {" "}
                              <CFormCheck
                                {...register(`test.${index}.isChack`)}
                              />
                            </CCol>
                            <CCol sm={3}>
                              <p>{getBankName(element.bank_no)}</p>
                              <CFormInput
                                type="text"
                                hidden
                                defaultValue={element.id}
                                {...register(`test.${index}.id`)}
                                placeholder="Override Charges"
                              />
                            </CCol>
                            <CCol sm={2}>
                              {getServiceName(element.service_no)}
                            </CCol>
                            <CCol sm={3}>{element.charge_ammount}</CCol>
                            <CCol sm={3}>
                              <CFormInput
                                type="text"
                                {...register(`test.${index}.value`)}
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
