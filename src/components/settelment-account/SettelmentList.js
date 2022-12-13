import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const SettelmentList = () => {
  const navigate = useNavigate();

  const [settlementAccountList, setSettlementAccountList] = useState();
  const [serviceList, setServiceList] = useState();
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

  const getService = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setServiceList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if(error.response.status==401){
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

  const setservice = (e) => {
    let service = [];
    serviceList &&
      serviceList.map((services) => {
        if (e.service_name.match(services.id)) {
          lookupList &&
            lookupList.map((element) => {
              if (services.category_service_id === element.id) {
                service.push(element.name);
              }
            });
        }
      });
    return "(" + service + ",)";
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

  const deleteSettelment = (id) => {
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
          .delete(`${process.env.REACT_APP_API_URL}account-settlements/${id}`, {
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
            getSettlementAccountList();
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
    getSettlementAccountList();
    getBankBranchList();
    getService();
    getLookupList();
  }, []);

  const columns = [
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    // {
    //   name: "Service Name",
    //   selector: (row) => setservice(row),
    // },
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
