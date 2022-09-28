import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
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
  CFormSelect,
  CButton,
  CFormCheck,
} from "@coreui/react";

const PartnerUpdate = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const location = useLocation();
  const [organizationList, setOrganizationList] = useState();
  const savePartner = (e) => {
    const partnerdata = {
      partner_id: e.partner_id,
      partner_name: e.partner_name,
      organization_id: e.org_name===''?location.state.organization_id:parseInt(e.org_name),
      email: e.email,
      phone: e.phone,
      fax: e.fax,
      contact_person: e.contace_person,
      contact_person_mobile: e.contace_person_mobile,
      is_active: e.status ? 1 : 0,
    };
    console.log("kk", partnerdata);
    // const headers = {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // };
    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_URL}partners/update/${location.state.id}`,
    //     partnerdata,
    //     {
    //       headers,
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     swal({
    //       position: "top-end",
    //       text: "Partner Update Successfull",
    //       icon: "success",
    //       button: false,
    //       timer: 1500,
    //     });
    //     navigate("/partner");
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //     swal({
    //       position: "top-end",
    //       text: error.response.data.detail,
    //       icon: "error",
    //       button: false,
    //       timer: 1500,
    //     });
    //   });
  };

  const getOrganization = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}financial-organizations/`, {
        headers,
      })
      .then((responce) => {
        setOrganizationList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(savePartner)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Partner Id
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("partner_id")}
                        defaultValue={location.state.partner_id}
                        placeholder=" Partner Id"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Partner Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("partner_name", {
                          required: "Please provide Partner Name",
                        })}
                        defaultValue={location.state.partner_name}
                        placeholder="Partner Name"
                      />
                      <span className="text-danger">
                        {errors.partner_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Organization
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect
                        aria-label="Default select example"
                        type="number"
                        defaultValue={location.state.organization_id}
                        {...register("org_name")}
                      >
                        {organizationList &&
                          organizationList.map((organization, index) => (
                            <option
                              value={organization.id}
                              selected={
                                organization.id ===
                                location.state.organization_id
                                  ? "selected"
                                  : ""
                              }
                              key={index}
                            >
                              {organization.name}
                            </option>
                          ))}
                      </CFormSelect>
                      <span className="text-danger">
                        {errors.org_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Email
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("email")}
                        defaultValue={location.state.email}
                        placeholder="Email"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Phone
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("phone")}
                        defaultValue={location.state.phone}
                        placeholder="Phone"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Fax
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("fax")}
                        defaultValue={location.state.fax}
                        placeholder="Fax"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Contact Person
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("contace_person")}
                        placeholder="Contact Person"
                        defaultValue={location.state.contact_person}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Contact Person mobile
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("contace_person_mobile")}
                        defaultValue={location.state.contact_person_mobile}
                        placeholder="Contact Person mobile"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck
                        label="Active"
                        defaultChecked={
                          location.state.is_active == 1 ? true : false
                        }
                        {...register("status")}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/partner">
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

export default PartnerUpdate;
