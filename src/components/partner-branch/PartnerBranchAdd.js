import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

const BranchAdd = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [partnerList, setPartnerList] = useState();
  const [organizationList, setOrganizationList] = useState();

  const savePartnerBranch = (e) => {
    const partnerBranchData = {
      branch_id: e.branch_id,
      branch_name: e.branch_name,
      branch_code: e.branch_code,
      shift_code: e.shift_code,
      addr1: e.address1,
      addr2: e.address2,
      is_active: e.status ? 1 : 0,
    };
    console.log(partnerBranchData);
  };

  const getPartnerList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}partners/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setPartnerList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
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
        console.log(responce.data), setOrganizationList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getPartnerList();
    getOrganization();
  }, []);

  const getOption = (e) => {
    let options = [];
    e.forEach((element) => {
      if (element.is_active === 1) {
        options.push({
          id: element.id,
          organization_id: element.organization_id,
        });
      }
    });
    return options;
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit(savePartnerBranch)}>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Branch ID
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("branch_id")}
                        placeholder="Branch ID"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Branch Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("branch_name", {
                          required: "Please provide Branch Name",
                        })}
                        placeholder="Branch Name"
                      />
                      <span className="text-danger">
                        {errors.branch_name?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Organization Name
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormSelect aria-label="Default select example">
                        {partnerList &&
                          getOption(partnerList).map((partner, index) => (
                            organizationList&&organizationList.map((organization) => (
                              <option value={partner.id} key={index}>
                                {organization.id}
                              </option>
                          ))
                          ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Branch Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("branch_code", {
                          required: "Please provide Branch code",
                        })}
                        placeholder="Branch Code"
                      />
                      <span className="text-danger">
                        {errors.branch_code?.message}
                      </span>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Shift Code
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("shift_code")}
                        placeholder="Shift Code"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address 1
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("address1")}
                        placeholder="Address Line 1"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Address 2
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormInput
                        type="text"
                        {...register("address2")}
                        placeholder="Address Line 2"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-3 col-form-label">
                      Status
                    </CFormLabel>
                    <CCol sm={9}>
                      <CFormCheck label="Active" {...register("status")} />
                    </CCol>
                  </CRow>
                  <div className="text-center ">
                    <Link to="/partner-branch">
                      <CButton color="danger" className="mx-3">
                        Cancle
                      </CButton>
                    </Link>
                    <CButton type="submit" color="success">
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

export default BranchAdd;
