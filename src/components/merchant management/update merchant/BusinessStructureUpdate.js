import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm, useFieldArray } from "react-hook-form";
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
} from "@coreui/react";

const BusinessStructure = ({ clickNext, data }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const [lookupList, setLooupList] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  console.log("props3", data);

  const saveBusinessStructure = (e) => {
    if (e) {
      swal({
        position: "top-end",
        text: "Category Service Created Successfull",
        icon: "success",
        button: false,
        timer: 1500,
      });
      localStorage.setItem("business_structure", 1);
      localStorage.setItem("merchant_id", data.merchant_id);
      localStorage.setItem(
        "business_name",
        e.business_name == "" ? data.business_name : e.business_name
      );
      localStorage.setItem(
        "business_short_name",
        e.business_short_name == "" ? data.short_name : e.business_short_name
      );
      localStorage.setItem(
        "bin",
        e.business_no == "" ? data.bin : e.business_no
      );
      localStorage.setItem(
        "business_address1",
        e.b_address_line_1 == "" ? data.business_address1 : e.b_address_line_1
      );
      localStorage.setItem(
        "business_address2",
        e.b_address_line_2 == "" ? data.business_address2 : e.b_address_line_2
      );
      localStorage.setItem(
        "business_city",
        e.b_city == "" ? data.business_city : e.b_city
      );
      localStorage.setItem(
        "business_website",
        e.bussiness_website == "" ? data.website : e.bussiness_website
      );
      localStorage.setItem(
        "business_state",
        e.b_state == "" ? data.business_state : parseInt(e.b_state)
      );
      localStorage.setItem(
        "business_postal_code",
        e.b_postel_code == "" ? data.business_postal_code : e.b_postel_code
      );
      localStorage.setItem(
        "business_Phone",
        e.b_phone == "" ? data.merchant_phone : parseInt(e.b_phone)
      );
      localStorage.setItem(
        "business_email",
        e.b_email == "" ? data.merchant_email : e.b_email
      );
      localStorage.setItem("file1", data.file_1);
      if (data.file_2) {
        localStorage.setItem("file2", data.file_2);
      }
    } else {
      swal({
        position: "top-end",
        text: "Faild",
        icon: "error",
        button: false,
        timer: 1500,
      });
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
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getFileLebel = (e) => {
    if (e == 2001001) {
      return "School Registartion Certificate by Board:";
    } else if (e == 2001002 || e == 2001006) {
      return "Incorporation Certificate";
    } else {
      return "Trade License";
    }
  };

  // const getCountryOption = (e) => {
  //   let Date = [];
  //   e.forEach((element) => {
  //     if (element.lov_id === 1001 && element.is_active === 1) {
  //       Date.push({ id: element.id, name: element.name });
  //     }
  //   });
  //   return Date;
  // };

  const getStateOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 3001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  const uploadFile1 = (e) => {
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
          console.log(response), setFile1(response.data.fileName);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          if (error.response.status == 401) {
            navigate("/login");
          }
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

  const uploadFile2 = (e) => {
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
          console.log(response), setFile2(response.data.fileName);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          if (error.response.status == 401) {
            navigate("/login");
          }
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

  const openFile = (e) => {
    window.open(`${process.env.REACT_APP_API_URL}uploads/uploads/get/${e}`);
  };

  useEffect(() => {
    getLookupList();
  }, []);

  return (
    <div>
      <CForm onSubmit={handleSubmit(saveBusinessStructure)}>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Merchant ID
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("merchant_id")}
              value={data.merchant_id}
              placeholder="Merchant ID"
            />
            <span className="text-danger">{errors.merchant_id?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Business Name
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("business_name")}
              defaultValue={data.business_name}
              placeholder="Business Name"
            />
            <span className="text-danger">{errors.business_name?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Business Short Name
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("business_short_name")}
              defaultValue={data.short_name}
              placeholder="Business Short Name"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            {localStorage.getItem("business_type") == 2001001
              ? "EIIN No."
              : "BIN No."}
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              defaultValue={data.bin}
              {...register("business_no")}
            />
            <span className="text-danger">{errors.business_no?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Address
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_address_line_1")}
              defaultValue={data.business_address1}
              placeholder="Address Line 1"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_address_line_2")}
              defaultValue={data.business_address2}
              placeholder="Address Line 2"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Phone Number
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_phone")}
              defaultValue={data.merchant_phone}
              placeholder="Phone Number"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Email
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_email")}
              defaultValue={data.merchant_email}
              placeholder="Email"
            />
            <span className="text-danger">{errors.city?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            Business website
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("bussiness_website")}
              defaultValue={data.website}
              placeholder="Business website"
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
              {...register("b_city")}
              defaultValue={data.business_city}
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
              {...register("b_state")}
              type="number"
            >
              {lookupList &&
                getStateOption(lookupList).map((country, index) => (
                  <option
                    value={country.id}
                    selected={
                      country.id === data.business_state ? "selected" : ""
                    }
                    key={index}
                  >
                    {country.name}
                  </option>
                ))}
            </CFormSelect>
            <span className="text-danger">{errors.state?.message}</span>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label text-right">
            Postal Code
          </CFormLabel>
          <CCol sm={8}>
            <CFormInput
              type="text"
              {...register("b_postel_code")}
              defaultValue={data.business_postal_code}
              placeholder="Postal Code"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-4 col-form-label">
            {getFileLebel(localStorage.getItem("business_type"))}
          </CFormLabel>
          <CCol sm={7}>
            <CFormInput type="file" onChange={uploadFile1} />
          </CCol>
          <CCol md={1}>
            <CButton
              color="secondary"
              onClick={() => {
                openFile(file1);
              }}
            >
              <CIcon icon={cilLowVision}></CIcon>
            </CButton>
          </CCol>
        </CRow>
        <div
          hidden={
            localStorage.getItem("business_type") == 2001001 ? true : false
          }
        >
          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">
              TIN Certificate
            </CFormLabel>
            <CCol sm={7}>
              <CFormInput type="file" onChange={uploadFile2} />
            </CCol>
            <CCol md={1}>
              <CButton
                color="secondary"
                onClick={() => {
                  openFile(file2);
                }}
              >
                <CIcon icon={cilLowVision}></CIcon>
              </CButton>
            </CCol>
          </CRow>
        </div>

        <CRow></CRow>
        <div className="text-center ">
          <CButton color="info" type="submit" className="mx-3">
            Updata
          </CButton>
          <CButton color="primary" onClick={() => clickNext(1)}>
            Next
          </CButton>
        </div>
      </CForm>
    </div>
  );
};

export default BusinessStructure;
