import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BranchList = () => {
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

  const getBankName = (e) => {
    console.log(e)
    let bank_name;
    bankbranchList &&
    bankbranchList.map((element) => {
      console.log("element",element.id)
        if (element.id===e) {
          bank_name=element.branch_name
         }
      });
    return bank_name;
  };

  const getBranchList=(e)=>{
   let data=[];
     e&&e.map((element)=>{
        if(element.bank_flag===0){
          data.push(element);
        }
     })
     return data
  }



  useEffect(() => {
    getBankBranchList();
  }, []);

  const columns = [
    {
      name: "Branch Name",
      selector: (row) => row.branch_name,
    },
    {
      name: "Bank Name",
      selector: (row) => getBankName(row.root_bank),
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
      name: "Status",
      selector: (row) => (row.is_active == 1 ? "Active" : "Inactive"),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          {/* <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            //   onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton> */}
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/branch/update-branch", {
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
          <Link to="/branch/add-branch">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Branch List"
              columns={columns}
              data={getBranchList(bankbranchList)}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default BranchList;
