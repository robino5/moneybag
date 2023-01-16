import React, { useEffect, useState } from "react";
import axios from "axios";
import { CTable } from "@coreui/react";
import { DateTime } from "luxon";

const Description = (props) => {
  const [merchantList, setMerchantList] = useState();

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

  const getMchantName = (e) => {
    let name;
    merchantList?.map((element) => {
      if (element.marchant_id == e) {
        name = element.business_name;
      }
    });
    return name;
  };

  useEffect(() => {
    getMerchantList();
  }, []);

  const getTransactionStatus = (value) => {
    if (value.dispute_status == "N") {
      return value.gw_order_status;
    } else if (value.dispute_status == "P") {
      return "DISPUTED";
    } else if (value.dispute_status == "C") {
      return "CHARGEBACK";
    } else if (value.dispute_status == "D") {
      return "DECLINE";
    } else if (value.dispute_status == "R") {
      return "REVERSAL";
    }
  };

  return (
    <div className="d-flex flex-row align-items-center">
      <CTable className="table-borderless">
        <tbody>
          <tr>
            <td>Order number</td>
            <td>:</td>
            <td>{props.data.gw_order_id}</td>
          </tr>
          <tr>
            <td>Merchant</td>
            <td>:</td>
            <td>{props.data.merchant_name}</td>
          </tr>
          <tr>
            <td>TXN No</td>
            <td>:</td>
            <td>{props.data.txn_id}</td>
          </tr>
          <tr>
            <td>Session ID</td>
            <td>:</td>
            <td>{props.data.gw_session_id}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>:</td>
            <td>{getTransactionStatus(props.data)}</td>
          </tr>
          <tr>
            <td>Creation date</td>
            <td>:</td>
            <td>
              {DateTime.fromISO(props.data.created_at, {
                zone: "Asia/Dhaka",
              }).toLocaleString(DateTime.DATETIME_MED)}
            </td>
          </tr>
          <tr>
            <td>Last update date</td>
            <td>:</td>
            <td>
              {DateTime.fromISO(props.data.updated_at, {
                zone: "Asia/Dhaka",
              }).toLocaleString(DateTime.DATETIME_MED)}
            </td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>:</td>
            <td>{props.data.merchant_order_amount}</td>
          </tr>
          <tr>
            <td>Refund Amount</td>
            <td>:</td>
            <td>{props.data.refund_amount - props.data.pgw_charge}</td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td>:</td>
            <td>
              {props.data.merchant_order_amount -
                (props.data.refund_amount - props.data.pgw_charge)}
            </td>
          </tr>
          <tr>
            <td>Pay Date</td>
            <td>:</td>
            <td>{props.data.gw_txn_timestamp}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>:</td>
            <td>{props.data.merchant_description}</td>
          </tr>
        </tbody>
      </CTable>
    </div>
  );
};

export default Description;
