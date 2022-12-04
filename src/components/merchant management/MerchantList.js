import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton } from "@coreui/react";
import swal from "sweetalert";
import axios from "axios";

const MerchantList = () => {
  const [merchantList, setMerchantList] = useState();
  const navigate = useNavigate();

  const getMerchantList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}marchants/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setMerchantList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
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
      name: "Merchant Id",
      sortable: true,
      selector: (row) => row.marchant_id,
    },
    {
      name: "Merchant Name",
      selector: (row) => row.business_name,
    },
    {
      name: "Person Name",
      sortable: true,
      selector: (row) => row.first_name + " " + row.last_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Website",
      selector: (row) => row.website,
    },
    {
      name: "Status",
      selector: (row) => (row.is_active === 1 ? "Active" : "Inactive"),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          {/* <CButton
            className="btn btn-sm d-inline mr-1"
            color="danger"
            // onClick={() => deleteOrganization(row.id)}
          >
            Delete
          </CButton> */}
          <CButton
            className="btn btn-sm d-inline mx-1"
            color="info"
            onClick={() => {
              navigate("/merchant/update-merchant", { state: row });
            }}
          >
            Update
          </CButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getMerchantList();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <div className="justify-content-centert mb-2">
          <Link to="/merchant_management">
            <CButton color="primary">Add New</CButton>
          </Link>
        </div>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <DataTable
              title="Merchant List"
              columns={comumn}
              data={merchantList}
              pagination
              expandableCol
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default MerchantList;
