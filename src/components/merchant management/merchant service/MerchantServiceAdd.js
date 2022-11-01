import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilPlus, cilMinus } from "@coreui/icons";
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

const MerchantServiceAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [merchantList, setmerchantList] = useState();
  const [bankList, setBankList] = useState();
  const [lookupList, setLooupList] = useState();
  const [merchantService, setMerchantServicee] = useState([]);
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [marchantDetail, setMarchentDetail] = useState();
  const [chargeType, setChargeType] = useState();
  const [slabservice, setSlabServce] = useState({
    mrservice_no: 0,
    from_slab_amount: 0,
    to_slab_amount: 0,
    charge_ammount: 0,
  });

  const [slabserviceId, setSlabServceId] = useState({
    mrservice_no: 0,
  });

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
      });
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

  const getChargeType = (e) => {
    if (e == "F") {
      return "Fixed";
    } else if (e == "S") {
      return "Slab";
    } else if (e == "P") {
      return "Percentage";
    } else if (e == "C") {
      return "Combination";
    }
  };

  const removemerchantService = (i) => {
    let data = [...merchantService];
    data.splice(i, 1);
    setMerchantServicee(data);
  };

  const getMertchantDetail = (e, id) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.merchant_no === parseInt(id)) {
          date.push({
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

  const addslabServices = (e) => {
    setSlabServce({
      from_slab_amount: e.from_slab_amount,
      to_slab_amount: e.to_slab_amount,
      charge_ammount: e.charge_ammount,
    });
  };

  const saveSlabService = (e) => {
    e.map((element) => {
      if (element.service_charge_type === "S") {
        setSlabServceId({ mrservice_no: element.id });
      }
    });

    console.log("jhgjkl;", slabserviceId);
  };
  console.log(slabservice);
  const addMerchantServices = (e) => {
    const merchantServiceData = {
      merchant_no: parseInt(e.merchant_name),
      bank_no: parseInt(e.bank_name),
      service_no: parseInt(e.service_name),
      charge_ammount: parseFloat(e.percentage),
      service_charge_type: e.service_charge_type,
    };
    merchantService.push(merchantServiceData);
  };

  const saveMerchantServices = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}merchant-services/`,
        merchantService,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        saveSlabService(response.data);
        swal({
          position: "top-end",
          text: "Store Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        navigate("/merchant-service");
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
    getMertchant();
    getMertchantDetailList();
    getBankList();
    getLookupList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(addMerchantServices)}>
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
                    <p className="col-sm-3 col-form-label">
                      Settlement Account Name
                    </p>
                    <CCol sm={9}>
                      {marchantDetail &&
                        marchantDetail.map((element, index) => {
                          return (
                            <p>
                              {getMerchantName(element.merchant_no) +
                                "(" +
                                getBankName(element.bank_no) +
                                "-" +
                                getBankName(element.branch_no) +
                                ")"}
                            </p>
                          );
                        })}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={3}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("bank_name", {
                          required: "Please select Bannk name",
                        })}
                      >
                        <option>select Bank</option>
                        {getBankOption(bankList) &&
                          getBankOption(bankList).map((bank, index) => (
                            <option value={bank.id} key={index}>
                              {bank.branch_name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                    <CCol sm={3}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("service_name", {
                          required: "Please select Service name",
                        })}
                      >
                        <option>select Service</option>
                        {lookupList &&
                          getServiceOption(lookupList).map((service, index) => (
                            <option value={service.id} key={index}>
                              {service.name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput
                        type="text"
                        {...register("percentage")}
                        placeholder="Percentage"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("service_charge_type", {
                          required: "Please select service charge type",
                        })}
                        onChange={(e) => {
                          setChargeType(e.target.value);
                        }}
                      >
                        <option>Select service charge type</option>
                        <option value={"F"}>Fixed</option>
                        <option value={"P"}>Percentage </option>
                        <option value={"S"}>Slab </option>
                        <option value={"C"}>Combination </option>
                      </CFormSelect>
                    </CCol>
                    <CCol sm={1}>
                      <CButton
                        className="btn-sm"
                        disabled={!isDirty}
                        type="submit"
                      >
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CForm
                  hidden={
                    chargeType !== "S" || slabservice.from_slab_amount !== 0
                      ? true
                      : false
                  }
                  onSubmit={handleSubmit(addslabServices)}
                >
                  <CRow className="mb-3">
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("from_slab_amount", {
                          required: "Please Povide From Amount",
                        })}
                        placeholder="From Amount"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("to_slab_amount", {
                          required: "Please Provide To Amount",
                        })}
                        placeholder="To Amount"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("charge_ammount", {
                          required: "Please Provide Charge Amount",
                        })}
                        placeholder="Charge Amount"
                      />
                    </CCol>
                    <CCol sm={1}>
                      <CButton
                        className="btn-sm"
                        disabled={!isDirty}
                        type="submit"
                      >
                        Save
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                {merchantService &&
                  merchantService.map((element, index) => {
                    return (
                      <div>
                        <CRow className="mb-3">
                          <CCol sm={3}>
                            <p>{getBankName(element.bank_no)}</p>
                          </CCol>
                          <CCol sm={3}>
                            <p>{getServiceName(element.service_no)}</p>
                          </CCol>
                          <CCol sm={2}>
                            <p>{element.charge_ammount}</p>
                          </CCol>
                          <CCol sm={3}>
                            <p>{getChargeType(element.service_charge_type)}</p>
                          </CCol>
                          <CCol sm={1}>
                            <CButton
                              className="btn-sm"
                              color="danger"
                              onClick={(e) => {
                                removemerchantService(index);
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
                  <Link to="/merchant-service">
                    <CButton color="danger" className="mx-3">
                      Cancle
                    </CButton>
                  </Link>
                  <CButton onClick={saveMerchantServices} color="success">
                    Save
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MerchantServiceAdd;