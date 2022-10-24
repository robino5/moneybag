import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton, CCard } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilX } from "@coreui/icons";

const Summery = () => {
  const navigate = useNavigate();
  const clickDone = () => {
    localStorage.removeItem("isSubmitBusiness");
    localStorage.removeItem("isBankDetailDate");
    navigate("/dashboard");
  };
  return (
    <div >
      <CContainer>
        <div className="text-center">
          <h2>Please Review</h2>
        </div>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CRow>
              <CCol md={4}>
                <p>Business Structure:</p>
              </CCol>
              <CCol md={3}></CCol>
              <CCol md={3}>
                {localStorage.getItem("isSubmitBusiness") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={7}>
                <p>Business Representative:</p>
              </CCol>
              <CCol md={3}>
                {localStorage.getItem("isSubmitBusiness") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
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
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
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
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12}>
              <CButton className="form-control" onClick={clickDone}>OK</CButton>
              </CCol>
            
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Summery;
