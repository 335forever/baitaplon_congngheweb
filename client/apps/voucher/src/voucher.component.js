import "./index.css";

import icAdd from "../assets/images/ic_add.svg";
import Voucher from "./components/Voucher";
import { getVouchers } from "../../../api/src/TachMonShop-api";

import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";

const shopId = 19;

export default function VoucherList(props) {
  const [vouchers, setVouchers] = React.useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getVouchers(shopId);

      // const data = [
      //   {
      //     voucherID: 6,
      //     discountPercent: 50,
      //     minprice: 100000,
      //     maxdiscount: 20000,
      //     quantity: 10,
      //     expired: "2024-12-31T23:59:59",
      //   },
      //   {
      //     voucherID: 5,
      //     discountPercent: 50,
      //     minprice: 100000,
      //     maxdiscount: 20000,
      //     quantity: 10,
      //     expired: "2024-12-31T23:59:59",
      //   }
      // ]

      setVouchers(data);
    }

    getData();
  }, []);

  const deleteVouchers = (id) => {
    setVouchers(vouchers.filter(voucher => voucher.voucherID !== id));
  }

  return (
    <ChakraProvider>
      <div id="wrapper">
        <div id="route">
          <a style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Tài khoản </a>
          /
          <a> Vouchers</a>
        </div>
        <div id="body">
          {vouchers.map((e, index) => (
            <Voucher key={index} {...e} onDelete={() => deleteVouchers(e.voucherID)} />
          ))}
          <button id="add" onClick={() => setVouchers([...vouchers, { discountPercent: 0, expired: (new Date()).toISOString(), minprice: 0, maxdiscount: 0, quantity: 0 }])}>
            <img src={icAdd} alt="Add"></img>
          </button>
        </div>
      </div >
    </ChakraProvider>
  );
}