import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import swal from "sweetalert";
import axios from "axios";

const UserList = () => {
  const navigate = useNavigate();
  const [mercantApiUserList, setMerApiUserList] = useState();
  const [merchantList, setmerchantList] = useState();

  // Get userList
  const getMerUser = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}api-users/list-api-users`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMerApiUserList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getMertchant = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}marchants/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setmerchantList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getMerchntName = (e) => {
    let merchantName;
    merchantList?.map((mercant) => {
      if (mercant.id == e) {
        merchantName = mercant.business_name;
      }
    });
    return merchantName;
  };
  const comumn = [
    {
      name: "Merchant Name",
      sortable: true,
      selector: (row) => getMerchntName(row.merchant_no),
    },
    {
      name: "User Id",
      selector: (row) => row.callback_url,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/merchant-callbackUrl/update-merchant-callbackUrl", {
                state: row,
              });
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
    getMerUser();
    getMertchant();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center mb-2">
          <CCol md={10}>
            <Link to="/merchant-callbackurl/add-merchant-callbackUrl">
              <CButton color="primary">Add New</CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <DataTable
              title="User List"
              columns={comumn}
              data={mercantApiUserList}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default UserList;
