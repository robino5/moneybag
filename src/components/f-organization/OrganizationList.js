import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrganizationList = () => {
  const [data, setdata] = useState();
  const navigate = useNavigate();

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

  const deleteOrganization = (id, e) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}v1/financial-organizations/delete/${id}`,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response),
          toast.success("Delete Successfull"),
          getOrganization();
      })
      .catch((error) => {
        console.log(error), toast.error("Delete faild");
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
      selector: (row) => row.address,
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
              data={data}
              pagination
              expandableCol
            />
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer autoClose={1000} theme="colored" />
    </div>
  );
};
export default OrganizationList;
