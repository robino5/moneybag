import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import {
  CCard,
  CCardBody,
  CFormSelect,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
} from "@coreui/react";

const BankDetails = ({ clickNext, data }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [pageSetup, setPageSetup] = useState(1);
  const [marchantDetail, setMarchentDetailsList] = useState();
  const [lookupList, setLooupList] = useState();
  const [bankbranchList, setBankBranchList] = useState();
  const [settlementBank, SetSettleentBank] = useState();
  const [bankId, setBankID] = useState();
  const [branchId, setBrunchID] = useState();

  console.log("Settlement Bank:", bankId, branchId);

  const getMertchantList = async () => {
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
        if (error.response.status == 401) {
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
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getBankBranchList = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}banks/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data), setBankBranchList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getMercnatdetails = (e, id) => {
    let data = [];
    e?.map((element) => {
      console.log(element, id);
      if (element.merchant_no == id) {
        data.push(element);
      }
    });
    return data;
  };

  console.log("check", getMercnatdetails(marchantDetail));

  const setBankName = (e) => {
    let bankName;
    bankbranchList &&
      bankbranchList.map((bankBranch) => {
        if (bankBranch.id === e.bank_no) {
          bankName = bankBranch.branch_name;
        }
      });
    return bankName;
  };

  const setBranchName = (e) => {
    let bankName;
    bankbranchList &&
      bankbranchList.map((bankBranch) => {
        if (bankBranch.id === e.branch_no) {
          bankName = bankBranch.branch_name;
        }
      });
    return bankName;
  };

  const setCurrenct = (e) => {
    let currency;
    lookupList &&
      lookupList.map((lookup) => {
        if (lookup.id === e.currency_no) {
          currency = lookup.name;
        }
      });
    return currency;
  };

  const setRoutingNo = (e) => {
    let routing;
    e?.map((branch) => {
      if (branch.id == (branchId ? branchId : settlementBank?.branch_no)) {
        routing = branch.routing_no;
      }
    });
    return routing;
  };

  const setSwiftCode = (e) => {
    let swift;
    e?.map((branch) => {
      if (branch.id == (branchId ? branchId : settlementBank?.branch_no)) {
        swift = branch.swift_code;
      }
    });
    return swift;
  };

  const updateBusinessDetails = (e) => {
    const businessDetailData = {
      currency_no: settlementBank.currency_no,
      bank_no:
        e.bank_name === "" ? settlementBank.bank_no : parseInt(e.bank_name),
      branch_no:
        e.branch_name === ""
          ? settlementBank.branch_no
          : parseInt(e.branch_name),
      routing_no: e.routing_no,
      routing_no: e.swift_code,
      account_name: e.account_name,
      account_no: e.account_number,
      merchant_no: data.id,
    };
    console.log("Updata data", businessDetailData);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}marchant-details/update/${settlementBank.id}`,
        businessDetailData,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Store Created Successfull",
          icon: "success",
          button: false,
          timer: 1500,
        });
        getMertchantList();
        localStorage.setItem("settlement_bank", 1);
        setPageSetup(1);
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

  const getBankOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (element.bank_flag === 1 && element.is_active === 1) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  const getBranchOption = (e) => {
    let date = [];
    e &&
      e.map((element) => {
        if (
          element.bank_flag === 0 &&
          element.is_active === 1 &&
          element.root_bank ==
            (bankId == undefined ? settlementBank?.bank_no : bankId)
        ) {
          date.push({ id: element.id, branch_name: element.branch_name });
        }
      });
    return date;
  };

  const getcurrencyOption = (e) => {
    let Date = [];
    e.forEach((element) => {
      if (element.lov_id === 5001 && element.is_active === 1) {
        Date.push({ id: element.id, name: element.name });
      }
    });
    return Date;
  };

  useEffect(() => {
    const getAllDate = async () => {
      await getMertchantList();
      await getLookupList();
      await getBankBranchList();
    };
    getAllDate();
  }, []);

  const comumn = [
    {
      name: "Currency",
      selector: (row) => setCurrenct(row),
      maxWidth: "80px",
    },
    {
      name: "Bank Name",
      selector: (row) => setBankName(row),
    },
    {
      name: "Branch Name",
      selector: (row) => setBranchName(row),
    },
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    {
      name: "Account Nmmber",
      selector: (row) => row.account_no,
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
              SetSettleentBank(row);
              setPageSetup(2);
            }}
          >
            Update
          </CButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <div
          className="justify-content-centert mb-2"
          hidden={pageSetup != 2 ? true : false}
        >
          <div className="min-vh-100 d-flex flex-row">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md={12}>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={handleSubmit(updateBusinessDetails)}>
                        {/* <CRow className="mb-3">
                          <CFormLabel className="col-sm-3 col-form-label">
                            Currency
                          </CFormLabel>
                          <CCol sm={9}>
                            <CFormSelect
                              aria-label="Default select example"
                              {...register("currency")}
                              type="number"
                            >
                              {lookupList &&
                                getcurrencyOption(lookupList).map(
                                  (currency, index) => (
                                    <option
                                      value={currency.id}
                                      selected={
                                        currency.id ===
                                        settlementBank?.currency_no
                                          ? "selected"
                                          : ""
                                      }
                                      key={index}
                                    >
                                      {currency.name}
                                    </option>
                                  )
                                )}
                            </CFormSelect>
                          </CCol>
                        </CRow> */}
                        <CRow className="mb-3">
                          <CFormLabel className="col-sm-3 col-form-label">
                            Bank Name
                          </CFormLabel>
                          <CCol sm={9}>
                            <CFormSelect
                              aria-label="Default select example"
                              {...register("bank_name")}
                              onChange={(e) => {
                                setBankID(e.target.value);
                              }}
                            >
                              {getBankOption(bankbranchList) &&
                                getBankOption(bankbranchList).map(
                                  (bank, index) => (
                                    <option
                                      value={bank.id}
                                      selected={
                                        bank.id === settlementBank?.bank_no
                                          ? "selected"
                                          : ""
                                      }
                                      key={index}
                                    >
                                      {bank.branch_name}
                                    </option>
                                  )
                                )}
                            </CFormSelect>
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel className="col-sm-3 col-form-label">
                            Branch Name
                          </CFormLabel>
                          <CCol sm={9}>
                            <CFormSelect
                              aria-label="Default select example"
                              {...register("branch_name")}
                              onChange={(e) => {
                                setBrunchID(e.target.value);
                              }}
                            >
                              {getBranchOption(bankbranchList) &&
                                getBranchOption(bankbranchList).map(
                                  (bank, index) => (
                                    <option
                                      value={bank.id}
                                      selected={
                                        bank.id === settlementBank?.branch_no
                                          ? "selected"
                                          : ""
                                      }
                                      key={index}
                                    >
                                      {bank.branch_name}
                                    </option>
                                  )
                                )}
                            </CFormSelect>
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel className="col-sm-3 col-form-label">
                            Transit/Routing No:
                          </CFormLabel>
                          <CCol sm={9}>
                            <CFormInput
                              type="text"
                              className="bg-secondary"
                              value={setRoutingNo(bankbranchList)}
                              {...register("routing_no")}
                              placeholder="Transit/Routing No:"
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel className="col-sm-3 col-form-label">
                            Swift Code:
                          </CFormLabel>
                          <CCol sm={9}>
                            <CFormInput
                              type="text"
                              className="bg-secondary"
                              value={setSwiftCode(bankbranchList)}
                              {...register("swift_code")}
                              placeholder="Transit/Routing No:"
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel className="col-sm-3 col-form-label">
                            Account Name
                          </CFormLabel>
                          <CCol sm={9}>
                            <CFormInput
                              type="text"
                              defaultValue={settlementBank?.account_name}
                              {...register("account_name")}
                              placeholder="Account Name"
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel className="col-sm-3 col-form-label">
                            Account Number
                          </CFormLabel>
                          <CCol sm={9}>
                            <CFormInput
                              type="text"
                              defaultValue={settlementBank?.account_no}
                              {...register("account_number", {
                                pattern: {
                                  value: /^[0-9]*$/,
                                  message: "Please Provide Number",
                                },
                              })}
                              placeholder="Account Number"
                            />
                            <span className="text-danger">
                              {errors.account_number?.message}
                            </span>
                          </CCol>
                        </CRow>
                        <div className="text-center ">
                          <CButton color="info" type="submit" className="mx-3">
                            Update
                          </CButton>
                          {/* <CButton color="primary" onClick={() => clickNext(1)}>
                      Next
                    </CButton> */}
                        </div>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
        <div hidden={pageSetup != 1 ? true : false}>
          <CRow className="justify-content-center">
            <CCol md={12}>
              <DataTable
                columns={comumn}
                data={getMercnatdetails(marchantDetail, data.id)}
              />
            </CCol>
          </CRow>
          <div className="text-center">
            <Link to="/merchant">
              <CButton color="danger">Cancle</CButton>
            </Link>
            <CButton
              className="mx-3"
              onClick={() => {
                clickNext(1);
              }}
            >
              Next
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
