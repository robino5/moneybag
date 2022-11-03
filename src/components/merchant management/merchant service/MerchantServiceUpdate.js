import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const MerchantServiceUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [merchantList, setmerchantList] = useState();
  const [bankList, setBankList] = useState();
  const [lookupList, setLooupList] = useState();
  const [merchantService, setMerchantServicee] = useState();
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [chargeType, setChargeType] = useState();
  const [servicevalue, setServiceValue] = useState({});
  const [slabservice, setSlabServce] = useState({
    mrservice_no: 0,
    from_slab_amount: 0,
    to_slab_amount: 0,
    charge_ammount: 0,
  });
  const [combinationservice, setCombinationServce] = useState({
    mrservice_no: 0,
    from_amount: 0,
    to_amount: 0,
    discount_amount: 0,
    start_date: "",
    end_date: "",
  });

  console.log("Combination", location.state);

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

  const getMerchantService = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}merchant-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMerchantServicee(responce.data);
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

  //   const removemerchantService = (i) => {
  //     let data = [...merchantService];
  //     data.splice(i, 1);
  //     setMerchantServicee(data);
  //   };

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

  const setService = (element) => {
    setServiceValue({
      id: element.id,
      bank_no: element.bank_no,
      charge_ammount: element.charge_ammount,
      service_charge_type: element.service_charge_type,
      service_no: element.service_no,
    });
  };

  const selectMerchatServices = (e, id) => {
    let data = [];
    e &&
      e.map((element) => {
        if (element.merchant_no === id) {
          data.push({
            id: element.id,
            bank_no: element.bank_no,
            service_no: element.service_no,
            service_charge_type: element.service_charge_type,
            charge_ammount: element.charge_ammount,
          });
        }
      });
    return data;
  };

  const addslabServices = (e) => {
    setSlabServce({
      from_slab_amount: e.from_slab_amount,
      to_slab_amount: e.to_slab_amount,
      charge_ammount: e.charge_ammount,
    });
  };

  const addCombinationServices = (e) => {
    setCombinationServce({
      from_amount: e.from_amount,
      to_amount: e.to_amount,
      discount_amount: e.discount_amount,
      start_date: e.start_date,
      end_date: e.end_date,
    });
  };

  const saveSlabService = (e) => {
    console.log(e);
    let data = [];
    e &&
      e.map((element) => {
        if (element.service_charge_type === "S") {
          data.push({
            mrservice_no: element.id,
            from_slab_amount: parseFloat(slabservice.from_slab_amount),
            to_slab_amount: parseFloat(slabservice.to_slab_amount),
            charge_ammount: parseFloat(slabservice.charge_ammount),
          });
        }
      });
    console.log("slab", data);
    if (data) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}merchant-slabs/`, data, {
          headers,
        })
        .then((response) => {
          console.log("slab res", response);
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
  };

  const saveConbinationService = (e) => {
    console.log(e);
    let data = [];
    e &&
      e.map((element) => {
        if (element.service_charge_type === "C") {
          data.push({
            mrservice_no: element.id,
            from_amount: parseFloat(combinationservice.from_amount),
            to_amount: parseFloat(combinationservice.to_amount),
            discount_amount: parseFloat(combinationservice.discount_amount),
            start_date: combinationservice.start_date,
            end_date: combinationservice.end_date,
          });
        }
      });
    console.log(data);
    if (data != null) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}merchant-combinations/`, data, {
          headers,
        })
        .then((response) => {
          console.log("conbination", response);
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
  };

  const updateMerchantService = (e) => {
    const mercharDate = {
      merchant_no: location.state,
      bank_no: servicevalue.bank_no,
      service_no: servicevalue.service_no,
      service_charge_type:
        e.service_charge_type == ""
          ? servicevalue.service_charge_type
          : e.service_charge_type,
      charge_ammount:
        e.percentage == "" ? servicevalue.charge_ammount : e.percentage,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}merchant-services/update/${servicevalue.id}`,
        mercharDate,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
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
        swal({
          text: error.response.data.detail,
          icon: "error",
          position: "top-end",
          button: false,
          timer: 1500,
        });
      });
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
        console.log("servive", response);
        saveSlabService(response.data);
        saveConbinationService(response.data);
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
    getMerchantService();
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
                <CForm onSubmit={handleSubmit(updateMerchantService)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Merchant Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("merchant_name")}
                        disabled="true"
                      >
                        <option>select Merchant Name</option>
                        {merchantList &&
                          merchantList.map((merchant, index) => (
                            <option
                              value={merchant.id}
                              selected={
                                merchant.id === location.state ? "selected" : ""
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
                    <p className="col-sm-3 col-form-label">
                      Settlement Account Name
                    </p>
                    <CCol sm={9}>
                      {merchantList &&
                        getMertchantDetail(
                          marchantDetailList,
                          location.state
                        ).map((element, index) => {
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
                        {...register("bank_name")}
                        disabled="true"
                      >
                        <option>select Bank</option>
                        {getBankOption(bankList) &&
                          getBankOption(bankList).map((bank, index) => (
                            <option
                              value={bank.id}
                              selected={
                                bank.id === servicevalue.bank_no
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
                    <CCol sm={3}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("service_name")}
                        disabled="true"
                      >
                        <option>select Service</option>
                        {lookupList &&
                          getServiceOption(lookupList).map((service, index) => (
                            <option
                              value={service.id}
                              selected={
                                service.id === servicevalue.service_no
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
                    <CCol sm={2}>
                      <CFormInput
                        type="text"
                        {...register("percentage")}
                        defaultValue={servicevalue.charge_ammount}
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
                        <option
                          selected={servicevalue.service_charge_type == "F"}
                          value={"F"}
                        >
                          Fixed
                        </option>
                        <option
                          selected={servicevalue.service_charge_type == "P"}
                          value={"P"}
                        >
                          Percentage{" "}
                        </option>
                        <option
                          selected={servicevalue.service_charge_type == "S"}
                          value={"S"}
                        >
                          Slab{" "}
                        </option>
                        <option
                          selected={servicevalue.service_charge_type == "C"}
                          value={"C"}
                        >
                          Combination{" "}
                        </option>
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
                        {...register("from_slab_amount")}
                        placeholder="From Amount"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("to_slab_amount")}
                        placeholder="To Amount"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("charge_ammount")}
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
                <CForm
                  hidden={
                    chargeType !== "C" || combinationservice.from_amount !== 0
                      ? true
                      : false
                  }
                  onSubmit={handleSubmit(addCombinationServices)}
                >
                  <CRow className="mb-3">
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("from_amount")}
                        placeholder="From Amount"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("to_amount")}
                        placeholder="To Amount"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="text"
                        {...register("discount_amount")}
                        placeholder="Discount Amount"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="datetime-local"
                        {...register("start_date")}
                        placeholder="Start Date"
                      />
                    </CCol>
                    <CCol sm={3}>
                      <CFormInput
                        type="datetime-local"
                        {...register("end_date")}
                        placeholder="End Date"
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
                {merchantList &&
                  selectMerchatServices(merchantService, location.state).map(
                    (element, index) => {
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
                              <p>
                                {getChargeType(element.service_charge_type)}
                              </p>
                            </CCol>
                            <CCol sm={1}>
                              <CButton
                                onClick={(e) => {
                                  setService(element);
                                }}
                                className="btn-sm"
                                color="info"
                              >
                                Edit
                              </CButton>
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
                    }
                  )}
                <div className="text-center ">
                  <Link to="/merchant-service">
                    <CButton color="danger" className="mx-3">
                      Cancle
                    </CButton>
                  </Link>
                  {/* <CButton onClick={saveMerchantServices} color="success">
                    Save
                  </CButton> */}
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MerchantServiceUpdate;
