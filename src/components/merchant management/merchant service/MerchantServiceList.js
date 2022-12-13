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
  const [lookupList, setLooupList] = useState();

  console.log("merhant details:", MerchantService);

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
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };

  const getMerchantService = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}merchant-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMerchantService(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if(error.response.status==401){
          navigate("/login");
        }
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
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };
  const getLookupList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
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
        if(error.response.status==401){
          navigate("/login");
        }
      });
  };

  const selectMerchantId = (e) => {
    let data = [];
    e?.map((merchant) => {
      for (let i = 0; i < MerchantService?.length; i++) {
        if (MerchantService[i].merchant_no == merchant.id) {
          data.push(merchant);
          break;
        }
      }
    });
    console.log("data", data);
    return data;
  };

  const getServices = (e) => {
    let data = [];
    MerchantService?.map((service) => {
      if (service.merchant_no == e) {
        data.push(service.service_no);
      }
    });
    return data;
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
          merchatname = element.business_name;
        }
      });
    return merchatname;
  };

  const getServiceName = (e) => {
    let servicename;
    lookupList?.map((service) => {
      if (service.id === e) {
        servicename = service.name;
      }
    });
    return servicename;
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

  // const deleteMercnantStore = (e) => {
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   };
  //   swal({
  //     title: "Are you sure?",
  //     text: "Do you want to delete the data?",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       axios
  //         .delete(`${process.env.REACT_APP_API_URL}merchant-stores/${e}`, {
  //           headers,
  //         })
  //         .then((response) => {
  //           console.log(response),
  //             swal({
  //               position: "top",
  //               text: " Deleted Successfull",
  //               icon: "success",
  //               button: false,
  //               timer: 1500,
  //             });
  //           getOrganization();
  //         })
  //         .catch((error) => {
  //           console.log(error),
  //             swal({
  //               text: error.response.data.detail,
  //               icon: "error",
  //               button: false,
  //               timer: 1500,
  //             });
  //         });
  //     }
  //   });
  // };

  useEffect(() => {
    const getAllData = async () => {
      await getMertchant();
      await getMertchantDetailList();
      await getMerchantService();
      await getBankList();
      await getLookupList();
    };
    getAllData();
  }, []);

  const columns = [
    {
      name: "Store Name",
      selector: (row) => getMerchantName(row.id),
    },
    {
      name: "Service Name",
      selector: (row) => (
        <div>
          {getServices(row.id)?.map((service) => {
            return <span>{getServiceName(service) + ","}</span>;
          })}
        </div>
        // <din>
        //   {getMertchantDetail(marchantDetailList, row.id) &&
        //     getMertchantDetail(marchantDetailList, row.id).map((element) => {
        //       return (
        //         <span>
        //           {getMerchantName(element.merchant_no) +
        //             "(" +
        //             getBankName(element.bank_no) +
        //             "-" +
        //             getBankName(element.branch_no) +
        //             ") "}
        //         </span>
        //       );
        //     })}
        // </din>
      ),
      minWidth: "500px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          {/* <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            onClick={() => deleteMerchatService(selectMerchantId(row.id))}
          >
            Delete
          </CButton> */}
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
              data={selectMerchantId(merchantList)}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default StoreList;
