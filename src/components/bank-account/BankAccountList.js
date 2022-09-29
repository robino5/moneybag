import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BankAccountList = () => {
  const navigate = useNavigate();
  const [bankAccountList, setBankAccountList] = useState();
  const [organizationList, setOrganizationList] = useState();
  const getBankAccountList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}bank-accounts/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankAccountList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
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
      });
  };

  useEffect(() => {
    getBankAccountList();
    getOrganization();
  }, []);

  const setAccountType = (e) => {
    if (e.account_type === 1) {
      return "Saving";
    } else if (e.account_type === 2) {
      return "Current";
    } else if (e.account_type === 3) {
      return "Joining";
    }
  };

  const setOrganizationName = (e) => {
    let orgname;
    organizationList &&
      organizationList.map((organization) => {
        if (organization.id === e.organization_id) {
          orgname = organization.name;
        }
      });
    return orgname;
  };

  const columns = [
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    {
      name: "Bank Name",
      selector: (row) => setOrganizationName(row),
    },
    {
      name: "Account No",
      selector: (row) => row.account_no,
    },
    {
      name: "Branch Name",
      selector: (row) => row.branch_name,
    },
    {
      name: "Account Type",
      selector: (row) => setAccountType(row),
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
              navigate("/bank-account/update-bank-account", {
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
          <Link to="/bank-account/add-bank-account">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Bank Account List"
              columns={columns}
              data={bankAccountList}
              pagination
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default BankAccountList;
