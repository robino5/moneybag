import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SettelmentList = () => {
  const navigate = useNavigate();

  const [settlementAccountList, setSettlementAccountList] = useState();

  const getSettlementAccountList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}account-settlements/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setSettlementAccountList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getSettlementAccountList();
  }, []);

  const columns = [
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    {
      name: "Service Name",
      selector: (row) => row.service_name,
    },
    {
      name: "Bank",
      selector: (row) => row.bank_id,
    },
    {
      name: "Branch",
      selector: (row) => row.branch_id,
    },
    {
      name: "Status",
      selector: (row) => (row.is_active == 1 ? "Active" : "Inactive"),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            //   onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/settelment/update-settelment", {
                state: row,
              });
            }}
          >
            Update
          </CButton>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <div className="justify-content-centert mb-2">
          <Link to="/settelment/add-settelment">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Store List"
              columns={columns}
              data={settlementAccountList}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SettelmentList;
