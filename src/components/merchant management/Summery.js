import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton, CCard } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilX } from "@coreui/icons";
import swal from "sweetalert";
import axios from "axios";

const Summery = () => {
  const navigate = useNavigate();

  const saveMerchant = () => {
    const data = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      email: localStorage.getItem("email"),
      address1: localStorage.getItem("address1"),
      address2: localStorage.getItem("address2"),
      city: localStorage.getItem("city"),
      state: localStorage.getItem("state"),
      postal_code: localStorage.getItem("postal_code"),
      nid_number: localStorage.getItem("nid_number"),
      date_of_birth: localStorage.getItem("date_of_birth"),
      merchant_pic: localStorage.getItem("merchant_pic"),
      nid_picture: localStorage.getItem("nid_picture"),
      industry_no: parseInt(localStorage.getItem("indeustry")),
      category_code: localStorage.getItem("category_code"),
      website: localStorage.getItem("business_website"),
      product_desc: localStorage.getItem("description"),
      is_active: parseInt(localStorage.getItem("status")),
      country_no: 1001001,
      business_type: parseInt(localStorage.getItem("business_type")),
      business_name: localStorage.getItem("business_name"),
      short_name: localStorage.getItem("business_short_name"),
      bin: localStorage.getItem("bin"),
      business_address1: localStorage.getItem("business_address1"),
      business_address2: localStorage.getItem("business_address2"),
      business_city: localStorage.getItem("business_city"),
      business_state: parseInt(localStorage.getItem("business_state")),
      business_postal_code: localStorage.getItem("business_postal_code"),
      merchant_phone: localStorage.getItem("business_Phone"),
      merchant_email: localStorage.getItem("business_email"),
      file_1: localStorage.getItem("file1"),
      file_2: localStorage.getItem("file2"),
    };
    if (!data.file_2) {
      delete data.file_2;
    }
    console.log(data);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}marchants/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        saveSettlementBank(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
        swal({
          position: "top-end",
          text: error.response.data.detail,
          icon: "error",
          button: false,
          timer: 1500,
        });
      });
  };

  const saveSettlementBank = (e) => {
    const data2 = {
      currency_no: parseInt(localStorage.getItem("currency_no")),
      bank_no: parseInt(localStorage.getItem("bank_no")),
      branch_no: parseInt(localStorage.getItem("branch_no")),
      routing_no: localStorage.getItem("routing_no"),
      swift_code: localStorage.getItem("swift_code"),
      account_no: localStorage.getItem("account_no"),
      account_name: localStorage.getItem("account_name"),
      merchant_no: e.id,
    };
    console.log(data2);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}marchant-details/`, data2, {
        headers,
      })
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          title: "Merchant Created Successfull",
          text: `Merchant Id:${e.merchant_id} Merchant Name:${e.business_name}`,
          icon: "success",
          button: true,
        });
        clearLocalHost();
        navigate("/merchant");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal({
          position: "top-end",
          text: error.response.data.detail,
          icon: "error",
          button: false,
          timer: 1500,
        });
        if (error.response.status == 401) {
          navigate("/login");
        }
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
                <CButton
                  disabled={disableSaveMerchantButton()}
                  className="form-control"
                  onClick={saveMerchant}
                >
                  Save
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Summery;
