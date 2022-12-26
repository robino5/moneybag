import React from "react";
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
  CFormTextarea,
} from "@coreui/react";

const BringDispute = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CCard>
          <CCardBody>
            <CFormCheck label="Apply for dispute" />
            <h5>Dicission Of Dispute</h5>
            <CButton color="light">Amount</CButton>
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="refund"
              label="Refund"
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="reversal"
              label="Reversal"
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="chargeback"
              label="Chargeback"
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="decline"
              label="Decline"
            />
            <CButton color="primary">Resolve</CButton>
            <CRow>
              <CCol md={12}>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Description"
                  rows={3}
                  text="Must be 8-20 words long."
                ></CFormTextarea>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  );
};
export default BringDispute;
