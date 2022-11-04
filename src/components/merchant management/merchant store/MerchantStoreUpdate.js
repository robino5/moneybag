import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const MerchantStoreUpdate = () => {
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
  const location = useLocation();
  const [merchantList, setmerchantList] = useState();
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [bankList, setBankList] = useState();
  const [lookupList, setLookupList] = useState();
  const [marchantId, setMerchantId] = useState();
  const [merchantServiceList, SetMerchantServiceList] = useState();
  const [merchantStoreDetailList, SetMerchantStoreDetailList] = useState();

  useEffect(() => {
    const getAllData = async () => {
      await getMertchant();
      await getMertchantDetailList();
      await getMertchantServiceList();
      await getBankList();
      await getLookupList();
      await getMerchantStoreDetail();
    };
    getAllData();
  }, []);
  console.log("service", merchantStoreDetailList);
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

  const getMerchantStoreDetail = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}merchant-store-details/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), SetMerchantStoreDetailList(responce.data);
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

  const selectMerchantService = (merchantService, merchantStoreDetail) => {
    let data = [];
    console.log(location.state.id);
    merchantStoreDetail &&
      merchantStoreDetail.map((merchatStore, index) => {
        if (merchatStore.store_no == location.state.id) {
          merchantService &&
            merchantService.map((merchatservice, index) => {
              if (merchatStore.mrservice_no == merchatservice.id) {
                data.push({
                  id: merchatStore.id,
                  mservice_no: merchatStore.mrservice_no,
                  bank_no: merchatservice.bank_no,
                  service_no: merchatservice.service_no,
                  charge_ammount: merchatservice.charge_ammount,
                  override_charge: merchatStore.override_charge,
                });
              }
            });
        }
      });
    return data;
  };

  const updateMerchantStore = (e) => {
    const merchantStoreData = {
      merchant_no: location.state.merchant_no,
      store_name: location.state.store_name,
      settlement_bank_no:
        e.merchant_detail_name === ""
          ? location.state.settlement_bank_no
          : parseInt(e.merchant_detail_name),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}merchant-stores/update/${location.state.id}`,
        merchantStoreData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        updateMerchantStoreDetail(e.test);
        swal({
          position: "top-end",
          text: "Partner Update Successfull",
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

  const updateMerchantStoreDetail = (detail) => {
    detail &&
      detail.map((element, index) => {
        if (element.isChack) {
          console.log(parseInt(element.id));
          console.log(location.state.id);
          console.log(parseInt(element.service_no));
          console.log(parseFloat(element.value));
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          axios
            .post(
              `${
                process.env.REACT_APP_API_URL
              }merchant-store-details/update/${parseInt(element.id)}`,
              {
                store_no: location.state.id,
                mrservice_no: parseInt(element.service_no),
                override_charge: parseFloat(element.value),
              },
              {
                headers,
              }
            )
            .then((response) => {
              console.log(response);
              updateMerchantStoreDetail(e.test);
              swal({
                position: "top-end",
                text: "Partner Update Successfull",
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
        }
      });
    return navigate("/merchant-store");
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateMerchantStore)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Merchant Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("merchant_name")}
                        disabled="true"
                        // onChange={(e) => {
                        //   setMarchentDetail(
                        //     getMertchantDetail(
                        //       marchantDetailList,
                        //       location.state.merchant_no
                        //     )
                        //   );
                        //   getMerchantId(e);
                        // }}
                      >
                        {merchantList &&
                          merchantList.map((merchant, index) => (
                            <option
                              value={merchant.id}
                              selected={
                                merchant.id === location.state.merchant_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
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
                        {...register("store_name")}
                        disabled="true"
                        defaultValue={location.state.store_name}
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
                        {...register("merchant_detail_name")}
                      >
                        {getMertchantDetail(
                          marchantDetailList,
                          location.state.merchant_no
                        ) &&
                          getMertchantDetail(
                            marchantDetailList,
                            location.state.merchant_no
                          ).map((merchantDetail, index) => (
                            <option
                              value={merchantDetail.id}
                              selected={
                                merchantDetail.id ===
                                location.state.settlement_bank_no
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
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
                  {merchantList &&
                    selectMerchantService(
                      merchantServiceList,
                      merchantStoreDetailList
                    ).map((element, index) => {
                      return (
                        <CRow className="mb-2">
                          <CCol sm={1}>
                            {" "}
                            <CFormCheck
                              {...register(`test.${index}.isChack`)}
                            />
                          </CCol>
                          <CCol sm={3}>
                            <p>
                              {getBankName(element.bank_no)}
                              <CFormInput
                                type="text"
                                hidden
                                defaultValue={element.id}
                                {...register(`test.${index}.id`)}
                              />
                            </p>
                          </CCol>
                          <CCol sm={2}>
                            {getServiceName(element.service_no)}
                            <CFormInput
                              type="text"
                              hidden
                              defaultValue={element.mservice_no}
                              {...register(`test.${index}.service_no`)}
                            />
                          </CCol>
                          <CCol sm={3}>{element.charge_ammount}</CCol>
                          <CCol sm={3}>
                            <CFormInput
                              type="text"
                              defaultValue={element.override_charge}
                              {...register(`test.${index}.value`)}
                              placeholder="Override Charges"
                            />
                          </CCol>
                        </CRow>
                      );
                    })}

                  <div className="text-center ">
                    <Link to="/merchant-store">
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

export default MerchantStoreUpdate;
