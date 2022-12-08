import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import { cilLowVision } from "@coreui/icons";
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
  CButton,
  CFormTextarea,
} from "@coreui/react";

const BusinessRepresentative = ({ clickNext }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const [lookupList, setLooupList] = useState();
  const [image, setImage] = useState("");
  const [nid, seNid] = useState();
  const [dob, seDob] = useState();
  const [nidInfo, setNidInfo] = useState();

  const handleNidNumber = (e) => {
    seNid(e.target.value);
  };
  const handleDOB = (e) => {
    seDob(e.target.value);
  };

  const searchNid = async (e) => {
    e.preventDefault();
    const data = {
      nidNumber: nid,
      dateOfBirth: dob,
    };
    console.log(data);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      cors: "no-cors",
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}poricoy/verify`, data, {
        headers,
      })
      .then((responce) => {
        setNidInfo(responce.data);
        console.log(responce);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const saveBusinessRepresentative = (e) => {
    const data = {
      first_name:
        e.first_name == "" ? nidInfo?.json_log.nid.fullNameEN : e.first_name,
      last_name: e.last_name,
      email: e.email,
      address1:
        e.address_line_1 == ""
          ? nidInfo?.json_log.nid.presentAddressEN
          : e.address_line_1,
      address2:
        e.address_line_2 == ""
          ? nidInfo?.json_log.nid.permenantAddressEN
          : e.address_line_2,
      city: e.city,
      state: e.state,
      postal_code: parseInt(e.postal_code),
      nid_number: nid,
      date_of_birth: dob,
      merchant_pic: image,
      marchant_id: localStorage.getItem("merchant_id"),
      industry_no: localStorage.getItem("indeustry"),
      category_code: localStorage.getItem("category_code"),
      website: localStorage.getItem("business_website"),
      product_desc: localStorage.getItem("description"),
      is_active: parseInt(localStorage.getItem("status")),
      country_no: parseInt(localStorage.getItem("country_no")),
      business_type: parseInt(localStorage.getItem("business_type")),
      business_name: localStorage.getItem("business_name"),
      bin: localStorage.getItem("bin"),
      business_address1: localStorage.getItem("business_address1"),
      business_address2: localStorage.getItem("business_address2"),
      business_city: localStorage.getItem("business_city"),
      business_state: parseInt(localStorage.getItem("business_state")),
      business_postal_code: localStorage.getItem("business_postal_code"),
      merchant_phone: localStorage.getItem("business_Phone"),
      merchant_email: localStorage.getItem("business_email"),
    };

    console.log(data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}marchants/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        saveFiles(response.data.id);
        localStorage.setItem("merchant_id", response.data.id);
        swal({
          position: "top-end",
          text: "Save Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        reset();
        localStorage.setItem("isSubmitBusiness", 1);
        localStorage.removeItem("country_no");
        localStorage.removeItem("business_type");
        localStorage.removeItem("business_name");
        localStorage.removeItem("bin");
        localStorage.removeItem("business_address1");
        localStorage.removeItem("business_address2");
        localStorage.removeItem("business_city");
        localStorage.removeItem("business_state");
        localStorage.removeItem("business_postal_code");
        localStorage.removeItem("business_Phone");
        localStorage.removeItem("business_email");
        localStorage.removeItem("merchant_id");
        localStorage.removeItem("indeustry");
        localStorage.removeItem("category_code");
        localStorage.removeItem("business_website");
        localStorage.removeItem("description"),
          localStorage.removeItem("status");
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

  const saveFiles = (e) => {
    if (localStorage.getItem("multiFile")) {
      let data = [];
      JSON.parse(localStorage.getItem("multiFile"))?.map((file) => {
        data.push({ merchant_no: e, file_name: file, file_type: 2 });
      });
      console.log(data);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}attachments/merchant-attachments`,
          data,
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response);
          clickNext(1);
          localStorage.removeItem("multiFile"),
            swal({
              position: "top-end",
              text: "Organization Created Successfull",
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
    } else {
      clickNext(1);
    }
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

  const getStateOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 3001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const uploadFile = (e) => {
    var data = new FormData();
    data.append("file", e.target.files[0]);

    if (e.target.files[0].size > 5e6) {
      swal({
        position: "top-end",
        text: "Your File is too Large! Please provide the file below 5MB.",
        icon: "warning",
        button: false,
        timer: 3000,
      });
      e.target.value = null;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}uploads/upload`, data)
        .then((response) => {
          console.log(response), setImage(response.data.fileName);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          swal({
            position: "top-end",
            text: "File Upload Failed",
            icon: "error",
            button: false,
            timer: 1500,
          });
        });
    }
  };

  const openFile = () => {
    window.open(`${process.env.REACT_APP_API_URL}uploads/uploads/get/${image}`);
  };

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div>
      <CForm onSubmit={handleSubmit(saveBusinessRepresentative)}>
        <CRow>
          <CCol sm={8}>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                Nid Number
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  placeholder="NID Number"
                  onChange={handleNidNumber}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                Date of Birth
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  type="date"
                  placeholder=" Date of Birth"
                  onChange={handleDOB}
                />
              </CCol>
              <CCol sm={2}>
                <CButton onClick={searchNid}>Search</CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                Legal Name Of Person
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  defaultValue={nidInfo?.json_log.nid.fullNameEN}
                  {...register("first_name")}
                  placeholder="Fist Name"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  {...register("last_name", {
                    required: "Please provide last Name",
                  })}
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
                  {...register("email")}
                  placeholder="Email Address"
                />
              </CCol>
            </CRow>
            {/* <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                Date of Birth
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="date"
                  {...register("dob")}
                  placeholder=" Date of Birth"
                />
              </CCol>
            </CRow> */}
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">City</CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  {...register("city", {
                    required: "Please provide City",
                  })}
                  placeholder="City"
                />
                <span className="text-danger">{errors.city?.message}</span>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                District
              </CFormLabel>
              <CCol sm={8}>
                <CFormSelect
                  aria-label="Default select example"
                  {...register("state")}
                  type="number"
                >
                  <option>Select District</option>
                  {lookupList &&
                    getStateOption(lookupList).map((country, index) => (
                      <option value={country.id} key={index}>
                        {country.name}
                      </option>
                    ))}
                </CFormSelect>
                <span className="text-danger">{errors.state?.message}</span>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                Postal Code
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  {...register("postal_code", {
                    required: "Please Provide Postal Code",
                  })}
                  placeholder="Postal Code"
                />
                <span className="text-danger">
                  {errors.postal_code?.message}
                </span>
              </CCol>
            </CRow>
          </CCol>
          <CCol md={4}>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
              <CCol sm={12} className="mb-2">
                <div className="merchant_img text-center">
                  <img
                    src={`${process.env.REACT_APP_API_URL}poricoy/image/${nidInfo?.image_path}`}
                  />
                </div>
              </CCol>
              <CCol sm={12}>
                <div className="merchant_img text-center">
                  <img
                    src={`${process.env.REACT_APP_API_URL}uploads/uploads/get/${image}`}
                  />
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={12}>
                <CFormInput type="file" onChange={uploadFile} />
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CFormLabel className="col-sm-2 col-form-label">
            Present Address
          </CFormLabel>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CCol sm={9}>
            <CFormTextarea
              type="text"
              defaultValue={nidInfo?.json_log.nid?.presentAddressEN}
              {...register("address_line_1")}
              placeholder="Address Line 1"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-2 col-form-label">
            Permanent Address
          </CFormLabel>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CCol sm={9}>
            <CFormTextarea
              type="text"
              defaultValue={nidInfo?.json_log.nid?.permenantAddressEN}
              {...register("address_line_2")}
              placeholder="Address Line 2"
            />
          </CCol>
        </CRow>
        {/* <CRow className="mb-3">
          <CFormLabel className="col-sm-2 col-form-label">
            National Id
          </CFormLabel>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CCol sm={9}>
            <CFormInput
              type="text"
              {...register("national_id")}
              placeholder="Nationnal Id"
            />
          </CCol>
        </CRow> */}

        <CRow className="mb-3">
          <CFormLabel className="col-sm-2 col-form-label"></CFormLabel>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CCol sm={9}>
            <p>
              We use this information to verify your identity. If you leave this
              feld blank, we’ll email you instructions to submit another form of
              ID.
            </p>
          </CCol>
        </CRow>
        <div className="text-center ">
          <CButton color="success" type="submit" className="mx-3">
            Save
          </CButton>
          {/* <CButton color="primary" onClick={() => clickNext(1)}>
            Next
          </CButton> */}
        </div>
      </CForm>
    </div>
  );
};

export default BusinessRepresentative;
