import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import swal from "sweetalert";
import axios from "axios";

const UserList = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState();

  // Get userList
  const getUser = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}v1/users/list-users`, { headers })
      .then((responce) => {
        console.log(responce.data), setUserList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // delete user
  const deleteUser = (id, e) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    swal({
      title: "Are you sure?",
      text: "Do you want to delete the user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}v1/users/delete-user/${id}`,
            {
              headers,
            }
          )
          .then((response) => {
            console.log(response),
              swal({
                position: "top",
                text: "User Deleted Successfull",
                icon: "success",
                button: false,
                timer: 1500,
              });
            getUser();
          })
          .catch((error) => {
            console.log(error);
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
      selector: (row) => row.user_name,
    },
    {
      name: "User Id",
      selector: (row) => row.user_id,
    },
    {
      name: "Status",
      selector: (row) => (row.is_active == 1 ? "Active" : "Inactive"),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            onClick={() => deleteUser(row.user_id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/users/update-user", { state: row });
              console.log(row);
            }}
          >
            Update
          </CButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center mb-2">
          <CCol md={8}>
            <Link to="/users/add-user">
              <CButton color="primary">Add New</CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <DataTable
              title="User List"
              columns={comumn}
              data={userList}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default UserList;
