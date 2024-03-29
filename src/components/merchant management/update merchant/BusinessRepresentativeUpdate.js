import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import { cilLowVision } from "@coreui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
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

const BusinessRepresentative = ({ clickNext, data }) => {
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
  const [dob, seDob] = useState(null);
  const [nidInfo, setNidInfo] = useState();
  const [nidCopy, setNidCopy] = useState();
  console.log("props2", data);
  const handleNidNumber = (e) => {
    seNid(e.target.value);
  };
  const handleDOB = (e) => {
    seDob(e.target.value);
  };
  console.log("nid", nidInfo);
  const givenDateOfBirth = new Date(dob);
  const isoDate = DateTime.fromISO(givenDateOfBirth.toISOString());

  const searchNid = async (e) => {
    e.preventDefault();
    // const givenDateOfBirth = new Date(dob)
    // const isoDate = DateTime.fromISO(givenDateOfBirth.toISOString())
    const data = {
      nidNumber: nid,
      dateOfBirth: isoDate.toISODate(),
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
        reset();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const saveBusinessRepresentative = (e) => {
    console.log(e);
    if (e) {
      swal({
        position: "top-end",
        text: "Category Service Created Successfull",
        icon: "success",
        button: false,
        timer: 1500,
      });
      localStorage.setItem("business_representative", 1);
      localStorage.setItem(
        "first_name",
        e.first_name == ""
          ? nidInfo
            ? nidInfo.json_log.nid.fullNameEN
            : data.first_name
          : e.first_name
      );
      localStorage.setItem(
        "last_name",
        e.last_name == "" ? data.last_name : e.last_name
      );
      localStorage.setItem("email", e.email == "" ? data.email : e.email);
      localStorage.setItem(
        "address1",
        e.address_line_1 == ""
          ? nidInfo
            ? nidInfo.json_log.nid.presentAddressEN
            : data.address1
          : e.address_line_1
      );
      localStorage.setItem(
        "address2",
        e.address_line_2 == ""
          ? nidInfo
            ? nidInfo.json_log.nid.permenantAddressEN
            : data.address2
          : e.address_line_2
      );
      localStorage.setItem("city", e.city == "" ? data.city : e.city);
      localStorage.setItem("state", e.state == "" ? data.city : e.state);
      localStorage.setItem(
        "postal_code",
        e.postal_code ? data.postal_code : parseInt(e.postal_code)
      );
      localStorage.setItem("nid_number", nid ? nid : data.nid_number);
      localStorage.setItem(
        "date_of_birth",
        dob ? isoDate.toISODate() : data.date_of_birth
      );
      localStorage.setItem("merchant_pic", image ? image : data.merchant_pic);
      localStorage.setItem("nid_picture", nidCopy ? nidCopy : data.nid_picture);
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

  const getDefaultFirstName = (nid, e) => {
    if (nid) {
      console.log("first_name", nid.json_log.nid.fullNameEN);
      return nid.json_log.nid.fullNameEN;
    } else {
      console.log("firtst-name", e);
      return e;
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

  const srtRepresentativeImage = (e) => {
    if (nidInfo) {
      return "";
    } else {
      return e;
    }
  };

  const setRepresentativeState = (e) => {
    if (nidInfo) {
      return "";
    } else {
      return e;
    }
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
  const uploadphoto = (e) => {
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
          console.log(response), setNidCopy(response.data.fileName);
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

  const openFile = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}uploads/uploads/get/${nidCopy}`
    );
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
                NID Number
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  placeholder="NID Number"
                  defaultValue={data.nid_number}
                  onChange={handleNidNumber}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                Date of Birth
              </CFormLabel>
              <CCol sm={6}>
                {/* <CFormInput
                  type="date"
                  placeholder=" Date of Birth"
                  onChange={handleDOB}
                /> */}

                <DatePicker
                  selected={dob}
                  onChange={(data) => seDob(data)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyy"
                  className="date-picker-input"
                />
              </CCol>
              <CCol sm={2}>
                <CButton type="submit" onClick={searchNid}>
                  Search
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label">
                Legal Name of Person
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  defaultValue={getDefaultFirstName(nidInfo, data.first_name)}
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
                  {...register("last_name")}
                  defaultValue={!nidInfo ? data.last_name : ""}
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
                  defaultValue={!nidInfo ? data.email : ""}
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
                  {...register("city")}
                  defaultValue={!nidInfo ? data.city : ""}
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
                  {lookupList &&
                    getStateOption(lookupList).map((country, index) => (
                      <option
                        value={country.id}
                        selected={
                          country.id == setRepresentativeState(data.state)
                            ? "selected"
                            : ""
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
              <CFormLabel className="col-sm-4 col-form-label">
                Postal Code
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  {...register("postal_code")}
                  defaultValue={!nidInfo ? data.postal_code : ""}
                  placeholder="Postal Code"
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol md={4}>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
              <CCol sm={12} className="mb-2">
                <div className="merchant_img text-center">
                  <img
                    src={`${process.env.REACT_APP_API_URL}poricoy/image/${
                      nidInfo ? nidInfo.image_path : data.nid_number + ".jpg"
                    }`}
                  />
                </div>
              </CCol>
              <CCol sm={12}>
                <div className="merchant_img text-center">
                  <img
                    src={`${process.env.REACT_APP_API_URL}uploads/uploads/get/${
                      image ? image : srtRepresentativeImage(data.merchant_pic)
                    }`}
                  />
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={12}>
                <CFormInput type="file" onChange={uploadphoto} />
                <p>Please attach your recent passport size photograph</p>
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
              defaultValue={
                nidInfo ? nidInfo.json_log.nid?.presentAddressEN : data.address1
              }
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
              defaultValue={
                nidInfo
                  ? nidInfo.json_log.nid?.permenantAddressEN
                  : data.address2
              }
              {...register("address_line_2")}
              placeholder="Address Line 2"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-2 col-form-label">NID Copy</CFormLabel>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CCol sm={4}>
            <CFormInput type="file" onChange={uploadFile} />
          </CCol>
          <CCol md={1}>
            <CButton
              color="secondary"
              onClick={() => {
                openFile();
              }}
            >
              <CIcon icon={cilLowVision}></CIcon>
            </CButton>
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
          <Link to="/merchant">
            <CButton color="danger">Cancle</CButton>
          </Link>
          <CButton color="info" type="submit" className="mx-3">
            Update
          </CButton>
          <CButton color="primary" onClick={() => clickNext(1)}>
            Next
          </CButton>
        </div>
      </CForm>
    </div>
  );
};

export default BusinessRepresentative;
