import DataTable from "react-data-table-component";
import { CCol, CContainer, CRow, CButton, CCard } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilX } from "@coreui/icons";

const Summery = () => {
  const navigate = useNavigate();

  const saveMerchant = () => {
    const data = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      email: localStorage.getItem("email"),
      address1: localStorage.getItem("address1"),
      address2: localStorage.getItem("address2"),
      city: e.citylocalStorage.getItem("city"),
      state: e.statelocalStorage.getItem("state"),
      postal_code: localStorage.getItem("postal_code"),
      nid_number: localStorage.getItem("nid_number"),
      date_of_birth: localStorage.getItem("date_of_birth"),
      merchant_pic: localStorage.getItem("merchant_pic"),
      nid_picture: localStorage.getItem("nid_picture"),
      merchant_id: localStorage.getItem("merchant_id"),
      industry_no: localStorage.getItem("indeustry"),
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
    console.log(data);
    saveSettlementBank();
  };

  const saveSettlementBank = () => {
    const data2 = {
      currency_no: localStorage.getItem("currency_no"),
      bank_no: localStorage.getItem("bank_no"),
      branch_no: localStorage.getItem("branch_no"),
      routing_no: localStorage.getItem("routing_no"),
      swift_code: localStorage.getItem("swift_code"),
      account_no: localStorage.getItem("account_no"),
      account_name: localStorage.getItem("account_name"),
      merchant_no: 1,
    };

    console.log(data2);
  };

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
                {localStorage.getItem("isSubmitBusiness") == 1 ? (
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
                {localStorage.getItem("isSubmitBusiness") == 1 ? (
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
                {localStorage.getItem("isSubmitBusiness") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4}>
                <p>Bank Details:</p>
              </CCol>
              <CCol md={3}></CCol>
              <CCol md={3}>
                {localStorage.getItem("isBankDetailDate") == 1 ? (
                  <CIcon className="text-success" icon={cilCheck} size="xl" />
                ) : (
                  <CIcon className="text-danger" icon={cilX} size="xl" />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12}>
                <CButton className="form-control" onClick={saveMerchant}>
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
