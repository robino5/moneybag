import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton, CCard } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilX } from "@coreui/icons";
import swal from "sweetalert";
import axios from "axios";

const SummeryUpdate = ({ data }) => {
  const navigate = useNavigate();
  console.log("data=", data.first_name);

  const updateMerchant = () => {
    const updatedata = {
      first_name: localStorage.getItem("first_name")
        ? localStorage.getItem("first_name")
        : data.first_name,
      last_name: localStorage.getItem("last_name")
        ? localStorage.getItem("last_name")
        : data.last_name,
      email: localStorage.getItem("email")
        ? localStorage.getItem("email")
        : data.email,
      address1: localStorage.getItem("address1")
        ? localStorage.getItem("address1")
        : data.address1,
      address2: localStorage.getItem("address2")
        ? localStorage.getItem("address2")
        : data.address2,
      city: localStorage.getItem("city")
        ? localStorage.getItem("city")
        : data.city,
      state: localStorage.getItem("state")
        ? localStorage.getItem("state")
        : data.state,
      postal_code: localStorage.getItem("postal_code")
        ? localStorage.getItem("postal_code")
        : data.postal_code,
      nid_number: localStorage.getItem("nid_number")
        ? localStorage.getItem("nid_number")
        : data.nid_number,
      date_of_birth: localStorage.getItem("date_of_birth")
        ? localStorage.getItem("date_of_birth")
        : data.date_of_birth,
      merchant_pic: localStorage.getItem("merchant_pic")
        ? localStorage.getItem("merchant_pic")
        : data.merchant_pic,
      nid_picture: localStorage.getItem("nid_picture")
        ? localStorage.getItem("nid_picture")
        : data.nid_picture,
      merchant_id: localStorage.getItem("merchant_id")
        ? localStorage.getItem("merchant_id")
        : data.merchant_id,
      industry_no: localStorage.getItem("indeustry")
        ? parseInt(localStorage.getItem("indeustry"))
        : data.industry_no,
      category_code: localStorage.getItem("category_code")
        ? localStorage.getItem("category_code")
        : data.category_code,
      website: localStorage.getItem("business_website")
        ? localStorage.getItem("business_website")
        : data.website,
      product_desc: localStorage.getItem("description")
        ? localStorage.getItem("description")
        : data.product_desc,
      is_active: localStorage.getItem("status")
        ? parseInt(localStorage.getItem("status"))
        : data.is_active,
      country_no: 1001001,
      business_type: localStorage.getItem("business_type")
        ? parseInt(localStorage.getItem("business_type"))
        : data.business_type,
      business_name: localStorage.getItem("business_name")
        ? localStorage.getItem("business_name")
        : data.business_name,
      short_name: localStorage.getItem("business_short_name")
        ? localStorage.getItem("business_short_name")
        : data.short_name,
      bin: localStorage.getItem("bin") ? localStorage.getItem("bin") : data.bin,
      business_address1: localStorage.getItem("business_address1")
        ? localStorage.getItem("business_address1")
        : data.business_address1,
      business_address2: localStorage.getItem("business_address2")
        ? localStorage.getItem("business_address2")
        : data.business_address2,
      business_city: localStorage.getItem("business_city")
        ? localStorage.getItem("business_city")
        : data.business_city,
      business_state: localStorage.getItem("business_state")
        ? parseInt(localStorage.getItem("business_state"))
        : data.business_state,
      business_postal_code: localStorage.getItem("business_postal_code")
        ? localStorage.getItem("business_postal_code")
        : data.business_postal_code,
      merchant_phone: localStorage.getItem("business_Phone")
        ? localStorage.getItem("business_Phone")
        : data.merchant_phone,
      merchant_email: localStorage.getItem("business_email")
        ? localStorage.getItem("business_email")
        : data.merchant_email,
      file_1: localStorage.getItem("file1")
        ? localStorage.getItem("file1")
        : data.file_1,
      file_2: localStorage.getItem("file2")
        ? localStorage.getItem("file2")
        : data.file_2,
    };
    if (!data.file_2) {
      delete data.file_2;
    }
    console.log(updatedata);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}marchants/update/${data.id}`,
        updatedata,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          text: "Organization Updated Successfull",
          icon: "success",
          position: "top-end",
          button: false,
          timer: 1500,
        });
        clearLocalHost();
        navigate("/merchant");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal({
          text: error.response.data.detail,
          icon: "error",
          position: "top-end",
          button: false,
          timer: 1500,
        });
      });
  };

  const clearLocalHost = () => {
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("email");
    localStorage.removeItem("address1");
    localStorage.removeItem("address2");
    localStorage.removeItem("city");
    localStorage.removeItem("state");
    localStorage.removeItem("postal_code");
    localStorage.removeItem("nid_number");
    localStorage.removeItem("date_of_birth");
    localStorage.removeItem("merchant_pic");
    localStorage.removeItem("nid_picture");
    localStorage.removeItem("merchant_id");
    localStorage.removeItem("indeustry");
    localStorage.removeItem("category_code");
    localStorage.removeItem("business_website");
    localStorage.removeItem("description");
    localStorage.removeItem("status");
    localStorage.removeItem("business_type");
    localStorage.removeItem("business_name");
    localStorage.removeItem("business_short_name");
    localStorage.removeItem("bin");
    localStorage.removeItem("business_address1");
    localStorage.removeItem("business_address2");
    localStorage.removeItem("business_city");
    localStorage.removeItem("business_state");
    localStorage.removeItem("business_postal_code");
    localStorage.removeItem("business_Phone");
    localStorage.removeItem("business_email");
    localStorage.removeItem("file1");
    localStorage.removeItem("file2");
    localStorage.removeItem("currency_no");
    localStorage.removeItem("bank_no");
    localStorage.removeItem("branch_no");
    localStorage.removeItem("routing_no");
    localStorage.removeItem("swift_code");
    localStorage.removeItem("account_no");
    localStorage.removeItem("account_name");
    localStorage.removeItem("business_details");
    localStorage.removeItem("business_structure");
    localStorage.removeItem("business_representative");
    localStorage.removeItem("settlement_bank");
  };

  const disableSaveMerchantButton = () => {
    if (
      localStorage.getItem("business_details") == 1 &&
      localStorage.getItem("business_structure") == 1 &&
      localStorage.getItem("business_representative") == 1 &&
      localStorage.getItem("settlement_bank") == 1
    ) {
      return false;
    } else {
      return true;
    }
  };

  console.log(disableSaveMerchantButton());

  return (
    <div>
      <CContainer>
        <div className="text-center">
          <h2>Please Review</h2>
        </div>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CRow>
              <CCol md={4}>
                <p>Business Structure:</p>
              </CCol>
              <CCol md={3}></CCol>
              <CCol md={3}>
                {localStorage.getItem("business_details") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4}>
                <p>Business Details:</p>
              </CCol>
              <CCol md={3}></CCol>
              <CCol md={3}>
                {localStorage.getItem("business_structure") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={7}>
                <p>Business Representative:</p>
              </CCol>
              <CCol md={3}>
                {localStorage.getItem("business_representative") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4}>
                <p>Settlement Bank:</p>
              </CCol>
              <CCol md={3}></CCol>
              <CCol md={3}>
                {localStorage.getItem("settlement_bank") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12}>
                <CButton className="form-control" onClick={updateMerchant}>
                  Update
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SummeryUpdate;
