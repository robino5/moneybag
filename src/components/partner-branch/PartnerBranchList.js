import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const PartnerBranchList = () => {
  const navigate = useNavigate();

  const [partnerbranchList, setPartnerBranchList] = useState();

  const getPartnerBranchList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}partner-branches/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setPartnerBranchList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const deletePartnerBranch = (id) => {
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
          .delete(`${process.env.REACT_APP_API_URL}partner-branches/${id}`, {
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
            getPartnerBranchList();
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
    getPartnerBranchList();
  }, []);

  const columns = [
    {
      name: "Branch Name",
      selector: (row) => row.branch_name,
    },
    {
      name: "Shift Code",
      selector: (row) => row.shift_code,
    },
    {
      name: "Address",
      selector: (row) => row.addr1,
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
            onClick={() => deletePartnerBranch(row.id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/partner-branch/update-partner-branch", {
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
          <Link to="/partner-branch/add-partner-branch">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Partner Branch List"
              columns={columns}
              data={partnerbranchList}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default PartnerBranchList;
