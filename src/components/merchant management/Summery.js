import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton, CCard } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";

const Summery = () => {
  const navigate = useNavigate();
  const clickDone = () => {
    localStorage.removeItem("isSubmitBusiness");
    localStorage.removeItem("isBankDetailDate");
    navigate("/dashboard");
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CRow>
                <CCol md={4}>
                  <p>Business Structure:</p>
                </CCol>
                <CCol md={3}></CCol>
                <CCol md={3}>
                  {localStorage.getItem("isSubmitBusiness") == 1 ? (
                    <p>Yes</p>
                  ) : (
                    <p>No</p>
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={4}>
                  <p>Business Representative:</p>
                </CCol>
                <CCol md={3}></CCol>
                <CCol md={3}>
                  {localStorage.getItem("isSubmitBusiness") == 1 ? (
                    <p>Yes</p>
                  ) : (
                    <p>No</p>
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={4}>
                  <p>Business Details:</p>
                </CCol>
                <CCol md={3}></CCol>
                <CCol md={3}>
                  {localStorage.getItem("isSubmitBusiness") == 1 ? (
                    <p>Yes</p>
                  ) : (
                    <p>No</p>
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={4}>
                  <p>Bank Details:</p>
                </CCol>
                <CCol md={3}></CCol>
                <CCol md={3}>
                  {localStorage.getItem("isBankDetailDate") == 1 ? (
                    <p>Yes</p>
                  ) : (
                    <p>No</p>
                  )}
                </CCol>
              </CRow>
              <CButton onClick={clickDone}>OK</CButton>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Summery;
