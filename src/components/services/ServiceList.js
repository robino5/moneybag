import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import axios from "axios";

const ServiceList = () => {
  const navigate = useNavigate();

  const [serviceList, setServiceList] = useState();
  const [bankbranchList, setBankBranchList] = useState();

  const getService = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setServiceList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getBankBranchList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankBranchList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getService();
    getBankBranchList();
  }, []);

  const setBankName = (e) => {
    let bankName;
    bankbranchList &&
      bankbranchList.map((bankBranch) => {
        if (bankBranch.id === e.bank_id) {
          bankName = bankBranch.branch_name;
        }
      });
    return bankName;
  };

  const comumn = [
    {
      name: "Service Name",
      selector: (row) => row.service_name,
    },
    {
      name: "Bank Name",
      selector: (row) => setBankName(row),
    },
    {
      name: "End Point Url",
      selector: (row) => row.end_point_url,
    },
    {
      name: "Call Back Url",
      selector: (row) => row.call_back_url,
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
              navigate("/service/update-service", {
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
        <CRow className="justify-content-center mb-2">
          <CCol md={12}>
            <Link to="/service/add-service">
              <CButton color="primary">Add New</CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable columns={comumn} data={serviceList} pagination />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default ServiceList;
