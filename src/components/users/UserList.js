import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAdd from "./UserAdd";

const UserList = () => {
  const [data, setdata] = useState();

  // Get userList
  const getUser = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}v1/users/list-users`, { headers })
      .then((responce) => {
        console.log(responce.data), setdata(responce.data);
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
    axios
      .delete(`${process.env.REACT_APP_API_URL}v1/users/delete-user/${id}`, {
        headers,
      })
      .then((response) => {
        console.log(response), toast.success("Delete Successfull"), getUser();
      })
      .catch((error) => {
        console.log(error), toast.error("Delete faild");
      });
  };

  const comumn = [
    {
      name: "Name",
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
        <div>
          <CButton
            color="danger"
            onClick={() => deleteUser(row.user_id)}
            className="mx-3"
          >
            delete
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              render(<UserAdd></UserAdd>);
            }}
            className="mx-3"
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
            <DataTable columns={comumn} data={data} />
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer autoClose={1000} theme="colored" />
    </div>
  );
};
export default UserList;
