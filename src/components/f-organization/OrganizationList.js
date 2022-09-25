import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import swal from "sweetalert";
import axios from "axios";

const OrganizationList = () => {
  const [organizationList, setOrganizationList] = useState();
  const navigate = useNavigate();

  const getOrganization = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}financial-organizations/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setOrganizationList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const deleteOrganization = (id, e) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    swal({
      title: "Are you sure?",
      text: "Do you want to delete the Organization?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}financial-organizations/delete/${id}`,
            {
              headers,
            }
          )
          .then((response) => {
            console.log(response),
              swal({
                position: "top",
                text: "Ofganization Deleted Successfull",
                icon: "success",
                button: false,
                timer: 1500,
              });
            getOrganization();
          })
          .catch((error) => {
            console.log(error),
              swal({
                text: error.response.data.detail,
                icon: "error",
                button: false,
                timer: 1500,
              });
          });
      }
    });
  };

  const comumn = [
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
      maxWidth: "250px",
    },
    {
      name: "Short Name",
      selector: (row) => row.short_name,
      maxWidth: "50px",
    },
    {
      name: "Address",
      selector: (row) => row.address_1,
    },
    {
      name: "Status",
      selector: (row) => (row.status == 1 ? "Active" : "Inactive"),
      maxWidth: "50px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/orgnization/update-orgnization", { state: row });
            }}
          >
            Update
          </CButton>
        </div>
      ),
      maxWidth: "170px",
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
            <DataTable
              title="Financial Organization List"
              columns={comumn}
              data={organizationList}
              pagination
              expandableCol
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default OrganizationList;
