import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import axios from "axios";

const OrganizationList = () => {
  const [data, setdata] = useState();

  const getOrganization = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}v1/financial-organizations/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setdata(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const comumn = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Short Name",
      selector: (row) => row.s_name,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Status",
      selector: (row) => (row.is_active == 1 ? "Active" : "Inactive"),
    },
    {
      name: "Action",
      //   selector: (row) => (
      //     <div className="d-flex justify-content-center">
      //       <CButton
      //         className="btn btn-sm d-inline mr-1"
      //         color="danger"
      //         onClick={() => deleteUser(row.user_id)}
      //       >
      //         Delete
      //       </CButton>
      //       <CButton
      //         className="btn btn-sm d-inline mx-1"
      //         color="info"
      //         onClick={() => {
      //           navigate("/users/update-user", { state: row });
      //           console.log(row);
      //         }}
      //       >
      //         Update
      //       </CButton>
      //     </div>
      //   ),
    },
  ];

  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <div className="justify-content-centert mb-2">
          <Link to="/orgnization/add-orgnization">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable title="User List" columns={comumn} pagination />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default OrganizationList;
