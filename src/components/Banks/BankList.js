import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { element } from "prop-types";

const BankList = () => {
  const navigate = useNavigate();

  const [bankbranchList, setBankBranchList] = useState();

  const getBankBranchList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankBranchList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getBankList=(e)=>{
   let data=[];
     e&&e.map((element)=>{
        if(element.bank_flag===1){
          data.push(element);
        }
     })
     console.log("data",data);
     return data
  }

  useEffect(() => {
    getBankBranchList();
  }, []);

  const columns = [
    {
      name: "Bank Name",
      selector: (row) => row.branch_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile",
      selector: (row) => row.phone1,
    },
    {
      name: "Address",
      selector: (row) => row.address1,
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
            //   onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/bank/update-bank", {
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
          <Link to="/bank/add-bank">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Bank List"
              columns={columns}
              data={getBankList(bankbranchList)}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default BankList;
