import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const StoreList = () => {
  const navigate = useNavigate();
  const [MerchantService, setMerchantService] = useState();
  const [merchantList, setmerchantList] = useState();
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [bankList, setBankList] = useState();

  const getMertchant = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}marchants/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setmerchantList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getMerchantService = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}merchant-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMerchantService(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getMertchantDetailList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}marchant-details/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMarchentDetailsList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getBankList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const selectMerchantId = (e) => {
    let date;
    MerchantService &&
      MerchantService.map((element) => {
        if (element.merchant_no == e) {
          date = e;
        }
      });
    return date;
  };

  const getMertchantDetail = (e, id) => {
    let date = [];
    e &&
      e.map((element) => {
        console.log(element);
        if (element.merchant_no === parseInt(id)) {
          date.push({
            id: element.id,
            bank_no: element.bank_no,
            branch_no: element.branch_no,
            merchant_no: element.merchant_no,
          });
        }
      });
    return date;
  };

  const getMerchantName = (e) => {
    let merchatname;
    merchantList &&
      merchantList.map((element) => {
        if (element.id === e) {
          merchatname = element.first_name + " " + element.last_name;
        }
      });
    return merchatname;
  };

  const getBankName = (e) => {
    let bank_name;
    bankList &&
      bankList.map((element) => {
        if (element.id === e) {
          bank_name = element.branch_name;
        }
      });
    return bank_name;
  };

  useEffect(() => {
    getMertchant();
    getMertchantDetailList();
    getMerchantService();
    getBankList();
  }, []);

  const columns = [
    {
      name: "Store Name",
      selector: (row) => getMerchantName(selectMerchantId(row.id)),
    },
    {
      name: "Collection Account name ",
      selector: (row) => (
        <din>
          {getMertchantDetail(marchantDetailList, row.id) &&
            getMertchantDetail(marchantDetailList, row.id).map((element) => {
              return (
                <span>
                  {getMerchantName(element.merchant_no) +
                    "(" +
                    getBankName(element.bank_no) +
                    "-" +
                    getBankName(element.branch_no) +
                    ") "}
                </span>
              );
            })}
        </din>
      ),
      minWidth: "500px",
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
              navigate("/merchant-service/update-merchant-service", {
                state: row.id,
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
          <Link to="/add-merchant-service">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Merchant Service"
              columns={columns}
              data={merchantList}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default StoreList;
