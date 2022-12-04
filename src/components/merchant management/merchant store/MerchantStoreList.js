import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const MerchantStoreList = () => {
  const navigate = useNavigate();
  const [merchantStoreList, setMerchantStoreList] = useState();
  const [merchantList, setmerchantList] = useState();
  const [marchantDetailList, setMarchentDetailsList] = useState();
  const [bankList, setBankList] = useState();

  const getsetMerchantStoreList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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
      });
  };

  const getMertchantDetailList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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

  const getBankList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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

  const getMerchantName = (e) => {
    let merchatname;
    merchantList &&
      merchantList.map((element) => {
        if (element.id === e) {
          merchatname = element.business_name;
        }
      });
    return merchatname;
  };

  const getMertchantDetail = (e) => {
    let data = {};
    marchantDetailList &&
      marchantDetailList.map((element) => {
        if (element.id == e) {
          data = {
            bank_no: element.bank_no,
            branch_no: element.branch_no,
          };
        }
      });
    return data;
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

  const deleteMercnantStore = (e) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    swal({
      title: "Are you sure?",
      text: "Do you want to delete the data?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}merchant-stores/${e}`, {
            headers,
          })
          .then((response) => {
            console.log(response),
              swal({
                position: "top",
                text: " Deleted Successfull",
                icon: "success",
                button: false,
                timer: 1500,
              });
            getOrganization();
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
    const getAllData = async () => {
      await getsetMerchantStoreList();
      await getMertchant();
      await getMertchantDetailList();
      await getBankList();
    };
    getAllData();
  }, []);

  const columns = [
    {
      name: "Merchant Name",
      selector: (row) => getMerchantName(row.merchant_no),
    },
    {
      name: "Store Name",
      selector: (row) => row.store_name,
    },
    {
      name: "Collection Account name",
      selector: (row) =>
        getMerchantName(row.merchant_no) +
        "(" +
        getBankName(getMertchantDetail(row.settlement_bank_no).bank_no) +
        "-" +
        getBankName(getMertchantDetail(row.settlement_bank_no).branch_no) +
        ")",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            onClick={() => deleteMercnantStore(row.id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/merchant-store/update-merchant-store", {
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
              title="Merchant Store List"
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
