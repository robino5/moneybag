import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import axios from "axios";

const CatagoryServicesList = () => {
  const navigate = useNavigate();
  const [catserviceList, setCatServiceList] = useState();

  const getCatService = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}category-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setCatServiceList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getCatService();
  }, []);

  const comumn = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Short Name",
      selector: (row) => row.short_name,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
    },
    {
      name: "Group Status",
      selector: (row) => (row.is_group == 1 ? "Group" : "Non-Group"),
    },
    {
      name: "Status",
      selector: (row) => (row.status == 1 ? "Active" : "Inactive"),
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
              navigate("/category-services/update-category-services", {
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
            <Link to="/category-services/add-category-services">
              <CButton color="primary">Add New</CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable columns={comumn} data={catserviceList} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default CatagoryServicesList;
