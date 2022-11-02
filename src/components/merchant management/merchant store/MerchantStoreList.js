import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const MerchantStoreList = () => {
  const navigate = useNavigate();
  const [merchantStoreList, setMerchantStoreList] = useState();
  console.log(merchantStoreList);

  const getsetMerchantStoreList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}merchant-stores/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMerchantStoreList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getsetMerchantStoreList();
  }, []);

  const columns = [
    {
      name: "Merchant Name",
      selector: (row) => row.merchant_no,
    },
    {
      name: "Store Name",
      selector: (row) => row.store_name,
    },
    {
      name: "Collection Account name",
      selector: (row) => row.settlement_bank_no,
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
              navigate("/store/update-store", {
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
          <Link to="/add-merchant-store">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Financial Organization List"
              columns={columns}
              data={merchantStoreList}
              pagination
              expandableCol
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MerchantStoreList;
