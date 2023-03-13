import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import { DateTime } from "luxon";
import {
  CCard,
  CCardBody,
  CTableRow,
  CCol,
  CTableHeaderCell,
  CTableBody,
  CFormInput,
  CTableDataCell,
  CRow,
  CFormCheck,
  CButton,
  CFormTextarea,
  CTable,
  CTableHead,
} from "@coreui/react";

const BringDispute = (props) => {
  const [disputeApplyCheck, setDisputeApplyCheck] = useState();
  const [disputeApplyDate, setDisputeApplyData] = useState();
  const [disputeamount, setDisputeAmount] = useState();
  const [disputeType, setDisputeType] = useState();
  const [disputeDescription, setDisputeDescription] = useState();
  const [disputeList, setDisputeList] = useState();
  const [userList, setUserList] = useState();

  console.log("ss", disputeList);

  const getDisputeList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}disputes/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data);
        getTransectionDispute(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  // Get userList
  const getUser = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}users/list-users`, { headers })
      .then((responce) => {
        console.log(responce.data), setUserList(responce.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const getTransectionDispute = (dilputes) => {
    dilputes?.map((dispute) => {
      if (dispute.gw_txn_no == props.data.id) {
        setDisputeList(dispute);
      }
    });
  };

  if (disputeApplyCheck && !disputeApplyDate) {
    const data = {
      dispute_type: "P",
      gw_txn_no: props.data.id,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}disputes/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setDisputeApplyData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error.response.status);
        if (error.response.status == 401) {
          navigate("/login");
        }
        swal({
          position: "top-end",
          text: error.response.status,
          icon: "error",
          button: false,
          timer: 1500,
        });
      });
  }

  const saveDispute = () => {
    if (disputeType == "REFUND" && !disputeamount) {
      swal({
        position: "top-end",
        text: "Please Provide Dispute Amount",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    } else {
      if (
        +parseFloat(disputeamount).toFixed(2) >
        +parseFloat(props.data.merchant_order_amount).toFixed(2)
      ) {
        swal({
          position: "top-end",
          text: "You can't input more than Order amount",
          icon: "warning",
          button: false,
          timer: 1500,
        });
      } else {
        let data = {
          resolve_type: disputeType,
          amount: parseFloat(disputeamount).toFixed(2),
          remarks: disputeDescription,
          gw_txn_no: props.data.id,
        };
        if (!disputeamount) {
          delete data.amount;
        }

        console.log(data);

        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        axios
          .post(
            `${process.env.REACT_APP_API_URL}disputes/${
              disputeList?.dispute_type == "P"
                ? disputeList.id
                : disputeApplyDate?.id
            }`,
            data,
            {
              headers,
            }
          )
          .then((response) => {
            console.log(response);
            swal({
              position: "top-end",
              text: "Create Dispute Successull",
              icon: "success",
              button: false,
              timer: 1500,
            });
            getDisputeList();
          })
          .catch((error) => {
            console.error("There was an error!", error.response);

            if (error.response.status == 401) {
              navigate("/login");
            }
            swal({
              position: "top-end",
              text: error.response.data.msg,
              icon: "error",
              button: false,
              timer: 1500,
            });
          });
      }
    }
  };

  const getIsoDateTime = (date) => {
    return DateTime.fromISO(date, { zone: "Asia/Dhaka" }).toLocaleString(
      DateTime.DATETIME_MED
    );
  };

  const getUserName = (e) => {
    let username;
    userList?.map((user) => {
      if (user.id == e) {
        username = user.user_id;
      }
    });
    return username;
  };

  const hiddenDisputeDicission = () => {
    let hiddenStatus = disputeApplyCheck ? false : true;
    if (disputeList?.dispute_type == "P") {
      hiddenStatus = false;
    }
    return hiddenStatus;
  };

  useEffect(() => {
    getDisputeList();
    getUser();
  }, []);

  return (
    <CCard>
      <CCardBody>
        <div hidden={disputeList?.dispute_type == "A"}>
          <div hidden={disputeList?.dispute_type == "P" ? true : false}>
            <CFormCheck
              label="Apply for dispute"
              disabled={disputeApplyDate ? true : false}
              onChange={(e) => {
                setDisputeApplyCheck(e.target.checked);
              }}
            />
          </div>

          <div hidden={hiddenDisputeDicission()}>
            <h5>Decision Of Dispute</h5>
            <CRow>
              <CCol md={2}>
                <CFormCheck
                  type="radio"
                  name="dipute_status"
                  id="refund"
                  value="REFUND"
                  label="Refund"
                  onChange={(e) => {
                    setDisputeType(e.target.value);
                  }}
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  size="sm"
                  type="text"
                  placeholder="Amount"
                  onChange={(e) => {
                    setDisputeAmount(e.target.value);
                  }}
                />
              </CCol>
            </CRow>
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="reversal"
              value="REVERSAL"
              label="Reversal"
              onChange={(e) => {
                setDisputeType(e.target.value);
              }}
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="chargeback"
              value="CHARGEBACK"
              label="Chargeback"
              onChange={(e) => {
                setDisputeType(e.target.value);
              }}
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="decline"
              value="DECLINED"
              label="Decline"
              onChange={(e) => {
                setDisputeType(e.target.value);
              }}
            />
            <CButton
              color="primary"
              disabled={!disputeType ? true : false}
              onClick={saveDispute}
            >
              Resolve
            </CButton>
            <CRow>
              <CCol md={12}>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Description"
                  rows={3}
                  text="Must be 8-20 words long."
                  onChange={(e) => setDisputeDescription(e.target.value)}
                ></CFormTextarea>
              </CCol>
            </CRow>
          </div>
        </div>
        <div hidden={!disputeList ? true : false}>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  Dispute Initiate Date
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Dispute Resolve Date
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Dispute Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee ID</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  {getIsoDateTime(disputeList?.dispute_initiate_on)}
                </CTableDataCell>
                <CTableDataCell>
                  {getIsoDateTime(disputeList?.dispute_resolve_on)}
                </CTableDataCell>
                <CTableDataCell>
                  {disputeList?.resolve_type
                    ? disputeList?.resolve_type
                    : "DISPUTED"}
                </CTableDataCell>
                <CTableDataCell>
                  {getUserName(disputeList?.created_by)}
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <p hidden={!disputeList?.remarks ? true : false}>
            <span>Description: </span>
            <span>{disputeList?.remarks}</span>
          </p>
        </div>
      </CCardBody>
    </CCard>
  );
};
export default BringDispute;
