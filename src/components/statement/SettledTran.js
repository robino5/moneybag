import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DateTime } from "luxon";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import CIcon from "@coreui/icons-react";
import { cilDescription, cilPrint } from "@coreui/icons";
import { CButton } from "@coreui/react";
import logo from "../../assets/images/Logo";

const SettledTran = (props) => {
  console.log(props.data);

  const column = [
    {
      name: "Order ID",
      selector: (row) => row.merchant_tran_id,
      sortable: true,
      minWidth: "135px;",
    },
    {
      name: "Transaction ID",
      selector: (row) => row.txn_id,
      sortable: true,
      minWidth: "200px;",
    },
    {
      name: "Transaction Date",
      selector: (row) =>
        DateTime.fromISO(row.gw_txn_timestamp, {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED),
      sortable: true,
      minWidth: "70px;",
    },
    {
      name: "Order Amount",
      selector: (row) => parseFloat(row.merchant_order_amount).toFixed(2),
      sortable: true,
    },
    {
      name: "Bank Fee",
      selector: (row) => parseFloat(row.bank_fee).toFixed(2),
      sortable: true,
    },
    {
      name: "PGW Fee",
      selector: (row) => parseFloat(row.pgw_fee).toFixed(2),
      sortable: true,
    },
    {
      name: "Refund Amount",
      selector: (row) =>
        parseFloat(row.refund_amount ? row.refund_amount : 0).toFixed(2),
      sortable: true,
    },
    {
      name: "Payable Amount",
      selector: (row) =>
        parseFloat(row.merchant_order_amount - row.refund_amount).toFixed(2),
      sortable: true,
    },
  ];

  const getotalOrderAmount = (e) => {
    let sumOrderAmount = 0;
    e.map((element) => {
      sumOrderAmount += element.merchant_order_amount;
    });
    return parseFloat(sumOrderAmount).toFixed(2);
  };

  const getotalBankFee = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.bank_fee;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };

  const getotalPgwFee = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.pgw_fee;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };
  const getotal = (e) => {
    let sumBankFee = 0;
    e.map((element) => {
      sumBankFee += element.merchant_order_amount - element.refund_amount;
    });
    return parseFloat(sumBankFee).toFixed(2);
  };

  const getotalRefundFee = (e) => {
    let sumrefund = 0;
    e.map((element) => {
      sumrefund += element.refund_amount;
    });
    return parseFloat(sumrefund).toFixed(2);
  };

  const dawonloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(8);
    var pageCount = doc.internal.getNumberOfPages();
    var pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
    console.log(doc.internal.getNumberOfPages());
    doc.addImage(logo, "JPEG", 80, 3);
    doc.text("Settled Transactions", 95, 24);
    var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

    doc.text(
      `Print Date & Time:${DateTime.fromISO(DateTime.now(), {
        zone: "Asia/Dhaka",
      }).toLocaleString(DateTime.DATETIME_MED)}`,
      15,
      pageHeight - 10
    );
    doc.text(
      `Print by:${localStorage.getItem("username")}`,
      100,
      pageHeight - 10
    );
    doc.text(`Powered By Moneybag`, 165, pageHeight - 10);
    doc.text("page: " + pageCurrent + " of " + pageCount, 175, pageHeight - 5);
    doc.autoTable({
      columns: [
        { header: "Order ID", dataKey: "merchant_tran_id" },
        { header: "Transaction ID", dataKey: "txn_id" },
        {
          header: "Transaction Date",
          dataKey: "gw_txn_timestamp",
        },
        { header: "Order Amount", dataKey: "merchant_order_amount" },
        { header: "Bank Fee", dataKey: "bank_fee" },
        { header: "PGW Fee", dataKey: "pgw_fee" },
        { header: "Refund Amount", dataKey: "refund_amount" },
        { header: "Payable Amount", dataKey: "merchant_order_amount" },
      ],
      body: [
        ...props.data.map((element) => [
          element.merchant_tran_id,
          element.txn_id,
          DateTime.fromISO(element.gw_txn_timestamp, {
            zone: "Asia/Dhaka",
          })
            .toLocaleString(DateTime.DATETIME_MED)
            .slice(0, 12),
          element.merchant_order_amount,
          element.bank_fee,
          element.pgw_fee,
          element.refund_amount,
          parseFloat(
            element.merchant_order_amount - element.refund_amount
          ).toFixed(2),
        ]),
        [
          {
            content: `Total-Amount =`,
            colSpan: 3,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalOrderAmount(props.data),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalBankFee(props.data),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalPgwFee(props.data),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotalRefundFee(props.data),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
          {
            content: getotal(props.data),
            colSpan: 1,
            styles: {
              fillColor: [239, 154, 154],
            },
          },
        ],
      ],
      // didDrawPage: function (data) {
      //   let rows = data.table.body;
      //   rows.push({
      //     content: "Total = " + 67890,
      //     colSpan: 2,
      //   });
      // },
      showHead: "everyPage",
      styles: { fontSize: 6 },
      margin: { top: 28 },
    });
    for (var i = 0; i < pageCount; i++) {
      doc.setPage(i);
      doc.addImage(logo, "JPEG", 80, 3);
      doc.text("Settled Transactions", 95, 24);
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

      doc.text(
        `Print Date & Time:${DateTime.fromISO(DateTime.now(), {
          zone: "Asia/Dhaka",
        }).toLocaleString(DateTime.DATETIME_MED)}`,
        15,
        pageHeight - 10
      );
      doc.text(
        `Print by:${localStorage.getItem("username")}`,
        100,
        pageHeight - 10
      );
      doc.text(`Powered By Moneybag`, 165, pageHeight - 10);
      doc.text(
        "page: " + pageCurrent + " of " + pageCount,
        175,
        pageHeight - 5
      );
    }
    console.log(pageCount);
    doc.save(`settled-transaction${Date()}.pdf`);
  };

  const setDateForEcecl = (e) => {
    let data = [];
    e?.map((element) => {
      data.push({
        Order_ID: element.merchant_tran_id,
        Transaction_ID: element.txn_id,
        Transaction_Date: DateTime.fromISO(element.gw_txn_timestamp, {
          zone: "Asia/Dhaka",
        })
          .toLocaleString(DateTime.DATETIME_MED)
          .slice(0, 12),
        Order_Amount: element.merchant_order_amount,
        Bank_Fee: element.bank_fee,
        PGW_Fee: element.pgw_fee,
        Refund_Amount: element.refund_amount,
        Payable_Amount: parseFloat(
          element.merchant_order_amount - element.refund_amount
        ).toFixed(2),
      });
    });
    return data;
  };

  return (
    <DataTable
      title="Settled Transaction List"
      data={props.data}
      columns={column}
      actions={
        <div>
          <CButton
            className="btn btn-secondary mx-1"
            color="primary"
            onClick={dawonloadReport}
          >
            <CIcon icon={cilPrint} />
          </CButton>
          <CSVLink
            data={setDateForEcecl(props.data)}
            className="btn btn-secondary"
            filename={`settled-transaction${Date()}`}
          >
            <CIcon icon={cilDescription} />
          </CSVLink>
        </div>
      }
    />
  );
};
export default SettledTran;
