import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const SettelmentList = () => {
  const navigate = useNavigate();

  const [settlementAccountList, setSettlementAccountList] = useState();
  const [organizationList, setOrganizationList] = useState();
  const [bankbranchList, setBankBranchList] = useState();
  const [lookupList, setLooupList] = useState();

  const getSettlementAccountList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}account-settlements/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setSettlementAccountList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };

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
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };

  const getOrganization = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}financial-organizations/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setOrganizationList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };


  const getLookupList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}lookups/detail-list`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setLooupList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };

  const setBankName = (e) => {
    let bankName;
    bankbranchList &&
      bankbranchList.map((bankBranch) => {
        if (bankBranch.id === e.bank_id) {
          bankName = bankBranch.branch_name;
        }
      });
    return bankName;
  };

  const setBranchName = (e) => {
    let bankName;
    bankbranchList &&
      bankbranchList.map((bankBranch) => {
        if (bankBranch.id === e.branch_id) {
          bankName = bankBranch.branch_name;
        }
      });
    return bankName;
  };

  const setFintechName=(e)=>{
    let fintech_name
    organizationList?.map((fintech)=>{
      if(fintech.id==e){
        fintech_name=fintech.name
      }
    })
    return fintech_name;
  }

  useEffect(() => {
    getSettlementAccountList();
    getBankBranchList();
    getOrganization()
    getLookupList();
  }, []);

  const columns = [
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    {
      name: "Fintech Name",
      selector: (row) => setFintechName(row.org_no),
    },
    {
      name: "Bank",
      selector: (row) => setBankName(row),
    },
    {
      name: "Branch",
      selector: (row) => setBranchName(row),
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
            onClick={() => deleteSettelment(row.id)}
          >
            Delete
          </CButton> */}
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/settelment/update-settelment", {
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
          <Link to="/settelment/add-settelment">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Settelment List"
              columns={columns}
              data={settlementAccountList}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SettelmentList;
