import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AddBankDetails from "./AddBankDetails";

const BankDetails = () => {
  const addBnakDetail = () => {
    swal(
      <div>
        <p>dsafds</p>
      </div>
    );
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <div className="justify-content-centert mb-2">
          <CButton color="primary" onClick={addBnakDetail}>
            Add New
          </CButton>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable title="Fintech List" pagination />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default BankDetails;
