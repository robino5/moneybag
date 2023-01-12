import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import { DateTime } from "luxon";
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
  CFormCheck,
  CButton,
  CFormTextarea,
} from "@coreui/react";

const BringDispute = (props) => {
  const [disputeApplyCheck, setDisputeApplyCheck] = useState();
  const [disputeApplyDate, setDisputeApplyData] = useState();
  const [disputeamount, setDisputeAmount] = useState();
  const [disputeType, setDisputeType] = useState();
  const [disputeDescription, setDisputeDescription] = useState();
  const [disputeList, setDisputeList ] = useState([]);

  console.log("ss",disputeList)

  const getDisputeList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}disputes/`, {
        headers,
      })
      .then((responce) => {
        console.log(responce.data)
        getTransectionDispute(responce.data)
        ;
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response.status == 401) {
          navigate("/login");
        }
      });
  };

  const getTransectionDispute=(dilputes)=>{
    dilputes?.map((dispute)=>{
      if(dispute.gw_txn_no==props.data.id){
        setDisputeList(dispute);
      }
    })
  }

  
  if(disputeApplyCheck&&!disputeApplyDate){
    const data={
      dispute_type: "P",
      gw_txn_no: props.data.id
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}disputes/`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setDisputeApplyData(response.data)
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

  const saveDispute=()=>{
    let data={
      resolve_type: disputeType,
      amount: parseFloat(disputeamount).toFixed(2),
      remarks: disputeDescription,
      gw_txn_no: props.data.id
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}disputes/${disputeApplyDate?.id}`, data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        swal({
          position: "top-end",
          text: "Create Dispute Successull",
          icon: "success",
          button: false,
          timer: 1500,
        });
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

  useEffect(() => {
    getDisputeList()
  }, []);

  const column = [
    {
      name: "Dispute Initiate Time",
      selector: (row) => 
      DateTime.fromISO(row.dispute_initiate_on, { zone: "Asia/Dhaka" }).toLocaleString(
        DateTime.DATETIME_MED
      ),
    sortable: true,
    },
    {
      name: "Dispute Resolve Time",
      selector: (row) => 
      DateTime.fromISO(row.dispute_resolve_on, { zone: "Asia/Dhaka" }).toLocaleString(
        DateTime.DATETIME_MED
      ),
    sortable: true,
    },
    {
      name: "Dispute Status",
      selector: (row) => row.dispute_type=="A"?"APPROVED":"PENDING",
    },
    {
      name: "Employee ID",
      selector: (row) => row.created_by,
    }
  ];

  return (
         <CCard>
          <CCardBody>
            <div>
            <CFormCheck disabled={disputeApplyCheck?true:false} label="Apply for dispute" onChange={(e)=>{setDisputeApplyCheck(e.target.checked)}} />
            <h5>Dicission Of Dispute</h5>
            <CFormInput size="sm" type="text" placeholder="Amount" onChange={(e)=>{setDisputeAmount(e.target.value)}}/>
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="refund"
              value="REFUND"
              label="Refund"
              onChange={(e)=>{setDisputeType(e.target.value)}}
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="reversal"
              value="REVERSAL"
              label="Reversal"
              onChange={(e)=>{setDisputeType(e.target.value)}}
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="chargeback"
              value="CHARGEBACK"
              label="Chargeback"
              onChange={(e)=>{setDisputeType(e.target.value)}}
            />
            <CFormCheck
              type="radio"
              name="dipute_status"
              id="decline"
              value="DECLINE"
              label="Decline"
              onChange={(e)=>{setDisputeType(e.target.value)}}
            />
            <CButton color="primary" onClick={saveDispute}>Resolve</CButton>
            <CRow>
              <CCol md={12}>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Description"
                  rows={3}
                  text="Must be 8-20 words long."
                  onChange={(e)=>setDisputeDescription(e.target.value)}
                ></CFormTextarea>
              </CCol>
            </CRow>
            </div>
           
             <DataTable
               title="Dispute List"
               columns={column}
               data={disputeList}
             />
           
          </CCardBody>
        </CCard>
  );
};
export default BringDispute;
