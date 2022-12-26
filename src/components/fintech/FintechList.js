import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import swal from "sweetalert";
import axios from "axios";

const FintechList = () => {
  const [organizationList, setOrganizationList] = useState();
  const navigate = useNavigate();
  const [lookupList, setLooupList] = useState();
  const [serviceList, setServiceList] = useState();

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
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getServiceList = () => {
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
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  // const deleteOrganization = (id, e) => {
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   };
  //   swal({
  //     title: "Are you sure?",
  //     text: "Do you want to delete the Organization?",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       axios
  //         .delete(
  //           `${process.env.REACT_APP_API_URL}financial-organizations/delete/${id}`,
  //           {
  //             headers,
  //           }
  //         )
  //         .then((response) => {
  //           console.log(response),
  //             swal({
  //               position: "top",
  //               text: "Ofganization Deleted Successfull",
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

  const getServiceCategory = (e) => {
    let data = [];
    serviceList &&
      serviceList.map((element) => {
        if (element.organization_no === e && element.is_active === 1) {
          lookupList &&
            lookupList.map((e) => {
              if (e.id === element.service_type) {
                data.push(e.name, ",");
              }
            });
        }
      });
    return data;
  };

  const setCountryOption = (e) => {
    let country;
    lookupList &&
      lookupList.map((lookup) => {
        if (lookup.id === e.country_no) {
          country = lookup.name;
        }
      });
    return country;
  };

  const comumn = [
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
      maxWidth: "250px",
    },
    {
      name: " Swift Code",
      selector: (row) => row.swift_code,
      maxWidth: "50px",
    },
    {
      name: "Country",
      selector: (row) => setCountryOption(row),
      maxWidth: "50px",
    },
    {
      name: "Services",
      selector: (row) => getServiceCategory(row.id),
    },
    {
      name: "Status",
      selector: (row) => (row.status == 1 ? "Active" : "Inactive"),
      maxWidth: "50px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          {/* <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton> */}
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/fintech/update-fintech", { state: row });
            }}
          >
            Update
          </CButton>
        </div>
      ),
      maxWidth: "170px",
    },
  ];

  useEffect(() => {
    getOrganization();
    getLookupList();
    getServiceList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <div className="justify-content-centert mb-2">
          <Link to="/fintech/add-fintech">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Fintech List"
              columns={comumn}
              data={organizationList}
              pagination
              expandableCol
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default FintechList;
