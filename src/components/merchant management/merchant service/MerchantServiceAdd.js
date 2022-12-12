import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import SlabAdd from "src/components/slab/SlabAdd";
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
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
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
  const [merchantService, setMerchantServicee] = useState();
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [marchantDetail, setMarchentDetail] = useState();
  const [marchantId, setMarchentId] = useState();
  const [slabList, setslabList] = useState();
  const [visible, setVisible] = useState(false);

  const [slabId, setSlabId] = useState();

  console.log("MerchnetList", merchantService);

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

  const getMerchantService = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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
      });
  };

  const getSlabList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}merchant-slabs/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setslabList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getSlabAmount = (e) => {
    let amount;
    console.log(slabList, e);
    slabList?.map((slab) => {
      if (slab.mrservice_no == e) {
        amount =
          "(" +
          slab.from_slab_amount +
          "-" +
          slab.to_slab_amount +
          ")/" +
          slab.charge_ammount;
      } else {
        amount = 0;
      }
    });
    console.log(amount);
    return amount;
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
          merchatname = element.business_name;
        }
      });
    return merchatname;
  };

  const setSlabService = (e) => {
    setSlabId(e);
    setVisible(!visible);
  };

  const closeModal = () => {
    getMerchantService(), getSlabList();
    setVisible(false);
  };

  const addMerchantServices = (e) => {
    let duplicate = false;
    console.log(marchantId);
    merchantService?.map((marchant) => {
      if (
        (marchant.merchant_no == marchantId) &
        (marchant.service_no === parseInt(e.service_name))
      ) {
        duplicate = true;
      }
    });
    if (duplicate) {
      swal({
        position: "top-end",
        text: "You can't duplicate Service Entry!",
        icon: "warning",
        button: false,
        timer: 3000,
      });
    } else {
      const merchantServiceData = [
        {
          merchant_no: parseInt(e.merchant_name),
          bank_no: parseInt(e.bank_name),
          service_no: parseInt(e.service_name),
          charge_ammount: parseFloat(e.percentage),
          is_active:e.status?1:0,
          service_charge_type: e.service_charge_type,
        },
      ];
      console.log(merchantServiceData);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}merchant-services/`,
          merchantServiceData,
          {
            headers,
          }
        )
        .then((response) => {
          console.log("servive", response);
          swal({
            position: "top-end",
            text: "Store Created Successfull",
            icon: "success",
            button: false,
            timer: 1500,
          });
          getMerchantService();
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

  const selectMerchatServices = (e, id) => {
    console.log(e, id);
    let data = [];
    e &&
      e.map((element) => {
        if (element.merchant_no == id) {
          data.push({
            id: element.id,
            bank_no: element.bank_no,
            service_no: element.service_no,
            service_charge_type: element.service_charge_type,
            charge_ammount: element.charge_ammount,
            is_active: element.is_active
          });
        }
      });
    console.log(data);
    return data;
  };

  useEffect(() => {
    const getAllData = async () => {
      await getMertchant();
      await getBankList();
      await getLookupList();
      await getMerchantService();
      await getMertchantDetailList();
      await getSlabList();
    };
    getAllData();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <h6 className="text-center">Add Merchant Service</h6>
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
                          setMarchentId(e.target.value);
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
                              {merchant.business_name}
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
                        placeholder="Rate"
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormSelect
                        aria-label="Default select example"
                        {...register("service_charge_type", {
                          required: "Please select rate type",
                        })}
                      >
                        <option>Select Rate type</option>
                        <option value={"F"}>Fixed</option>
                        <option value={"P"}>Percentage </option>
                        {/* <option value={"S"}>Slab </option> */}
                        {/* <option value={"C"}>Combination </option> */}
                      </CFormSelect>
                    </CCol>
                    <CCol sm={1}>
                    <CFormCheck
                        name="status"
                        label="Active"
                        {...register("status")}
                      />
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
                {merchantService &&
                  selectMerchatServices(merchantService, marchantId).map(
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
                              <p>
                                {element.service_charge_type == "S"
                                  ? getSlabAmount(element.id)
                                  : element.charge_ammount}
                              </p>
                            </CCol>
                            <CCol sm={2}>
                              <p
                                className={
                                  element.service_charge_type == "S"
                                    ? "service_charge_type_wrapper"
                                    : ""
                                }
                                onClick={() => {
                                  setSlabService(element.id);
                                }}
                              >
                                {getChargeType(element.service_charge_type)}
                              </p>
                            </CCol>
                            <CCol sm={2}>
                              <p>{element.is_active==1?"Active":"Inactive"}</p>
                            </CCol>
                            {/* <CCol sm={1}>
                              <CButton
                                onClick={(e) => {
                                  setService(element);
                                }}
                                className="btn-sm"
                                color="info"
                              >
                                <CIcon icon={cilPen} />
                              </CButton>
                            </CCol> */}
                            {/* <CCol sm={1}>
                              <CButton
                                className="btn-sm"
                                color="danger"
                                onClick={(e) => {
                                  removemerchantService(element.id);
                                }}
                              >
                                <CIcon icon={cilMinus} />
                              </CButton>
                            </CCol> */}
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
      <div>
        <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
          <CModalHeader onClose={() => closeModal()}>
            <CModalTitle>Add slab Amount</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <SlabAdd data={slabId} />
          </CModalBody>
        </CModal>
      </div>
    </div>
  );
};

export default MerchantServiceAdd;
