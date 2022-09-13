import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import axios from "axios";

const UserList = () => {
  const [data, setdata] = useState();
  const [userlist, setUserList] = useState();

  const obj = Object.assign({}, data);
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
      name: "Active",
      selector: (row) => <div></div>,
    },
    {
      name: "User Id",
      selector: (row) => (
        <div>
          <a>Edit</a>
          <button color="danger">Delete</button>
        </div>
      ),
    },
  ];

  console.log(obj.is_active);

  useEffect(() => {
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
    </div>
  );
};
export default UserList;
