import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";

const ServiceList = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
          <CContainer>
            <div className="justify-content-centert mb-2">
              <Link to="/service/add-service">
                <CButton color="primary">Add New</CButton>
              </Link>
            </div>
            <CRow className="justify-content-center">
              <CCol md={12}>
                <DataTable
                  title="Services List"
                  pagination
                />
              </CCol>
            </CRow>
          </CContainer>
        </div>
      );
}

export default ServiceList;