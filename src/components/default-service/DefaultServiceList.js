import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import swal from "sweetalert";
import axios from "axios";

const DefaultServiceList = () => {
  const [defaultServiceList, setDefaultServiceList] = useState();
  const [bankList, setBankList] = useState();
  const [lookupList, setLooupList] = useState();
  const navigate = useNavigate();

  const getDefaultServiceList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}default-services/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setDefaultServiceList(responce.data);
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
      });
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

  const getServiceOption = (e) => {
    let Date;
    lookupList &&
      lookupList.map((element) => {
        if (element.id === e) {
          Date = element.name;
        }
      });
    return Date;
  };

  //   const deleteOrganization = (id, e) => {
  //     const headers = {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     };
  //     swal({
  //       title: "Are you sure?",
  //       text: "Do you want to delete the Organization?",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         axios
  //           .delete(
  //             `${process.env.REACT_APP_API_URL}financial-organizations/delete/${id}`,
  //             {
  //               headers,
  //             }
  //           )
  //           .then((response) => {
  //             console.log(response),
  //               swal({
  //                 position: "top",
  //                 text: "Ofganization Deleted Successfull",
  //                 icon: "success",
  //                 button: false,
  //                 timer: 1500,
  //               });
  //             getOrganization();
  //           })
  //           .catch((error) => {
  //             console.log(error),
  //               swal({
  //                 text: error.response.data.detail,
  //                 icon: "error",
  //                 button: false,
  //                 timer: 1500,
  //               });
  //           });
  //       }
  //     });
  //   };

  const comumn = [
    {
      name: "Service Name",
      sortable: true,
      selector: (row) => getServiceOption(row.service_no),
    },
    {
      name: "Bank Name",
      selector: (row) => getBankName(row.bank_no),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            // onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton>
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/default-servic/update-default-service", {
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

  useEffect(() => {
    const getAllDate = async () => {
      await getDefaultServiceList();
      await getBankList();
      await getLookupList();
    };

    getAllDate();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center mb-2">
          <CCol md={8}>
            <Link to="/default-servic/add-default-service">
              <CButton color="primary">Add New</CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <DataTable
              title="Default Service List"
              columns={comumn}
              data={defaultServiceList}
              pagination
              expandableCol
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default DefaultServiceList;
