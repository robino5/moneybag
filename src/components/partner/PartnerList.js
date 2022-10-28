import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import axios from "axios";
import swal from "sweetalert";

const PartnerList = () => {
  const [partnerList, setPartnerList] = useState();
  const navigate = useNavigate();

  const getPartnerList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}partners/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setPartnerList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const deletePartner = (id) => {
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
          .delete(`${process.env.REACT_APP_API_URL}partners/${id}`, {
            headers,
          })
          .then((response) => {
            console.log(response),
              swal({
                position: "top",
                text: "Ofganization Deleted Successfull",
                icon: "success",
                button: false,
                timer: 1500,
              });
            getPartnerList();
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

  useEffect(() => {
    getPartnerList();
  }, []);

  const comumn = [
    {
      name: "Name",
      selector: (row) => row.partner_name,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
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
            onClick={() => deletePartner(row.id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/partner/update-partner", { state: row });
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
        <CRow className="mb-2">
          <CCol md={12}>
            <Link to="/partner/add-partner">
              <CButton color="primary">Add New</CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable columns={comumn} data={partnerList} pagination />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default PartnerList;
