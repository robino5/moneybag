import React, { useEffect, useState } from "react";
import axios from "axios";
import { CTable } from "@coreui/react";

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
            <td>
              {getMchantName(props.data.merchant_id) +
                "(" +
                props.data.merchant_id +
                ")"}
            </td>
          </tr>
          <tr>
            <td>TXN No</td>
            <td>:</td>
            <td>{props.data.merchant_tran_id}</td>
          </tr>
          <tr>
            <td>Session ID</td>
            <td>:</td>
            <td>{props.data.gw_session_id}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>:</td>
            <td>{props.data.gw_order_status}</td>
          </tr>
          <tr>
            <td>Creation date</td>
            <td>:</td>
            <td>{props.data.created_at}</td>
          </tr>
          <tr>
            <td>Last update date</td>
            <td>:</td>
            <td>{props.data.updated_at}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>:</td>
            <td>{props.data.merchant_order_amount}</td>
          </tr>
          <tr>
            <td>Charge</td>
            <td>:</td>
            <td>{props.data.merchant_charge_amount}</td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td>:</td>
            <td>
              {props.data.merchant_order_amount +
                props.data.merchant_charge_amount}
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
