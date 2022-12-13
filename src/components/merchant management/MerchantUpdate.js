import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilLowVision } from "@coreui/icons";
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
  CFormCheck,
  CButton,
  CFormSelect,
} from "@coreui/react";

const MerchantUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const location = useLocation();
  const navigate = useNavigate();
  const [lookupList, setLooupList] = useState();
  const [businessType, setBusinessType] = useState();
  const [CompanyId, setCompanyId] = useState(location.state.business_type);

  console.log(location.state);

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
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };

  const getCountryOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 1001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const getCetagoryCode = (e) => {
    let id;
    if (e) {
      id = e;
    } else {
      id = location.state.industry_no;
    }
    if (id == 4001001) {
      return 8299;
    } else if (id == 4001002) {
      return 8398;
    } else if (id == 4001003) {
      return 7801;
    } else if (id == 4001003) {
      return 7801;
    } else if (id == 4001004) {
      return 7801;
    } else if (id == 4001005) {
      return 5137;
    } else if (id == 4001006) {
      return 9802;
    } else if (id == 4001007) {
      return 9985;
    } else if (id == 4001008) {
      return 3531;
    } else if (id == 4001009) {
      return 8099;
    } else if (id == 4001010) {
      return 9985;
    } else if (id == 4001007) {
      return 9997;
    }
  };

  const getBusinessOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 2001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const getStateOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 3001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const getIndustryOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 4001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const getFileLebel = (e) => {
    console.log(e);
    if (e == 2001001) {
      return "School Registartion Certificate by Board:";
    } else if (e == 2001002 || e == 2001006) {
      return "N Corporation File";
    } else {
      return "Trade License";
    }
  };

  const openFile = (e) => {
    window.open(`${process.env.REACT_APP_API_URL}uploads/uploads/get/${e}`);
  };

  const updateMerchat = (e) => {
    const data = {
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      address1: e.address_line_1,
      address2: e.address_line_2,
      city: e.city,
      state: e.state === "" ? location.state.state : parseInt(e.state),
      postal_code: e.postal_code,
      nid_number: e.national_id,
      country_no:
        e.Reg_business_address === ""
          ? location.state.country_no
          : parseInt(e.Reg_business_address),
      business_type:
        e.type_of_business === ""
          ? location.state.business_type
          : parseInt(e.type_of_business),
      business_name: e.business_name,
      bin: e.business_no,
      business_address1: e.b_address_line_1,
      business_address2: e.b_address_line_2,
      business_city: e.b_city,
      business_state:
        e.b_state === "" ? location.state.business_state : parseInt(e.b_state),
      business_postal_code: e.b_postel_code,
      marchant_id: location.state.marchant_id,
      industry_no:
        e.industry === "" ? location.state.industry_no : parseInt(e.industry),
      category_code: e.cat_code,
      website: e.bussiness_website,
      product_desc: e.Product_desc,
      is_active: e.status ? 1 : 0,
      upload_file: location.state.upload_file,
      merchant_pic: location.state.merchant_pic,
      short_name: e.short_name,
      date_of_birth: e.dob,
    };
    console.log(data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}marchants/update/${location.state.id}`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          text: "Organization Updated Successfull",
          icon: "success",
          position: "top-end",
          button: false,
          timer: 1500,
        });
        navigate("/merchant");
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

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard className="p-4">
              <h4>Merchant Details</h4>
              <CCardBody>
                <CForm onSubmit={handleSubmit(updateMerchat)}>
                  <CRow>
                    <CCol md={6}>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Merchant ID
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.marchant_id}
                            {...register("merId")}
                            placeholder="Merchant ID"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          Legal Identity of Company
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormSelect
                            aria-label="Default select example"
                            type="number"
                            disabled="true"
                            {...register("type_of_business")}
                            onChange={(e) => {
                              setCompanyId(e.target.value);
                            }}
                          >
                            {lookupList &&
                              getBusinessOption(lookupList).map(
                                (country, index) => (
                                  <option
                                    value={country.id}
                                    selected={
                                      country.id ===
                                      location.state.business_type
                                        ? "selected"
                                        : ""
                                    }
                                    key={index}
                                  >
                                    {country.name}
                                  </option>
                                )
                              )}
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          {CompanyId == 2001001 ? "EIIN No." : "BIN No."}
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.bin}
                            {...register("business_no")}
                            placeholder="Business No"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Industry/Business Type
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormSelect
                            aria-label="Default select example"
                            {...register("industry")}
                            type="number"
                            disabled="true"
                            onChange={(e) => {
                              setBusinessType(e.target.value);
                            }}
                          >
                            {lookupList &&
                              getIndustryOption(lookupList).map(
                                (country, index) => (
                                  <option
                                    value={country.id}
                                    selected={
                                      country.id === location.state.industry_no
                                        ? "selected"
                                        : ""
                                    }
                                    key={index}
                                  >
                                    {country.name}
                                  </option>
                                )
                              )}
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Merchant Category Code
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            value={getCetagoryCode(businessType)}
                            {...register("cat_code")}
                            placeholder="Merchant cetagory code"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          Business Name
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.business_name}
                            {...register("business_name")}
                            placeholder="Business Name"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          Business Short Name
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.short_name}
                            {...register("short_name")}
                            placeholder="Business Short Name"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          Address
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormTextarea
                            type="text"
                            disabled="true"
                            defaultValue={location.state.business_address1}
                            {...register("b_address_line_1")}
                            placeholder="Address Line 1"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
                        <CCol sm={8}>
                          <CFormTextarea
                            type="text"
                            disabled="true"
                            defaultValue={location.state.business_address2}
                            {...register("b_address_line_2")}
                            placeholder="Address Line 2"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          City
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.business_city}
                            {...register("b_city")}
                            placeholder="City"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          District
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormSelect
                            aria-label="Default select example"
                            disabled="true"
                            {...register("b_state")}
                            type="number"
                          >
                            {lookupList &&
                              getStateOption(lookupList).map(
                                (country, index) => (
                                  <option
                                    value={country.id}
                                    selected={
                                      country.id ==
                                      location.state.business_state
                                        ? "selected"
                                        : ""
                                    }
                                    key={index}
                                  >
                                    {country.name}
                                  </option>
                                )
                              )}
                          </CFormSelect>
                          <span className="text-danger">
                            {errors.state?.message}
                          </span>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label text-right">
                          Postal Code
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.business_postal_code}
                            {...register("b_postel_code")}
                            placeholder="Postal Code"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Business website
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.website}
                            {...register("bussiness_website")}
                            placeholder="Business website"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Product Description
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormTextarea
                            type="text"
                            disabled="true"
                            defaultValue={location.state.product_desc}
                            {...register("Product_desc")}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Status
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormCheck
                            label="Active"
                            {...register("status")}
                            disabled="true"
                            defaultChecked={
                              location.state.is_active == 1 ? true : false
                            }
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-7 col-form-label">
                          {getFileLebel(location.state.business_type)}
                        </CFormLabel>
                        <CCol sm={3}>
                          <CButton
                            color="secondary"
                            onClick={() => {
                              openFile(location.state.file_1);
                            }}
                          >
                            <CIcon icon={cilLowVision}></CIcon>
                          </CButton>
                        </CCol>
                      </CRow>
                      <div hidden={!location.state.file_2 ? true : false}>
                        <CRow className="mb-3">
                          <CFormLabel className="col-sm-7 col-form-label">
                            TIN Certificate
                          </CFormLabel>
                          <CCol sm={3}>
                            <CButton
                              color="secondary"
                              onClick={() => {
                                openFile(location.state.file_2);
                              }}
                            >
                              <CIcon icon={cilLowVision}></CIcon>
                            </CButton>
                          </CCol>
                        </CRow>
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <CRow className="mb-3">
                        <CCol sm={6}>
                          <div className="merchant_img text-center">
                            <img
                              src={`${process.env.REACT_APP_API_URL}poricoy/image/${location.state.nid_number}.jpg`}
                            />
                          </div>
                        </CCol>
                        <CCol sm={6}>
                          <div className="merchant_img text-center">
                            <img
                              src={`${process.env.REACT_APP_API_URL}uploads/uploads/get/${location.state.merchant_pic}`}
                            />
                          </div>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Legal Name Of Person
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.first_name}
                            {...register("first_name")}
                            placeholder="First Name"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.last_name}
                            {...register("last_name")}
                            placeholder="Last Name"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Email Address
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.email}
                            {...register("email")}
                            placeholder="Email Address"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          City
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.city}
                            {...register("city")}
                            placeholder="City"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Address
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormTextarea
                            type="text"
                            disabled="true"
                            defaultValue={location.state.address1}
                            {...register("address_line_1")}
                            placeholder="Address Line 1"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
                        <CCol sm={8}>
                          <CFormTextarea
                            type="text"
                            disabled="true"
                            defaultValue={location.state.address2}
                            {...register("address_line_2")}
                            placeholder="Address Line 2"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          State
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormSelect
                            aria-label="Default select example"
                            {...register("state")}
                            disabled="true"
                            type="number"
                          >
                            {lookupList &&
                              getStateOption(lookupList).map(
                                (country, index) => (
                                  <option
                                    value={country.id}
                                    selected={
                                      country.id == location.state.state
                                        ? "selected"
                                        : ""
                                    }
                                    key={index}
                                  >
                                    {country.name}
                                  </option>
                                )
                              )}
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Postal Code
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.postal_code}
                            {...register("postal_code")}
                            placeholder="Postal Code"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          National ID
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="text"
                            disabled="true"
                            defaultValue={location.state.nid_number}
                            {...register("national_id")}
                            placeholder="Nationnal Id"
                          />
                        </CCol>
                      </CRow>{" "}
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          Date Of Birth
                        </CFormLabel>
                        <CCol sm={8}>
                          <CFormInput
                            type="date"
                            disabled="true"
                            defaultValue={location.state.date_of_birth}
                            {...register("dob")}
                            placeholder="Date Of Birth"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CFormLabel className="col-sm-4 col-form-label">
                          NID Copy
                        </CFormLabel>
                        <CCol sm={8}>
                          <CButton
                            color="secondary"
                            onClick={() => {
                              openFile(location.state.nid_picture);
                            }}
                          >
                            <CIcon icon={cilLowVision}></CIcon>
                          </CButton>
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol sm={12}>
                          <div className="text-center">
                            <CButton
                              color="info"
                              onClick={() =>
                                navigate("/update-merchant-representative", {
                                  state: location.state,
                                })
                              }
                            >
                              Update Representative
                            </CButton>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                  <div className="text-center">
                    <Link to="/merchant">
                      <CButton color="danger">Cancle</CButton>
                    </Link>
                    {/* <CButton color="info" type="submit" className="mx-3">
                      Updata
                    </CButton> */}
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
export default MerchantUpdate;
