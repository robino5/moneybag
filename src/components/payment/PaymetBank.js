import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import {
  CCol,
  CContainer,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PartnerBranchList = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} size="xl">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <iframe
            src="https://coreui.io/react/docs/components/modal/"
            width="100%"
            height="800"
          ></iframe>
        </CModalBody>
      </CModal>
    </>
  );
};

export default PartnerBranchList;
